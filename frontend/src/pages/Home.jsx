import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Building2,
  Wallet,
  Search,
  ArrowRight,
  Sparkles,
  Zap,
  Layers,
  PlayCircle,
  GraduationCap,
  HeartPulse,
  Landmark,
  Briefcase,
  CheckCircle2,
  Lock,
  Clock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { FlowVisual } from '../components/FlowVisual';

export const Home = () => {
  const { user } = useAuth();
  const userRole = user?.role?.replace('ROLE_', '');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const dest = userRole === 'ISSUER' ? '/issuer/dashboard'
        : userRole === 'HOLDER' ? '/holder/dashboard'
        : userRole === 'VERIFIER' ? '/verifier'
        : '/admin/dashboard';
      navigate(dest, { replace: true });
    }
  }, [user, userRole, navigate]);

  return (
    <div className="space-y-12 py-4 sm:py-6 max-w-6xl mx-auto animate-fade-in">

      {/* ── HERO SECTION ── */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0d1533] via-[#090e24] to-[#050714] border border-cyan-500/30 p-8 sm:p-12 md:p-14 shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-purple-500/15 rounded-full blur-[90px] pointer-events-none"></div>
        <div className="absolute top-1/2 right-5 w-72 h-72 bg-emerald-500/12 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-6">
          
          {/* Status Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-400/40 text-cyan-300 text-xs font-semibold backdrop-blur-xl shadow-[0_0_20px_rgba(6,182,212,0.25)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]"></span>
            <span className="font-mono">Multi-Domain Credential Platform</span>
            <span className="text-cyan-500/60">|</span>
            <span className="text-slate-300">Secure Digital Verification</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.14]">
            Secure Credential Issuance &{' '}
            <span className="text-gradient-cyan">
              Instant Verification
            </span>
          </h1>

          {/* Clean Description */}
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            A trusted platform enabling universities, employers, healthcare, and government authorities to issue tamper-evident credentials, empower individuals with timed access keys, and give verifiers instant audit results.
          </p>

          {/* Prominent CTA Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            {!user ? (
              <>
                <Link
                  to="/auth/select-role"
                  className="inline-flex items-center justify-center space-x-2.5 px-8 py-4 rounded-2xl btn-gradient-cyan text-slate-950 font-display font-bold text-sm sm:text-base shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] transition-all duration-300 group"
                >
                  <PlayCircle className="w-5 h-5 fill-slate-950 text-slate-950 group-hover:scale-110 transition-transform" />
                  <span>Try Interactive Demo</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center space-x-2 px-6 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-700/60 text-slate-200 font-semibold text-sm transition-all"
                >
                  <span>How It Works</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </a>
              </>
            ) : (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-slate-900/80 p-4 rounded-2xl border border-indigo-500/30">
                <div className="text-xs text-slate-300">
                  Signed in as <strong className="text-white text-sm">{user.name}</strong>{' '}
                  <span className="px-2 py-0.5 rounded bg-indigo-950 border border-indigo-500/40 text-cyan-300 font-mono font-bold text-[11px]">
                    {userRole}
                  </span>
                </div>
                <Link
                  to={
                    userRole === 'ISSUER'
                      ? '/issuer/dashboard'
                      : userRole === 'HOLDER'
                      ? '/holder/dashboard'
                      : '/verifier'
                  }
                  className="px-6 py-3 rounded-xl btn-gradient-cyan text-slate-950 font-bold text-xs shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-105 transition-all flex items-center space-x-2"
                >
                  <span>Launch My Role Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>

          {/* Quick Pillars */}
          <div className="pt-4 border-t border-indigo-900/40 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="space-y-0.5">
              <span className="text-slate-400 text-[11px]">Privacy Protection:</span>
              <div className="text-cyan-300 font-bold">Selective Masking</div>
            </div>
            <div className="space-y-0.5">
              <span className="text-slate-400 text-[11px]">Access Control:</span>
              <div className="text-cyan-300 font-bold">Timed Key Expiry</div>
            </div>
            <div className="space-y-0.5">
              <span className="text-slate-400 text-[11px]">Batch Auditing:</span>
              <div className="text-emerald-300 font-bold">Multi-Key Search</div>
            </div>
            <div className="space-y-0.5">
              <span className="text-slate-400 text-[11px]">Supported Domains:</span>
              <div className="text-purple-300 font-bold">4 Major Sectors</div>
            </div>
          </div>

        </div>
      </section>

      {/* ── FLOW VISUAL ── */}
      <section>
        <FlowVisual />
      </section>

      {/* ── 3 ROLE GATEWAY CARDS ── */}
      <section className="space-y-5">
        <div className="text-center max-w-xl mx-auto space-y-1.5">
          <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
            Role-Based Access Portals
          </h2>
          <p className="text-xs text-slate-400">
            Select a role to test end-to-end credential issuance, holder wallet keys, and verifier audits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Issuer Portal Card */}
          <div className="glass-card glass-card-hover rounded-3xl p-6 flex flex-col justify-between space-y-5 border border-indigo-500/25 group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-950/80 border border-indigo-500/30 text-indigo-400 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.2)] group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-400">
                  Role 01 — Authority
                </span>
                <h3 className="text-lg font-display font-bold text-white group-hover:text-indigo-300 transition-colors">
                  Issuer Portal
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                For Universities, Employers, Healthcare Facilities, and Government Agencies. Select domains, upload documents, and issue tamper-evident digital records.
              </p>
            </div>

            <Link
              to="/issuer/login"
              className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs text-center block shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all"
            >
              Sign In as Issuer →
            </Link>
          </div>

          {/* Holder Wallet Card */}
          <div className="glass-card glass-card-hover rounded-3xl p-6 flex flex-col justify-between space-y-5 border border-purple-500/25 group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-950/80 border border-purple-500/30 text-purple-400 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.2)] group-hover:scale-110 transition-transform">
                <Wallet className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-400">
                  Role 02 — Credential Holder
                </span>
                <h3 className="text-lg font-display font-bold text-white group-hover:text-purple-300 transition-colors">
                  Holder Wallet
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                For Students, Candidates, and Individuals. Bundle credentials across domains, selectively mask sensitive attributes, and generate timed verification keys.
              </p>
            </div>

            <Link
              to="/holder/login"
              className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs text-center block shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all"
            >
              Sign In to Holder Wallet →
            </Link>
          </div>

          {/* Verifier Portal Card */}
          <div className="glass-card glass-card-hover rounded-3xl p-6 flex flex-col justify-between space-y-5 border border-emerald-500/25 group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.2)] group-hover:scale-110 transition-transform">
                <Search className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                  Role 03 — Verifier
                </span>
                <h3 className="text-lg font-display font-bold text-white group-hover:text-emerald-300 transition-colors">
                  Verifier Portal
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                For HR Recruiters, Admissions, and Background Auditors. Verify individual keys or batch audit candidates with branch stream and pointer filtering.
              </p>
            </div>

            <Link
              to="/verifier/login"
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs text-center block shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
            >
              Sign In as Verifier →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 4-STEP STREAMLINED SYSTEM LIFECYCLE ── */}
      <section id="how-it-works" className="space-y-6 scroll-mt-24">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
            How the System Works
          </h2>
          <p className="text-xs text-slate-400">
            Four simple steps from digital issuance to instant verification.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card rounded-2xl p-5 border border-indigo-500/20 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-950 border border-indigo-500/30 text-cyan-300 font-mono font-bold text-xs flex items-center justify-center">
              01
            </div>
            <h4 className="text-sm font-display font-bold text-white">
              Domain & Issuance
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Issuing authority selects the domain (Educational, Healthcare, Government, or Employment) and uploads the document.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-indigo-500/20 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-950 border border-indigo-500/30 text-cyan-300 font-mono font-bold text-xs flex items-center justify-center">
              02
            </div>
            <h4 className="text-sm font-display font-bold text-white">
              Cryptographic Sealing
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Attributes are digitally sealed and immutably registered on the decentralized ledger with domain tagging.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-indigo-500/20 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-950 border border-indigo-500/30 text-cyan-300 font-mono font-bold text-xs flex items-center justify-center">
              03
            </div>
            <h4 className="text-sm font-display font-bold text-white">
              Selective Timed Keys
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Holders select which fields to share or mask across credentials and generate timed verification access keys.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-indigo-500/20 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-950 border border-indigo-500/30 text-emerald-400 font-mono font-bold text-xs flex items-center justify-center">
              04
            </div>
            <h4 className="text-sm font-display font-bold text-white">
              Audit & Verification
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Verifiers audit candidate keys, filter by branch streams and pointer thresholds, and export results in seconds.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
