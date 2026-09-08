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

  // Active link style using ocean-steel palette
  const activeLink = 'bg-[#253745] border border-[#4A9C8A]/40 text-[#6BBFAD] font-bold';
  const idleLink   = 'text-[#9BA8AB] hover:text-[#CCD0CF] hover:bg-[#11212D]/70';

  return (
    <header className="sticky top-0 z-50 bg-[#06141B]/92 backdrop-blur-xl border-b border-[#253745] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to={logoDestination} className="flex items-center space-x-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#4A9C8A] to-[#9BA8AB] flex items-center justify-center text-[#06141B] font-bold shadow-[0_0_15px_rgba(74,156,138,0.35)] group-hover:scale-105 transition-transform duration-300">
              <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-lg font-display font-extrabold tracking-tight text-[#CCD0CF] group-hover:text-[#6BBFAD] transition-colors">
                Trust<span className="text-[#4A9C8A]">Verse</span>
              </span>
              <span className="block text-[10px] uppercase tracking-wider font-semibold text-[#4A5C6A]">
                {userRole === 'ISSUER'   && 'Issuer Portal'}
                {userRole === 'HOLDER'   && 'Holder Wallet'}
                {userRole === 'VERIFIER' && 'Verifier Portal'}
                {userRole === 'ADMIN'    && 'Admin Portal'}
                {!userRole               && 'Identity & Verification Platform'}
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1 font-medium text-xs">
            {!user && (
              <>
                <Link to="/"
                  className={`px-3.5 py-2 rounded-xl transition-all ${location.pathname === '/' ? activeLink : idleLink}`}>
                  Home
                </Link>
                <Link to="/how-it-works"
                  className={`px-3.5 py-2 rounded-xl transition-all ${location.pathname === '/how-it-works' ? activeLink : idleLink}`}>
                  How It Works
                </Link>
              </>
            )}

            {userRole === 'ISSUER' && (
              <>
                <Link to="/issuer/dashboard"
                  className={`px-3.5 py-2 rounded-xl transition-all ${location.pathname === '/issuer/dashboard' ? activeLink : idleLink}`}>
                  Dashboard
                </Link>
                <Link to="/issuer/issue"
                  className={`px-3.5 py-2 rounded-xl transition-all ${location.pathname === '/issuer/issue' ? activeLink : idleLink}`}>
                  Issue Credential
                </Link>
                <Link to="/issuer/credentials"
                  className={`px-3.5 py-2 rounded-xl transition-all ${location.pathname === '/issuer/credentials' ? activeLink : idleLink}`}>
                  Issued Registry
                </Link>
              </>
            )}

            {userRole === 'HOLDER' && (
              <>
                <Link to="/holder/dashboard"
                  className={`px-3.5 py-2 rounded-xl transition-all ${location.pathname === '/holder/dashboard' ? activeLink : idleLink}`}>
                  My Wallet
                </Link>
                <Link to="/holder/generate-proof"
                  className={`px-3.5 py-2 rounded-xl transition-all ${location.pathname === '/holder/generate-proof' ? activeLink : idleLink}`}>
                  Generate Proof
                </Link>
              </>
            )}

            {userRole === 'VERIFIER' && (
              <Link to="/verifier"
                className={`px-3.5 py-2 rounded-xl transition-all ${location.pathname === '/verifier' ? activeLink : idleLink}`}>
                Verifier Portal
              </Link>
            )}

            {userRole === 'ADMIN' && (
              <Link to="/admin/dashboard"
                className={`px-3.5 py-2 rounded-xl transition-all ${location.pathname === '/admin/dashboard' ? activeLink : idleLink}`}>
                Admin Dashboard
              </Link>
            )}
          </nav>

          {/* Right Action */}
          <div className="flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-2">
                <div className="px-3 py-1.5 rounded-xl bg-[#11212D] border border-[#253745] text-xs flex items-center space-x-2">
                  {userRole === 'ISSUER'   && <Building2 className="w-3.5 h-3.5 text-[#4A9C8A]" />}
                  {userRole === 'HOLDER'   && <Wallet    className="w-3.5 h-3.5 text-[#9BA8AB]" />}
                  {userRole === 'VERIFIER' && <Search    className="w-3.5 h-3.5 text-[#6BBFAD]" />}
                  <span className="font-bold text-[#CCD0CF]">{user.name || userRole}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="px-3 py-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900/70 text-rose-300 text-xs font-bold transition-all border border-rose-500/30 flex items-center space-x-1"
                  title="Sign out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </div>
            ) : (
              <Link
                to="/auth/select-role"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#4A9C8A] to-[#6BBFAD] hover:from-[#6BBFAD] hover:to-[#4A9C8A] text-[#06141B] font-bold text-xs shadow-[0_0_20px_rgba(74,156,138,0.3)] transition-all flex items-center space-x-1.5"
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
