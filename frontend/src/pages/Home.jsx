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
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#11212D] via-[#06141B] to-[#06141B] border border-[#4A9C8A]/25 p-8 sm:p-12 md:p-14 shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#4A9C8A]/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#253745]/40 rounded-full blur-[90px] pointer-events-none"></div>
        <div className="absolute top-1/2 right-5 w-72 h-72 bg-[#9BA8AB]/8 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-6">

          {/* Status Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#11212D]/90 border border-[#4A9C8A]/35 text-[#6BBFAD] text-xs font-semibold backdrop-blur-xl shadow-[0_0_20px_rgba(74,156,138,0.2)]">
            <span className="w-2 h-2 rounded-full bg-[#4A9C8A] animate-pulse shadow-[0_0_8px_#4A9C8A]"></span>
            <span className="font-mono">Multi-Domain Credential Platform</span>
            <span className="text-[#4A5C6A]">|</span>
            <span className="text-[#9BA8AB]">Secure Digital Verification</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-[#CCD0CF] leading-[1.14]">
            Secure Credential Issuance &{' '}
            <span className="text-gradient-cyan">
              Instant Verification
            </span>
          </h1>

          {/* Description */}
          <p className="text-[#9BA8AB] text-sm sm:text-base leading-relaxed max-w-2xl">
            A trusted platform enabling universities, employers, healthcare, and government authorities to issue tamper-evident credentials, empower individuals with timed access keys, and give verifiers instant audit results.
          </p>

          {/* CTA Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            {!user ? (
              <>
                <Link
                  to="/auth/select-role"
                  className="inline-flex items-center justify-center space-x-2.5 px-8 py-4 rounded-2xl btn-gradient-cyan text-[#06141B] font-display font-bold text-sm sm:text-base transition-all duration-300 group"
                >
                  <PlayCircle className="w-5 h-5 fill-[#06141B] text-[#06141B] group-hover:scale-110 transition-transform" />
                  <span>Try Interactive Demo</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center space-x-2 px-6 py-4 rounded-2xl bg-[#11212D]/80 hover:bg-[#253745]/80 border border-[#253745] text-[#9BA8AB] font-semibold text-sm transition-all"
                >
                  <span>How It Works</span>
                  <ArrowRight className="w-4 h-4 text-[#4A5C6A]" />
                </a>
              </>
            ) : (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-[#11212D]/80 p-4 rounded-2xl border border-[#4A9C8A]/25">
                <div className="text-xs text-[#9BA8AB]">
                  Signed in as <strong className="text-[#CCD0CF] text-sm">{user.name}</strong>{' '}
                  <span className="px-2 py-0.5 rounded bg-[#253745] border border-[#4A9C8A]/30 text-[#6BBFAD] font-mono font-bold text-[11px]">
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
                  className="px-6 py-3 rounded-xl btn-gradient-cyan text-[#06141B] font-bold text-xs transition-all flex items-center space-x-2"
                >
                  <span>Launch My Role Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>

          {/* Quick Pillars */}
          <div className="pt-4 border-t border-[#253745] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="space-y-0.5">
              <span className="text-[#4A5C6A] text-[11px]">Privacy Protection:</span>
              <div className="text-[#6BBFAD] font-bold">Selective Masking</div>
            </div>
            <div className="space-y-0.5">
              <span className="text-[#4A5C6A] text-[11px]">Access Control:</span>
              <div className="text-[#6BBFAD] font-bold">Timed Key Expiry</div>
            </div>
            <div className="space-y-0.5">
              <span className="text-[#4A5C6A] text-[11px]">Batch Auditing:</span>
              <div className="text-[#9BA8AB] font-bold">Multi-Key Search</div>
            </div>
            <div className="space-y-0.5">
              <span className="text-[#4A5C6A] text-[11px]">Supported Domains:</span>
              <div className="text-[#9BA8AB] font-bold">4 Major Sectors</div>
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
          <h2 className="text-xl sm:text-2xl font-display font-bold text-[#CCD0CF]">
            Role-Based Access Portals
          </h2>
          <p className="text-xs text-[#4A5C6A]">
            Select a role to test end-to-end credential issuance, holder wallet keys, and verifier audits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Issuer Portal Card */}
          <div className="glass-card glass-card-hover rounded-3xl p-6 flex flex-col justify-between space-y-5 border border-[#4A9C8A]/20 group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#253745] border border-[#4A9C8A]/30 text-[#4A9C8A] flex items-center justify-center shadow-[0_0_15px_rgba(74,156,138,0.2)] group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#4A9C8A]">
                  Role 01 — Authority
                </span>
                <h3 className="text-lg font-display font-bold text-[#CCD0CF] group-hover:text-[#6BBFAD] transition-colors">
                  Issuer Portal
                </h3>
              </div>
              <p className="text-xs text-[#9BA8AB] leading-relaxed">
                For Universities, Employers, Healthcare Facilities, and Government Agencies. Select domains, upload documents, and issue tamper-evident digital records.
              </p>
            </div>

            <Link
              to="/issuer/login"
              className="w-full py-3.5 rounded-xl bg-[#253745] hover:bg-[#4A9C8A] text-[#CCD0CF] hover:text-[#06141B] font-bold text-xs text-center block shadow-[0_0_15px_rgba(74,156,138,0.2)] transition-all border border-[#4A9C8A]/30"
            >
              Sign In as Issuer →
            </Link>
          </div>

          {/* Holder Wallet Card */}
          <div className="glass-card glass-card-hover rounded-3xl p-6 flex flex-col justify-between space-y-5 border border-[#9BA8AB]/20 group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#11212D] border border-[#9BA8AB]/30 text-[#9BA8AB] flex items-center justify-center shadow-[0_0_15px_rgba(155,168,171,0.2)] group-hover:scale-110 transition-transform">
                <Wallet className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#9BA8AB]">
                  Role 02 — Credential Holder
                </span>
                <h3 className="text-lg font-display font-bold text-[#CCD0CF] group-hover:text-[#CCD0CF] transition-colors">
                  Holder Wallet
                </h3>
              </div>
              <p className="text-xs text-[#9BA8AB] leading-relaxed">
                For Students, Candidates, and Individuals. Bundle credentials across domains, selectively mask sensitive attributes, and generate timed verification keys.
              </p>
            </div>

            <Link
              to="/holder/login"
              className="w-full py-3.5 rounded-xl bg-[#253745] hover:bg-[#4A5C6A] text-[#CCD0CF] font-bold text-xs text-center block shadow-[0_0_15px_rgba(155,168,171,0.2)] transition-all border border-[#9BA8AB]/30"
            >
              Sign In to Holder Wallet →
            </Link>
          </div>

          {/* Verifier Portal Card */}
          <div className="glass-card glass-card-hover rounded-3xl p-6 flex flex-col justify-between space-y-5 border border-[#6BBFAD]/20 group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#11212D] border border-[#6BBFAD]/30 text-[#6BBFAD] flex items-center justify-center shadow-[0_0_15px_rgba(107,191,173,0.2)] group-hover:scale-110 transition-transform">
                <Search className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#6BBFAD]">
                  Role 03 — Verifier
                </span>
                <h3 className="text-lg font-display font-bold text-[#CCD0CF] group-hover:text-[#6BBFAD] transition-colors">
                  Verifier Portal
                </h3>
              </div>
              <p className="text-xs text-[#9BA8AB] leading-relaxed">
                For HR Recruiters, Admissions, and Background Auditors. Verify individual keys or batch audit candidates with branch stream and pointer filtering.
              </p>
            </div>

            <Link
              to="/verifier/login"
              className="w-full py-3.5 rounded-xl bg-[#4A9C8A] hover:bg-[#6BBFAD] text-[#06141B] font-bold text-xs text-center block shadow-[0_0_15px_rgba(107,191,173,0.3)] transition-all"
            >
              Sign In as Verifier →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 4-STEP SYSTEM LIFECYCLE ── */}
      <section id="how-it-works" className="space-y-6 scroll-mt-24">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h2 className="text-xl sm:text-2xl font-display font-bold text-[#CCD0CF]">
            How the System Works
          </h2>
          <p className="text-xs text-[#4A5C6A]">
            Four simple steps from digital issuance to instant verification.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { num: '01', title: 'Domain & Issuance', body: 'Issuing authority selects the domain (Educational, Healthcare, Government, or Employment) and uploads the document.' },
            { num: '02', title: 'Cryptographic Sealing', body: 'Attributes are digitally sealed and immutably registered on the decentralized ledger with domain tagging.' },
            { num: '03', title: 'Selective Timed Keys', body: 'Holders select which fields to share or mask across credentials and generate timed verification access keys.' },
            { num: '04', title: 'Audit & Verification', body: 'Verifiers audit candidate keys, filter by branch streams and pointer thresholds, and export results in seconds.', accent: true },
          ].map(({ num, title, body, accent }) => (
            <div key={num} className={`glass-card rounded-2xl p-5 border ${accent ? 'border-[#4A9C8A]/30' : 'border-[#253745]'} space-y-3`}>
              <div className={`w-9 h-9 rounded-xl bg-[#253745] border ${accent ? 'border-[#4A9C8A]/40 text-[#6BBFAD]' : 'border-[#4A5C6A]/40 text-[#9BA8AB]'} font-mono font-bold text-xs flex items-center justify-center`}>
                {num}
              </div>
              <h4 className="text-sm font-display font-bold text-[#CCD0CF]">{title}</h4>
              <p className="text-xs text-[#9BA8AB] leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
