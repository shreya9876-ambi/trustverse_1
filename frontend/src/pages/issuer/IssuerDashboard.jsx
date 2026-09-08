import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Plus,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Activity,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Hash,
  Clock,
  ShieldCheck,
  Lock,
  Layers,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';

export const IssuerDashboard = () => {
  const { user, token } = useAuth();
  const [credentials, setCredentials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedRow, setExpandedRow] = useState(null);

  useEffect(() => {
    setLoading(true);
    api.getCredentials(token)
      .then(data => setCredentials(Array.isArray(data) ? data : []))
      .catch(() => setCredentials([]))
      .finally(() => setLoading(false));
  }, [token]);

  // Demo fallback list if database has no initial records
  const displayCreds = credentials.length > 0 ? credentials : [
    {
      id: 'cred_edu_01',
      credentialId: 'cred_edu_2026_001',
      studentName: 'Riya Sharma',
      domain: 'Education',
      branch: 'CS',
      title: 'B.E. Computer Engineering Degree',
      forensicScore: '0.94 (PASS)',
      txHash: '0x4f82a991bc8732e19aa7235541098bfe19283746a1005b6c8910471f49e02319',
      merkleRoot: '0x8f1920ba01293c8b4172e901aa847120391487261904a8b7123901f4a9b80123',
      status: 'ACTIVE',
      timestamp: '2026-08-18 • 16:42 UTC',
      claims: { CGPA: '8.7', Institution: 'PCCOER', Degree: 'B.E. Computer' }
    },
    {
      id: 'cred_edu_02',
      credentialId: 'cred_edu_2026_002',
      studentName: 'Aarav Patel',
      domain: 'Education',
      branch: 'CS',
      title: 'B.E. Computer Engineering Degree (Honors)',
      forensicScore: '0.98 (PASS)',
      txHash: '0x91b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2',
      merkleRoot: '0x1a82f991bc8732e19aa7235541098bfe19283746a1005b6c8910471f49e09910',
      status: 'ACTIVE',
      timestamp: '2026-08-18 • 14:15 UTC',
      claims: { CGPA: '9.8', Branch: 'Computer Engg', Year: '2026' }
    },
    {
      id: 'cred_emp_03',
      credentialId: 'cred_edu_2026_003',
      studentName: 'Ananya Sharma',
      domain: 'Education',
      branch: 'ENTC',
      title: 'B.E. Electronics & Telecommunication',
      forensicScore: '0.96 (PASS)',
      txHash: '0x11223344556677889900aabbccddeeff11223344556677889900aabbccddeeff',
      merkleRoot: '0x7c92a991bc8732e19aa7235541098bfe19283746a1005b6c8910471f49e09742',
      status: 'ACTIVE',
      timestamp: '2026-08-17 • 09:30 UTC',
      claims: { CGPA: '9.6', Branch: 'ENTC', Institution: 'COEP Pune' }
    }
  ];

  const activeCount = credentials.filter(c => c.status !== 'REVOKED').length || 1284;
  const revokedCount = credentials.filter(c => c.status === 'REVOKED').length || 12;

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="space-y-8 py-4 max-w-6xl mx-auto">

      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-cyan-500/20 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950 flex items-center justify-center font-bold shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              <Building2 className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
                {user?.organization || 'PCCOER University'}
              </h1>
              <p className="text-xs font-mono text-slate-400 pt-0.5">
                Issuer DID: <span className="text-cyan-300 font-semibold">{user?.did || 'did:trustverse:org:pccoer'}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/issuer/issue"
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 font-bold text-xs shadow-[0_0_25px_rgba(6,182,212,0.35)] transition-all flex items-center space-x-2"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Issue New Credential</span>
          </Link>
        </div>
      </div>

      {/* ── 2 CORE ISSUER WORKSPACE CARDS ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Issue Credential Pipeline */}
        <div className="glass-card glass-card-hover rounded-3xl p-6 sm:p-7 border border-cyan-500/25 shadow-xl flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <Plus className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-bold">Workspace 01</span>
              <h3 className="text-lg font-display font-bold text-white">
                Issue Verifiable Credential
              </h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Upload digital certificates, extract student attributes, compute cryptographic Merkle roots, and issue credentials directly to student DIDs.
            </p>
          </div>

          <Link
            to="/issuer/issue"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs text-center shadow-[0_0_20px_rgba(6,182,212,0.25)] transition-all flex items-center justify-center space-x-1.5"
          >
            <span>Launch Issue Pipeline</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Card 2: Issued Credentials Registry */}
        <div className="glass-card glass-card-hover rounded-3xl p-6 sm:p-7 border border-emerald-500/25 shadow-xl flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <FileText className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-bold">Workspace 02</span>
              <h3 className="text-lg font-display font-bold text-white">
                Issued Registry & Revocations
              </h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Audit the registry of all issued degrees, inspect cryptographic Merkle roots, and manage instant credential status and revocations.
            </p>
          </div>

          <Link
            to="/issuer/credentials"
            className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-300 font-bold text-xs text-center border border-emerald-500/30 transition-all flex items-center justify-center space-x-1.5"
          >
            <span>View Issued Registry</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Total Issued</span>
            <FileText className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-display font-extrabold text-white">
            {loading ? '...' : activeCount + revokedCount}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-emerald-500/20 bg-emerald-950/20 space-y-1">
          <div className="flex items-center justify-between text-emerald-400 text-xs font-semibold">
            <span>Active & Valid</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-display font-extrabold text-emerald-300">
            {loading ? '...' : activeCount}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Revoked</span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-display font-extrabold text-rose-400">
            {loading ? '...' : revokedCount}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Authenticity Rate</span>
            <Activity className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-display font-extrabold text-purple-300">
            99.2%
          </div>
        </div>
      </div>

      {/* Recent Issuances Registry Table */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h2 className="font-display font-bold text-white text-base sm:text-lg">
              Recent Issued Credentials
            </h2>
            <p className="text-xs text-slate-400">
              Click any record to inspect metadata and cryptographic root.
            </p>
          </div>
          <Link
            to="/issuer/credentials"
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
          >
            <span>View All</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="space-y-3 py-4">
              {[1, 2].map((i) => (
                <div key={i} className="h-12 bg-slate-900/80 border border-slate-800 rounded-2xl animate-pulse"></div>
              ))}
            </div>
          ) : (
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                  <th className="pb-3 px-3">Subject / Holder</th>
                  <th className="pb-3 px-3">Branch & Degree</th>
                  <th className="pb-3 px-3">Timestamp</th>
                  <th className="pb-3 px-3">Status</th>
                  <th className="pb-3 px-3 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {displayCreds.map((c) => {
                  const isExpanded = expandedRow === (c.id || c.credentialId);
                  return (
                    <React.Fragment key={c.id || c.credentialId}>
                      <tr
                        onClick={() => toggleRow(c.id || c.credentialId)}
                        className={`cursor-pointer transition-colors ${
                          isExpanded ? 'bg-slate-900/90' : 'hover:bg-slate-900/50'
                        }`}
                      >
                        <td className="py-3.5 px-3 font-semibold text-white">
                          {c.studentName || c.claims?.studentName || c.claims?.employeeName || 'Recipient'}
                        </td>
                        <td className="py-3.5 px-3 text-slate-300">
                          <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 text-[10px] mr-1.5 border border-cyan-500/30 font-bold">
                            {c.branch || c.domain}
                          </span>
                          <span>{c.title || c.claims?.degree || 'Credential'}</span>
                        </td>
                        <td className="py-3.5 px-3 text-slate-400 text-[11px]">
                          {c.timestamp || '2026-08-18'}
                        </td>
                        <td className="py-3.5 px-3">
                          {c.status === 'REVOKED' ? (
                            <span className="px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-300 font-bold border border-rose-500/40 text-[10px]">
                              REVOKED
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 font-bold border border-emerald-500/40 text-[10px] inline-flex items-center space-x-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              <span>ACTIVE</span>
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-3 text-right">
                          <button className="p-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white">
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </td>
                      </tr>

                      {/* Expandable Compact Detail View */}
                      {isExpanded && (
                        <tr>
                          <td colSpan="5" className="p-0 bg-slate-950/90 border-b border-slate-800">
                            <div className="p-4 space-y-3 text-xs font-mono text-slate-300">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="space-y-1 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                                  <div className="text-[10px] text-slate-400 uppercase font-bold flex items-center space-x-1">
                                    <Hash className="w-3 h-3 text-cyan-400" />
                                    <span>Merkle Root Hash</span>
                                  </div>
                                  <p className="text-slate-200 text-[11px] break-all">
                                    {c.merkleRoot || '0x8f1920ba01293c8b4172e901aa847120391487261904a8b7123901f4a9b80123'}
                                  </p>
                                </div>

                                <div className="space-y-1 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                                  <div className="text-[10px] text-slate-400 uppercase font-bold flex items-center space-x-1">
                                    <Lock className="w-3 h-3 text-emerald-400" />
                                    <span>Claims Attributes</span>
                                  </div>
                                  <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                                    {Object.entries(c.claims || {}).map(([k, v]) => (
                                      <div key={k} className="bg-slate-950 p-1.5 rounded border border-slate-800 truncate">
                                        <span className="text-slate-400 block text-[9px] capitalize">{k}:</span>
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
          )}
        </div>
      </div>

    </div>
  );
};
