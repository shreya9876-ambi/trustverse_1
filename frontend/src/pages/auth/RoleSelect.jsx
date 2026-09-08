import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Building2, Wallet, Search, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const RoleSelect = () => {
  const { switchDemoRole } = useAuth();
  const navigate = useNavigate();

  const handleSelectRole = (roleKey, targetPath) => {
    switchDemoRole(roleKey);
    navigate(targetPath);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-8 animate-fade-in">
      <div className="text-center space-y-3">
        <div className="w-14 h-14 rounded-2xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(6,182,212,0.3)]">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
          Select Portal Entry Role
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          TrustVerse uses strictly segregated portals for Issuing Institutions, Credential Holders, and Verifiers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ISSUER PORTAL CARD */}
        <div className="glass-card glass-card-hover p-7 rounded-3xl border border-indigo-500/30 space-y-5 flex flex-col justify-between group">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-950/80 border border-indigo-500/40 text-indigo-400 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.25)] group-hover:scale-110 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-400">
                Institutional Authority
              </span>
              <h2 className="text-xl font-display font-bold text-white group-hover:text-indigo-300 transition-colors">
                Issuer Portal
              </h2>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              For Universities, Colleges, Employers, Hospitals, and Government Authorities. Issue credentials, run document checks, and register tamper-evident digital seals on the decentralized ledger.
            </p>
          </div>
          <button
            onClick={() => handleSelectRole('ISSUER', '/issuer/login')}
            className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-display font-bold text-xs shadow-[0_0_20px_rgba(99,102,241,0.3)] flex items-center justify-center space-x-2 transition-all"
          >
            <span>Issuer Login / Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* HOLDER WALLET CARD */}
        <div className="glass-card glass-card-hover p-7 rounded-3xl border border-purple-500/30 space-y-5 flex flex-col justify-between group">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-950/80 border border-purple-500/40 text-purple-400 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.25)] group-hover:scale-110 transition-transform">
              <Wallet className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-400">
                Credential Holder
              </span>
              <h2 className="text-xl font-display font-bold text-white group-hover:text-purple-300 transition-colors">
                Holder Wallet
              </h2>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              For Students, Candidates, and Credential Holders. Manage multiple documents, choose granular fields to disclose or mask, and generate timed hash keys.
            </p>
          </div>
          <button
            onClick={() => handleSelectRole('HOLDER', '/holder/login')}
            className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-display font-bold text-xs shadow-[0_0_20px_rgba(168,85,247,0.3)] flex items-center justify-center space-x-2 transition-all"
          >
            <span>Holder Wallet Login</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* VERIFIER AUDIT CARD */}
        <div className="glass-card glass-card-hover p-7 rounded-3xl border border-emerald-500/30 space-y-5 flex flex-col justify-between group">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.25)] group-hover:scale-110 transition-transform">
              <Search className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                Verifying Agency
              </span>
              <h2 className="text-xl font-display font-bold text-white group-hover:text-emerald-300 transition-colors">
                Verifier Portal
              </h2>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              For HR Recruiters, Admissions, and Background Auditors. Verify individual keys or batch audit candidate keys by domain, branch stream, and pointer criteria.
            </p>
          </div>
          <button
            onClick={() => handleSelectRole('VERIFIER', '/verifier/login')}
            className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-display font-bold text-xs shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center space-x-2 transition-all"
          >
            <span>Verifier Login / Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
