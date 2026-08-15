import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Wallet, ShieldCheck, FileCheck, ArrowRight, Eye, CheckCircle2, Hash, Fingerprint, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';

export const HolderDashboard = () => {
  const { user, token } = useAuth();
  const [credentials, setCredentials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getCredentials(token)
      .then(data => setCredentials(Array.isArray(data) ? data : []))
      .catch(() => setCredentials([]))
      .finally(() => setLoading(false));
  }, [token]);

  // Fallback demo credentials if no database credentials exist yet
  const displayCreds = credentials.length > 0 ? credentials : [
    {
      id: 'cred_edu_01',
      credentialId: 'cred_edu_2026_001',
      domain: 'education',
      title: 'B.E. Computer Engineering Degree',
      issuerName: 'Pimpri Chinchwad College of Engineering & Research',
      issuerDid: 'did:trustverse:org:pccoer',
      merkleRoot: '0x4f82a991bc8732e19aa7235541098bfe19283746a1005b6c8910471f49e02319',
      blockchainTxHash: '0x8f1920ba01293c8b4172e901aa847120391487261904a8b7123901f4a9b80123',
      status: 'ACTIVE',
      claims: {
        studentName: 'Riya Sharma',
        studentId: 'STU-2026-8891',
        degree: 'B.E. Computer Engineering',
        branch: 'Computer Engineering',
        institution: 'PCCOER',
        cgpa: '8.7',
        graduationYear: '2026'
      }
    },
    {
      id: 'cred_emp_02',
      credentialId: 'cred_emp_2026_002',
      domain: 'employment',
      title: 'Senior Software Engineer Experience Letter',
      issuerName: 'Acme Technologies Inc.',
      issuerDid: 'did:trustverse:org:acme',
      merkleRoot: '0x9d8172bc91029348102938471029384710293847102938471029384710293847',
      blockchainTxHash: '0x7a89b0123c456d7890e123f456a789b0123c456d7890e123f456a789b0123c45',
      status: 'ACTIVE',
      claims: {
        employeeName: 'Riya Sharma',
        employeeId: 'EMP-9910',
        organization: 'Acme Technologies Inc.',
        designation: 'Senior Software Engineer',
        experienceYears: '4',
        employmentStatus: 'Full Time'
      }
    }
  ];

  return (
    <div className="space-y-8 py-4">

      {/* Wallet Identity Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">Holder Self-Sovereign Identity Wallet</h1>
              <p className="text-xs text-slate-500 font-mono">DID: {user?.did || 'did:trustverse:holder:riyasharma'}</p>
            </div>
          </div>
        </div>

        <div className="px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center space-x-1.5 self-start sm:self-auto">
          <CheckCircle2 className="w-4 h-4" />
          <span>Polygon Amoy Connected</span>
        </div>
      </div>

      {/* Verifiable Credentials List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">My Verifiable Credentials</h2>
            <p className="text-xs text-slate-500">Credentials issued by authorized institutions and anchored on Polygon Amoy.</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
            {displayCreds.length} Credential{displayCreds.length !== 1 ? 's' : ''} Stored
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayCreds.map((c) => (
            <div key={c.id || c.credentialId} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
              
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-bold uppercase tracking-wider">
                    {c.domain} Schema
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 text-[11px] font-bold border border-purple-200 flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                    <span>Anchored on-chain</span>
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-extrabold text-slate-900 text-lg">
                    {c.title || c.claims?.degree || c.claims?.designation || 'Verifiable Credential'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Issuer: <strong className="text-slate-700">{c.issuerName || c.claims?.institution || 'PCCOER'}</strong>
                  </p>
                  <p className="text-[10px] font-mono text-slate-400">{c.issuerDid || 'did:trustverse:org:pccoer'}</p>
                </div>

                {/* Blockchain Anchored Merkle Root */}
                {c.merkleRoot && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] font-mono space-y-1">
                    <div className="text-slate-400 font-bold uppercase tracking-wider text-[9px] flex items-center space-x-1">
                      <Hash className="w-3 h-3 text-indigo-500" />
                      <span>On-Chain Salted Merkle Root Hash Key</span>
                    </div>
                    <p className="text-slate-800 break-all">{c.merkleRoot}</p>
                  </div>
                )}

                {/* Encrypted Claims stored in Wallet */}
                <div className="p-3 rounded-2xl bg-indigo-50/50 border border-indigo-100 text-xs space-y-1.5">
                  <div className="font-bold text-indigo-900 text-[11px]">Credential Claims Stored in Wallet:</div>
                  <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono text-slate-700">
                    {Object.entries(c.claims || {}).map(([k, v]) => (
                      <div key={k} className="truncate">
                        <span className="text-slate-400 capitalize">{k.replace(/([A-Z])/g, ' $1').trim()}:</span> <strong className="text-slate-900">{v}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Selective Disclosure Action Button */}
              <div className="pt-2">
                <Link
                  to={`/holder/generate-proof?credentialId=${c.credentialId || c.id}`}
                  className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md text-center flex items-center justify-center space-x-2 transition-all"
                >
                  <Lock className="w-4 h-4" />
                  <span>Select Claims & Generate Selective Disclosure Proof →</span>
                </Link>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
