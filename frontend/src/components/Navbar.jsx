import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, Building2, Wallet, Search, LogOut, Lock, Plus, Layers, FileText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const userRole = user?.role?.replace('ROLE_', '') || null;

  const handleSignOut = () => {
    logout();
    navigate('/auth/select-role');
  };

  const logoDestination = userRole === 'ISSUER' ? '/issuer/dashboard'
    : userRole === 'HOLDER' ? '/holder/dashboard'
    : userRole === 'VERIFIER' ? '/verifier'
    : userRole === 'ADMIN' ? '/admin/dashboard'
    : '/';

  return (
    <header className="sticky top-0 z-50 bg-[#080c18]/90 backdrop-blur-xl border-b border-slate-800 text-slate-100 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to={logoDestination} className="flex items-center space-x-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-400 flex items-center justify-center text-slate-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)] group-hover:scale-105 transition-transform duration-300">
              <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-lg font-display font-extrabold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                Trust<span className="text-cyan-400">Verse</span>
              </span>
              <span className="block text-[10px] uppercase tracking-wider font-semibold text-slate-400">
                {userRole === 'ISSUER' && 'Issuer Portal'}
                {userRole === 'HOLDER' && 'Holder Wallet'}
                {userRole === 'VERIFIER' && 'Verifier Portal'}
                {userRole === 'ADMIN' && 'Admin Portal'}
                {!userRole && 'Identity & Verification Platform'}
              </span>
            </div>
          </Link>

          {/* Clean Functional Navigation */}
          <nav className="hidden md:flex items-center space-x-1 font-medium text-xs">
            {/* Show Home & How It Works ONLY for unauthenticated visitors */}
            {!user && (
              <>
                <Link
                  to="/"
                  className={`px-3.5 py-2 rounded-xl transition-all ${
                    location.pathname === '/'
                      ? 'bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-bold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/how-it-works"
                  className={`px-3.5 py-2 rounded-xl transition-all ${
                    location.pathname === '/how-it-works'
                      ? 'bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-bold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  How It Works
                </Link>
              </>
            )}

            {/* ISSUER ROLE LINKS */}
            {userRole === 'ISSUER' && (
              <>
                <Link
                  to="/issuer/dashboard"
                  className={`px-3.5 py-2 rounded-xl transition-all ${
                    location.pathname === '/issuer/dashboard'
                      ? 'bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-bold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/issuer/issue"
                  className={`px-3.5 py-2 rounded-xl transition-all ${
                    location.pathname === '/issuer/issue'
                      ? 'bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-bold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  Issue Credential
                </Link>

                <Link
                  to="/issuer/credentials"
                  className={`px-3.5 py-2 rounded-xl transition-all ${
                    location.pathname === '/issuer/credentials'
                      ? 'bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-bold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  Issued Registry
                </Link>
              </>
            )}

            {/* HOLDER ROLE LINKS */}
            {userRole === 'HOLDER' && (
              <>
                <Link
                  to="/holder/dashboard"
                  className={`px-3.5 py-2 rounded-xl transition-all ${
                    location.pathname === '/holder/dashboard'
                      ? 'bg-purple-500/15 border border-purple-500/30 text-purple-300 font-bold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  My Wallet
                </Link>
                <Link
                  to="/holder/generate-proof"
                  className={`px-3.5 py-2 rounded-xl transition-all ${
                    location.pathname === '/holder/generate-proof'
                      ? 'bg-purple-500/15 border border-purple-500/30 text-purple-300 font-bold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  Generate Proof
                </Link>
              </>
            )}

            {/* VERIFIER ROLE LINKS */}
            {userRole === 'VERIFIER' && (
              <Link
                to="/verifier"
                className={`px-3.5 py-2 rounded-xl transition-all ${
                  location.pathname === '/verifier'
                    ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                Verifier Portal
              </Link>
            )}

            {/* ADMIN ROLE LINKS */}
            {userRole === 'ADMIN' && (
              <Link
                to="/admin/dashboard"
                className={`px-3.5 py-2 rounded-xl transition-all ${
                  location.pathname === '/admin/dashboard'
                    ? 'bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                Admin Dashboard
              </Link>
            )}
          </nav>

          {/* Right Action Section */}
          <div className="flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-2">
                <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs flex items-center space-x-2">
                  {userRole === 'ISSUER' && <Building2 className="w-3.5 h-3.5 text-indigo-400" />}
                  {userRole === 'HOLDER' && <Wallet className="w-3.5 h-3.5 text-purple-400" />}
                  {userRole === 'VERIFIER' && <Search className="w-3.5 h-3.5 text-emerald-400" />}
                  <span className="font-bold text-slate-200">{user.name || userRole}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="px-3 py-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 text-xs font-bold transition-all border border-rose-500/30 flex items-center space-x-1"
                  title="Sign out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </div>
            ) : (
              <Link
                to="/auth/select-role"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 font-bold text-xs shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all flex items-center space-x-1.5"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Select Portal</span>
              </Link>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
