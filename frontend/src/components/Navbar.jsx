import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, Building2, Wallet, Search, LogOut, Lock } from 'lucide-react';
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

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo & Platform Identity */}
          <Link to="/" className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                Trust<span className="text-indigo-600">Verse</span>
              </span>
              <span className="block text-[10px] uppercase tracking-wider font-extrabold text-indigo-600">
                {userRole === 'ISSUER' && 'Issuer Institution Portal'}
                {userRole === 'HOLDER' && 'Holder Identity Wallet'}
                {userRole === 'VERIFIER' && 'Verifier Audit Portal'}
                {!userRole && 'Multi-Domain Credential Platform'}
              </span>
            </div>
          </Link>

          {/* STRICT ROLE-SCOPED NAVIGATION LINKS */}
          <nav className="hidden md:flex items-center space-x-1 font-medium text-xs">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg transition-colors ${
                location.pathname === '/' ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Home
            </Link>

            {userRole === 'ISSUER' && (
              <>
                <Link
                  to="/issuer/dashboard"
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    location.pathname === '/issuer/dashboard' ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Issuer Dashboard
                </Link>
                <Link
                  to="/issuer/issue"
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    location.pathname === '/issuer/issue' ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Issue Credential Pipeline
                </Link>
                <Link
                  to="/issuer/schemas"
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    location.pathname === '/issuer/schemas' ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Schema Manager
                </Link>
                <Link
                  to="/issuer/credentials"
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    location.pathname === '/issuer/credentials' ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Issued Registry
                </Link>
              </>
            )}

            {userRole === 'HOLDER' && (
              <>
                <Link
                  to="/holder/dashboard"
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    location.pathname === '/holder/dashboard' ? 'bg-purple-50 text-purple-600 font-bold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  My Identity Wallet
                </Link>
                <Link
                  to="/holder/generate-proof"
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    location.pathname === '/holder/generate-proof' ? 'bg-purple-50 text-purple-600 font-bold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Generate ZK Proof
                </Link>
              </>
            )}

            {userRole === 'VERIFIER' && (
              <>
                <Link
                  to="/verifier"
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    location.pathname === '/verifier' ? 'bg-emerald-50 text-emerald-600 font-bold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Verifier Auditor
                </Link>
                <Link
                  to="/verify"
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    location.pathname === '/verify' ? 'bg-emerald-50 text-emerald-600 font-bold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Anchor Lookup
                </Link>
              </>
            )}
          </nav>

          {/* Right Action Section */}
          <div className="flex items-center space-x-3">
            {/* Polygon Amoy Badge */}
            <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
              <span>Polygon Amoy Testnet</span>
            </div>

            {/* Authenticated User Status & Logout */}
            {user ? (
              <div className="flex items-center space-x-2">
                <div className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs flex items-center space-x-2">
                  {userRole === 'ISSUER' && <Building2 className="w-3.5 h-3.5 text-indigo-600" />}
                  {userRole === 'HOLDER' && <Wallet className="w-3.5 h-3.5 text-purple-600" />}
                  {userRole === 'VERIFIER' && <Search className="w-3.5 h-3.5 text-emerald-600" />}
                  <span className="font-bold text-slate-800">{user.name || userRole}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold transition-all border border-red-200 flex items-center space-x-1"
                  title="Sign out of current role"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </div>
            ) : (
              <Link
                to="/auth/select-role"
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all flex items-center space-x-1.5"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Select Portal / Sign In</span>
              </Link>
            )}

          </div>
        </div>
      </div>
    </header>
  );
};
