import React from 'react';
import { ShieldCheck, Users, Building, Activity, AlertTriangle, CheckCircle2, Cpu } from 'lucide-react';

export const AdminDashboard = () => {
  return (
    <div className="space-y-8 py-4">

      {/* Admin Header */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-indigo-500/20 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="space-y-1 relative z-10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-950/80 border border-indigo-500/30 text-indigo-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                TrustVerse System Administration
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Platform health, institutional DID approvals, and decentralized ledger node status.
              </p>
            </div>
          </div>
        </div>

        <div className="px-4 py-2 rounded-full bg-indigo-950/80 text-cyan-300 text-xs font-mono font-bold border border-indigo-500/30 flex items-center space-x-2 self-start sm:self-auto shadow-[0_0_15px_rgba(6,182,212,0.2)]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Super Admin Active</span>
        </div>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-card glass-card-hover rounded-2xl p-6 border border-indigo-500/20 space-y-3">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Registered Institutions</span>
            <Building className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-3xl font-display font-extrabold text-white">48</div>
          <div className="text-[11px] text-emerald-300 font-mono flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>All Institution DIDs Verified</span>
          </div>
        </div>

        <div className="glass-card glass-card-hover rounded-2xl p-6 border border-cyan-500/20 space-y-3">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Total Active Credentials</span>
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-display font-extrabold text-cyan-300">12,480</div>
          <div className="text-[11px] text-cyan-300 font-mono">Anchored on Decentralized Ledger</div>
        </div>

        <div className="glass-card glass-card-hover rounded-2xl p-6 border border-purple-500/20 space-y-3">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Blockchain RPC Status</span>
            <Cpu className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-display font-extrabold text-purple-300">Ledger Active</div>
          <div className="text-[11px] text-purple-300 font-mono flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Decentralized Node RPC Operational</span>
          </div>
        </div>
      </div>

    </div>
  );
};
