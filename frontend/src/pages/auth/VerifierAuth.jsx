import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuth, DEMO_ACCOUNTS } from '../../context/AuthContext';
import { api } from '../../services/api';

export const VerifierAuth = ({ mode = 'login' }) => {
  const { login, switchDemoRole } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('verifier@trustverse.io');
  const [password, setPassword] = useState('VerifierPass123!');
  const [agencyName, setAgencyName] = useState('Verifier Organization');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'register') {
        await api.register({
          name: agencyName,
          email,
          password,
          role: 'VERIFIER',
          organization: agencyName,
          walletAddress: '0x90F79bf6EB2c4f870365E785982E1f101E93b906'
        });
      }
      switchDemoRole('VERIFIER');
      await login(email, password);
      navigate('/verifier');
    } catch (err) {
      switchDemoRole('VERIFIER');
      navigate('/verifier');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-10 space-y-6 animate-fade-in">
      <div className="glass-card rounded-3xl p-8 border border-emerald-500/30 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <Search className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight">
            {mode === 'login' ? 'Verifier Portal Sign In' : 'Verifier Registration'}
          </h1>
          <p className="text-xs text-slate-400">Dedicated Portal for Verification & Batch Audits</p>
        </div>

        {/* Demo Preset Button */}
        <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-white block">Preset Demo Verifier</span>
            <span className="text-emerald-300 text-[11px] font-mono">Authorized Verifier</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setEmail(DEMO_ACCOUNTS.VERIFIER.email);
              setPassword(DEMO_ACCOUNTS.VERIFIER.password);
            }}
            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-[11px] transition-all shadow-[0_0_10px_rgba(16,185,129,0.3)]"
          >
            Auto Fill
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {mode === 'register' && (
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Company / Organization Name</label>
              <input
                type="text"
                value={agencyName}
                onChange={(e) => setAgencyName(e.target.value)}
                required
                className="w-full px-3.5 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition-all"
              />
            </div>
          )}

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3.5 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3.5 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-display font-bold text-xs shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center space-x-2"
          >
            <span>{loading ? 'Authenticating...' : mode === 'login' ? 'Sign In as Verifier' : 'Register as Verifier'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-800 text-xs text-slate-400">
          {mode === 'login' ? (
            <p>
              New Verifier?{' '}
              <Link to="/verifier/register" className="text-emerald-400 font-bold hover:underline">
                Register as Verifier
              </Link>
            </p>
          ) : (
            <p>
              Already Registered?{' '}
              <Link to="/verifier/login" className="text-emerald-400 font-bold hover:underline">
                Sign In
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
