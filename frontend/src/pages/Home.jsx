import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Wallet, Search, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

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
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 max-w-5xl mx-auto animate-fade-in space-y-12">

      {/* ── Heading ── */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#11212D] border border-[#4A9C8A]/35 text-[#6BBFAD] text-xs font-semibold backdrop-blur-xl">
          <span className="w-2 h-2 rounded-full bg-[#4A9C8A] animate-pulse"></span>
          <span className="font-mono">Multi-Domain Credential Platform</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-[#CCD0CF] leading-[1.12]">
          Trust<span className="text-[#4A9C8A]">Verse</span>
        </h1>
        <p className="text-[#9BA8AB] text-sm sm:text-base leading-relaxed">
          Secure credential issuance &amp; instant verification across education, healthcare, government, and employment.
        </p>
      </div>

      {/* ── Role Cards ── */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Issuer */}
        <div className="glass-card glass-card-hover rounded-3xl p-7 flex flex-col justify-between space-y-6 border border-[#4A9C8A]/20 group">
          <div className="space-y-4">
            <div className="w-13 h-13 w-12 h-12 rounded-2xl bg-[#253745] border border-[#4A9C8A]/30 text-[#4A9C8A] flex items-center justify-center shadow-[0_0_18px_rgba(74,156,138,0.2)] group-hover:scale-110 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#4A9C8A]">
                Role 01 — Authority
              </span>
              <h2 className="text-xl font-display font-bold text-[#CCD0CF] group-hover:text-[#6BBFAD] transition-colors mt-0.5">
                Issuer Portal
              </h2>
            </div>
            <p className="text-xs text-[#9BA8AB] leading-relaxed">
              For universities, employers, healthcare facilities, and government agencies. Issue tamper-evident digital credentials across any domain.
            </p>
          </div>

          <Link
            to="/issuer/login"
            className="w-full py-3.5 rounded-xl bg-[#253745] hover:bg-[#4A9C8A] text-[#CCD0CF] hover:text-[#06141B] font-bold text-xs text-center block transition-all border border-[#4A9C8A]/30 flex items-center justify-center space-x-1.5"
          >
            <span>Sign In as Issuer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Holder */}
        <div className="glass-card glass-card-hover rounded-3xl p-7 flex flex-col justify-between space-y-6 border border-[#9BA8AB]/20 group">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#11212D] border border-[#9BA8AB]/30 text-[#9BA8AB] flex items-center justify-center shadow-[0_0_18px_rgba(155,168,171,0.2)] group-hover:scale-110 transition-transform">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#9BA8AB]">
                Role 02 — Credential Holder
              </span>
              <h2 className="text-xl font-display font-bold text-[#CCD0CF] group-hover:text-[#CCD0CF] transition-colors mt-0.5">
                Holder Wallet
              </h2>
            </div>
            <p className="text-xs text-[#9BA8AB] leading-relaxed">
              For students, candidates, and individuals. Bundle credentials, selectively mask attributes, and generate timed verification keys.
            </p>
          </div>

          <Link
            to="/holder/login"
            className="w-full py-3.5 rounded-xl bg-[#253745] hover:bg-[#4A5C6A] text-[#CCD0CF] font-bold text-xs text-center block transition-all border border-[#9BA8AB]/30 flex items-center justify-center space-x-1.5"
          >
            <span>Sign In to Holder Wallet</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Verifier */}
        <div className="glass-card glass-card-hover rounded-3xl p-7 flex flex-col justify-between space-y-6 border border-[#6BBFAD]/20 group">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#11212D] border border-[#6BBFAD]/30 text-[#6BBFAD] flex items-center justify-center shadow-[0_0_18px_rgba(107,191,173,0.2)] group-hover:scale-110 transition-transform">
              <Search className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#6BBFAD]">
                Role 03 — Verifier
              </span>
              <h2 className="text-xl font-display font-bold text-[#CCD0CF] group-hover:text-[#6BBFAD] transition-colors mt-0.5">
                Verifier Portal
              </h2>
            </div>
            <p className="text-xs text-[#9BA8AB] leading-relaxed">
              For HR recruiters, admissions, and auditors. Verify individual keys or batch-audit candidates with domain and filter controls.
            </p>
          </div>

          <Link
            to="/verifier/login"
            className="w-full py-3.5 rounded-xl bg-[#4A9C8A] hover:bg-[#6BBFAD] text-[#06141B] font-bold text-xs text-center block transition-all flex items-center justify-center space-x-1.5"
          >
            <span>Sign In as Verifier</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
};
