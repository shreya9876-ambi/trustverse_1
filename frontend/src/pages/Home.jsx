import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Building2, Wallet, Search, ArrowRight, Lock, CheckCircle2, Cpu, KeyRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Home = () => {
  const { user } = useAuth();
  const userRole = user?.role?.replace('ROLE_', '');

  return (
    <div className="space-y-12 py-6">

      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-14 shadow-2xl border border-indigo-900/50">
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span>Decentralized Multi-Domain Credential Platform</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Privacy-Preserving Credential Issuance & <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-emerald-400">Zero-Knowledge Verification</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            TrustVerse enables authorized institutions to issue cryptographic credentials anchored to <strong>Polygon Amoy</strong>. Credential holders can selectively disclose specific claims using Zero-Knowledge proofs without revealing raw document data.
          </p>

          {!user ? (
            <div className="pt-2">
              <Link
                to="/auth/select-role"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all"
              >
                <span>Select Your Role Portal to Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="pt-2 flex items-center space-x-3">
              <span className="text-xs text-indigo-300">Signed in as <strong className="text-white">{user.name}</strong> ({userRole})</span>
              <Link
                to={userRole === 'ISSUER' ? '/issuer/dashboard' : (userRole === 'HOLDER' ? '/holder/dashboard' : '/verifier')}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all flex items-center space-x-1.5"
              >
                <span>Go to My Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

        {/* Decorative elements */}
        <div className="absolute right-0 top-0 -mt-10 -mr-10 opacity-10 pointer-events-none">
          <div className="w-96 h-96 rounded-full border-8 border-indigo-400"></div>
        </div>
      </section>

      {/* Role Portal Entry Cards (Access requires login) */}
      <section className="space-y-4">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h2 className="text-2xl font-bold text-slate-900">Role-Segregated Access Portals</h2>
          <p className="text-xs text-slate-500">
            Access to detailed pipelines and credential wallets requires role-based authentication.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Issuer Portal Card */}
          <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Issuer Institution Portal</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                For Universities, Employers & Authorities. Upload documents, run AI forensics, generate salted Merkle roots, and anchor credentials on Polygon Amoy.
              </p>
            </div>

            <Link
              to="/issuer/login"
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs text-center block shadow-sm transition-all"
            >
              Sign In as Issuer →
            </Link>
          </div>

          {/* Holder Wallet Card */}
          <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Wallet className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Holder Identity Wallet</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                For Students & Credential Holders. Manage self-sovereign DID credentials, select specific claims to disclose, and generate Groth16 ZK proofs.
              </p>
            </div>

            <Link
              to="/holder/login"
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs text-center block shadow-sm transition-all"
            >
              Sign In to Holder Wallet →
            </Link>
          </div>

          {/* Verifier Portal Card */}
          <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Verifier Audit Portal</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                For HR Managers & Verifying Agencies. Issue one-time nonces, audit Groth16 Zero-Knowledge proofs, and check Polygon Amoy on-chain status.
              </p>
            </div>

            <Link
              to="/verifier/login"
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs text-center block shadow-sm transition-all"
            >
              Sign In as Verifier →
            </Link>
          </div>
        </div>
      </section>

      {/* High-Level Feature Pillars */}
      <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h2 className="text-xl font-bold text-slate-900">Core Cryptographic Foundations</h2>
          <p className="text-xs text-slate-500">Security, privacy, and verifiable trust engineered for multi-domain scale.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Salted Claim Commitments</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every credential claim is salted with SHA-256 to prevent dictionary attacks and preserve total data privacy.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <KeyRound className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Groth16 ZK Selective Proofs</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Holders choose what to show. Verifiers verify condition thresholds without seeing full raw certificates.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Polygon Amoy On-Chain Anchor</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Merkle Roots are permanently anchored via smart contract on Polygon Amoy for instant, tamper-evident verification.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
