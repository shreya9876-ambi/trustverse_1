import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Wallet,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Clock,
  ArrowUpRight,
  KeyRound,
  Hash,
  Lock,
  Layers
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { SimpleHashGeneratorModal } from '../../components/SimpleHashGeneratorModal';

export const HolderDashboard = () => {
  const { user, token } = useAuth();
  const [credentials, setCredentials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCard, setExpandedCard] = useState(null);

  // Timed Hash Key Modal State
  const [selectedCredForModal, setSelectedCredForModal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openTimedKeyModal = (cred = null) => {
    setSelectedCredForModal(cred);
    setIsModalOpen(true);
  };

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
      domain: 'Education',
      branch: 'CS',
      title: 'B.E. Computer Engineering Degree',
      issuerName: 'PCCOER University',
      issuerDid: 'did:trustverse:org:pccoer',
      merkleRoot: '0x4f82a991bc8732e19aa7235541098bfe19283746a1005b6c8910471f49e02319',
      status: 'ACTIVE',
      timestamp: '2026-08-18',
      claims: {
        studentName: 'Riya Sharma',
        studentId: 'STU-2026-8891',
        degree: 'B.E. Computer Engineering',
        branch: 'CS',
        institution: 'PCCOER',
        cgpa: '8.7',
        graduationYear: '2026'
      }
    },
    {
      id: 'cred_emp_02',
      credentialId: 'cred_emp_2026_002',
      domain: 'Employment',
      branch: 'Employment',
      title: 'Senior Software Engineer Experience Letter',
      issuerName: 'Tech Corp Inc.',
      issuerDid: 'did:trustverse:org:techcorp',
      merkleRoot: '0x9d8172bc91029348102938471029384710293847102938471029384710293847',
      status: 'ACTIVE',
      timestamp: '2026-08-17',
      claims: {
        employeeName: 'Riya Sharma',
        employeeId: 'EMP-9910',
        organization: 'Tech Corp Inc.',
        designation: 'Senior Software Engineer',
        experienceYears: '4',
        employmentStatus: 'Full Time'
      }
    }
  ];

  const toggleCard = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="space-y-8 py-4 max-w-6xl mx-auto">

      {/* Wallet Identity Header Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-purple-500/25 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-950/80 border border-purple-500/30 text-purple-400 flex items-center justify-center">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold text-white tracking-tight">
                Holder Identity Wallet
              </h1>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                DID: <span className="text-purple-300">{user?.did || 'did:trustverse:holder:riyasharma'}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => openTimedKeyModal(null)}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 font-bold text-xs shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all flex items-center space-x-2"
          >
            <Layers className="w-4 h-4 text-slate-950" />
            <span>Select Documents & Generate Key</span>
          </button>
        </div>
      </div>

      {/* ── HOLDER CORE ACTIONS ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Action 1: Multi-Doc & Detail Key Generator */}
        <div className="glass-card glass-card-hover rounded-3xl p-6 border border-cyan-500/25 shadow-xl flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
              <KeyRound className="w-5 h-5 stroke-[2.5]" />
            </div>
            <h3 className="text-base font-display font-bold text-white">
              Selective Disclosure Key Generator
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Select one or multiple documents, choose specific attributes to disclose, and generate a secure timed verification key.
            </p>
          </div>

          <button
            onClick={() => openTimedKeyModal(null)}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-1.5 shadow-[0_0_15px_rgba(6,182,212,0.25)] transition-all"
          >
            <span>Open Multi-Document Selector</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Action 2: Threshold Eligibility Assertion Prover */}
        <div className="glass-card glass-card-hover rounded-3xl p-6 border border-purple-500/25 shadow-xl flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/30 text-purple-400 flex items-center justify-center">
              <Lock className="w-5 h-5 stroke-[2.5]" />
            </div>
            <h3 className="text-base font-display font-bold text-white">
              Eligibility Assertion Prover
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Generate mathematical proofs for eligibility criteria (e.g. <code className="text-cyan-300 font-mono">CGPA ≥ 7.5</code>) without revealing exact marks or grades.
            </p>
          </div>

          <Link
            to="/holder/generate-proof"
            className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-purple-300 font-bold text-xs text-center border border-purple-500/30 transition-all flex items-center justify-center space-x-1.5"
          >
            <span>Launch Assertion Prover</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Stored Credentials List */}
      <div id="credential-vault" className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-display font-bold text-white">
              Stored Verifiable Credentials
            </h2>
            <p className="text-xs text-slate-400">
              Locally stored credentials anchored on-chain.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-slate-900 text-cyan-300 text-xs font-mono font-bold border border-slate-800">
            {loading ? '...' : `${displayCreds.length} Document${displayCreds.length !== 1 ? 's' : ''}`}
          </span>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[1, 2].map((i) => (
              <div key={i} className="h-48 glass-card rounded-3xl border border-slate-800 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {displayCreds.map((c) => {
              const targetId = c.credentialId || c.id;
              const isExpanded = expandedCard === targetId;

              return (
                <div
                  key={targetId}
                  className="glass-card rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Top Row */}
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                        {c.domain}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/30 flex items-center space-x-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-400" />
                        <span>Anchored On-Chain</span>
                      </span>
                    </div>

                    {/* Title */}
                    <div className="space-y-0.5">
                      <h3 className="font-display font-bold text-white text-base sm:text-lg">
                        {c.title || c.claims?.degree || c.claims?.designation || 'Verifiable Credential'}
                      </h3>
                      <p className="text-xs text-slate-300 font-mono">
                        Issuer: <span className="text-cyan-300 font-semibold">{c.issuerName || 'TrustVerse Institution'}</span>
                      </p>
                    </div>

                    {/* Claims Preview */}
                    <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-cyan-300 text-[10px] font-mono flex items-center space-x-1">
                          <Lock className="w-3 h-3 text-cyan-400" />
                          <span>Encrypted Attributes in Local Vault:</span>
                        </div>
                        <button
                          onClick={() => toggleCard(targetId)}
                          className="text-[10px] font-mono text-slate-400 hover:text-white flex items-center space-x-0.5"
                        >
                          <span>{isExpanded ? 'Less' : 'Inspect All'}</span>
                          {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono">
                        {Object.entries(c.claims || {})
                          .slice(0, isExpanded ? 20 : 4)
                          .map(([k, v]) => (
                            <div key={k} className="bg-slate-900 p-1.5 rounded border border-slate-800 truncate">
                              <span className="text-slate-400 block text-[9px] capitalize">{k.replace(/([A-Z])/g, ' $1').trim()}:</span>
                              <strong className="text-white text-[11px] truncate block">{v}</strong>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => openTimedKeyModal(c)}
                      className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 font-bold text-xs transition-all flex items-center justify-center space-x-1.5 shadow-[0_0_15px_rgba(6,182,212,0.25)]"
                    >
                      <Clock className="w-3.5 h-3.5 text-slate-950" />
                      <span>Select Details & Share</span>
                    </button>

                    <Link
                      to={`/holder/generate-proof?credentialId=${targetId}`}
                      className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-purple-300 font-bold text-xs border border-purple-500/30 text-center flex items-center justify-center space-x-1 transition-all"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>ZK Proof</span>
                    </Link>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Generator Modal Component */}
      <SimpleHashGeneratorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        credentials={displayCreds}
        initialSelectedCredentialId={selectedCredForModal?.credentialId || selectedCredForModal?.id}
      />

    </div>
  );
};
