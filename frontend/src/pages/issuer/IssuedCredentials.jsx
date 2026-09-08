import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Plus,
  ChevronDown,
  ChevronUp,
  Hash,
  Clock,
  Zap,
  Lock,
  FileText
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';

export const IssuedCredentials = () => {
  const { token } = useAuth();
  const [credentials, setCredentials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedRow, setExpandedRow] = useState(null);

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    setLoading(true);
    try {
      const data = await api.getCredentials(token);
      setCredentials(Array.isArray(data) ? data : []);
    } catch (err) {
      setCredentials([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRevoke = async (id) => {
    if (!window.confirm('Are you sure you want to revoke this credential on the decentralized ledger?')) return;
    try {
      await api.revokeCredential(id, 'Issuer decision - Administrative revocation', token);
      alert('Credential revoked on the decentralized ledger!');
      fetchList();
    } catch (err) {
      alert('Revocation failed: ' + err.message);
    }
  };

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  // Demo fallback credentials if empty database
  const fallbackCreds = [
    {
      id: 'cred_edu_2026_001',
      credentialId: 'cred_edu_2026_001',
      subjectName: 'Riya Sharma',
      domain: 'EDUCATION',
      title: 'B.E. Computer Engineering Degree',
      merkleRoot: '0x4f82a991bc8732e19aa7235541098bfe19283746a1005b6c8910471f49e02319',
      txHash: '0x8f1920ba01293c8b4172e901aa847120391487261904a8b7123901f4a9b80123',
      trustScore: 0.94,
      status: 'ACTIVE',
      timestamp: '2026-08-18 • 16:42 UTC',
      claims: { CGPA: '8.7', Branch: 'Computer Engg', Year: '2026' }
    },
    {
      id: 'cred_emp_2026_002',
      credentialId: 'cred_emp_2026_002',
      subjectName: 'Sana Sheikh',
      domain: 'EMPLOYMENT',
      title: 'Senior Software Engineer Experience Letter',
      merkleRoot: '0x9d8172bc91029348102938471029384710293847102938471029384710293847',
      txHash: '0x7a89b0123c456d7890e123f456a789b0123c456d7890e123f456a789b0123c45',
      trustScore: 0.96,
      status: 'ACTIVE',
      timestamp: '2026-08-17 • 11:20 UTC',
      claims: { Designation: 'Senior Engineer', Experience: '4 Years', Employer: 'Acme Corp' }
    }
  ];

  const customCreds = (() => {
    try {
      const raw = localStorage.getItem('trustverse_custom_credentials');
      return raw ? JSON.parse(raw) : [];
    } catch (_) {
      return [];
    }
  })();

  const baseCreds = credentials.length > 0 ? credentials : fallbackCreds;
  const knownIds = new Set(customCreds.map(c => c.credentialId || c.id));
  const displayCreds = [
    ...customCreds.map(c => ({
      ...c,
      subjectName: c.subjectName || c.claims?.studentName || c.claims?.practitionerName || c.claims?.citizenName || c.claims?.employeeName || 'Document Holder',
      txHash: c.txHash || c.blockchainTxHash,
      trustScore: c.trustScore || 0.96
    })),
    ...baseCreds.filter(c => !knownIds.has(c.credentialId || c.id))
  ];

  return (
    <div className="space-y-6 py-4">
      {/* Header */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-indigo-500/20 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Master Institutional Registry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            Issued Credentials Registry
          </h1>
          <p className="text-xs text-slate-400">
            View and manage issued credentials, digital seal hashes, and on-chain revocation statuses.
          </p>
        </div>

        <Link
          to="/issuer/issue"
          className="px-5 py-3 rounded-xl btn-gradient-cyan text-slate-950 font-bold text-xs shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-105 transition-all flex items-center space-x-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Issue New Credential</span>
        </Link>
      </div>

      {/* Registry Table Container */}
      <div className="glass-card rounded-3xl border border-indigo-500/20 shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-indigo-900/40 flex items-center justify-between">
          <div className="font-display font-bold text-white text-base">
            All Anchored Credentials ({displayCreds.length})
          </div>
          <span className="text-xs font-mono text-cyan-400">
            Decentralized Ledger Anchored
          </span>
        </div>

        {loading ? (
          /* Loading Skeletons */
          <div className="p-6 space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-14 bg-slate-900/80 border border-slate-800 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : displayCreds.length === 0 ? (
          /* Clear Empty State */
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-950/60 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mx-auto">
              <FileText className="w-8 h-8 opacity-60" />
            </div>
            <div className="space-y-1">
              <h3 className="text-white font-display font-bold text-base">No credentials issued yet</h3>
              <p className="text-slate-400 text-xs max-w-sm mx-auto">
                Click "Issue New Credential" to run the document verification pipeline and anchor digital records.
              </p>
            </div>
            <Link
              to="/issuer/issue"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl btn-gradient-cyan text-slate-950 font-bold text-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Issue First Credential</span>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 border-b border-indigo-900/40 text-slate-400 font-mono font-semibold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-4">Credential ID</th>
                  <th className="p-4">Subject</th>
                  <th className="p-4">Domain</th>
                  <th className="p-4">Digital Seal Hash</th>
                  <th className="p-4">Trust Score</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-indigo-900/20">
                {displayCreds.map((c) => {
                  const targetId = c.credentialId || c.id;
                  const isExpanded = expandedRow === targetId;

                  return (
                    <React.Fragment key={targetId}>
                      <tr
                        onClick={() => toggleRow(targetId)}
                        className={`cursor-pointer transition-colors duration-150 ${
                          isExpanded ? 'bg-slate-900/90' : 'hover:bg-slate-900/50'
                        }`}
                      >
                        <td className="p-4 font-mono font-bold text-white">
                          {c.credentialId || c.id}
                        </td>
                        <td className="p-4 font-semibold text-slate-200">
                          {c.subjectName || c.claims?.studentName || c.claims?.employeeName || 'Credential Subject'}
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded bg-indigo-950/80 text-indigo-300 font-mono font-bold text-[10px] border border-indigo-500/30">
                            {c.domain}
                          </span>
                        </td>
                        <td className="p-4 font-mono text-cyan-300 truncate max-w-[150px]">
                          {c.merkleRoot}
                        </td>
                        <td className="p-4 font-mono text-emerald-400 font-bold">
                          {c.trustScore || 0.94}
                        </td>
                        <td className="p-4">
                          {c.status === 'REVOKED' ? (
                            <span className="px-2.5 py-1 rounded-full bg-rose-950/80 text-rose-300 font-bold border border-rose-500/40 text-[10px] shadow-[0_0_10px_rgba(244,63,94,0.2)]">
                              REVOKED ON-CHAIN
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-300 font-bold border border-emerald-500/40 text-[10px] shadow-[0_0_10px_rgba(16,185,129,0.2)] flex items-center space-x-1 w-fit">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              <span>ACTIVE & ANCHORED</span>
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end space-x-2" onClick={(e) => e.stopPropagation()}>
                            {c.status !== 'REVOKED' && (
                              <button
                                onClick={() => handleRevoke(targetId)}
                                className="px-3 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 font-semibold border border-rose-500/30 text-xs transition-all"
                              >
                                Revoke On-Chain
                              </button>
                            )}
                            <button
                              onClick={() => toggleRow(targetId)}
                              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                            >
                              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Expandable Compact Details Drawer */}
                      {isExpanded && (
                        <tr>
                          <td colSpan="7" className="p-0 bg-slate-950/90 border-b border-indigo-900/40">
                            <div className="p-5 space-y-4 text-xs font-mono text-slate-300">
                              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                                <span className="text-cyan-400 font-bold uppercase tracking-wider text-[11px] flex items-center space-x-1.5">
                                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                                  <span>Full Cryptographic Audit Record</span>
                                </span>
                                <span className="text-slate-400 text-[11px]">Issued: {c.timestamp || '2026-08-18 • 16:42 UTC'}</span>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold flex items-center space-x-1">
                                    <Hash className="w-3 h-3 text-indigo-400" />
                                    <span>Salted Merkle Root Hash Key</span>
                                  </div>
                                  <p className="text-slate-200 text-[11px] break-all bg-slate-950 p-2.5 rounded border border-slate-800">
                                    {c.merkleRoot}
                                  </p>
                                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold flex items-center space-x-1 pt-1">
                                    <Clock className="w-3 h-3 text-cyan-400" />
                                    <span>Polygon Amoy Transaction Hash</span>
                                  </div>
                                  <p className="text-cyan-300 text-[11px] break-all bg-slate-950 p-2.5 rounded border border-slate-800">
                                    {c.txHash || '0x8f1920ba01293c8b4172e901aa847120391487261904a8b7123901f4a9b80123'}
                                  </p>
                                </div>

                                <div className="space-y-2 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold flex items-center space-x-1">
                                    <Lock className="w-3.5 h-3.5 text-emerald-400" />
                                    <span>Claims Payload & Attributes</span>
                                  </div>
                                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                                    {Object.entries(c.claims || {}).map(([k, v]) => (
                                      <div key={k} className="bg-slate-950 p-2.5 rounded border border-slate-800">
                                        <span className="text-slate-400 block text-[10px] capitalize">{k}:</span>
                                        <strong className="text-white">{v}</strong>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
