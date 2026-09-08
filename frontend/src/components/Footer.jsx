import React from 'react';
import { ShieldCheck, Lock, CheckCircle2, Globe } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#04060e] text-slate-400 text-xs py-10 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-white font-display font-bold text-lg">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 to-emerald-400 flex items-center justify-center text-slate-950">
                <ShieldCheck className="w-4.5 h-4.5 stroke-[2.5]" />
              </div>
              <span>Trust<span className="text-cyan-400">Verse</span></span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              A secure digital credential and verification platform enabling authorized institutions to issue tamper-evident records and verifiers to audit credentials instantly.
            </p>
          </div>

          <div>
            <h4 className="text-white font-display font-semibold text-xs uppercase tracking-wider mb-3.5">
              Supported Sectors & Domains
            </h4>
            <div className="grid grid-cols-2 gap-2 text-slate-300">
              <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px]">
                🎓 Educational Records
              </div>
              <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px]">
                🏥 Healthcare Accreditations
              </div>
              <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px]">
                🏛️ Government Identity
              </div>
              <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px]">
                💼 Employment Verification
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-display font-semibold text-xs uppercase tracking-wider mb-3.5">
              Role Portals
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <span className="text-cyan-300 font-semibold">Issuer Portal:</span> Institutional issuance & digital seals
              </li>
              <li>
                <span className="text-purple-300 font-semibold">Holder Wallet:</span> Document management & timed key creation
              </li>
              <li>
                <span className="text-emerald-300 font-semibold">Verifier Portal:</span> Single key and batch screening
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px]">
          <div>&copy; 2026 TrustVerse Platform. All Rights Reserved.</div>
          <div className="flex items-center space-x-3 mt-2 sm:mt-0 font-mono">
            <span className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-slate-400">Decentralized Verification Network Active</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
