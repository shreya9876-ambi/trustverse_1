import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Wallet, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuth, DEMO_ACCOUNTS } from '../../context/AuthContext';
import { api } from '../../services/api';

export const HolderAuth = ({ mode = 'login' }) => {
  const { login, switchDemoRole } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('holder@trustverse.io');
  const [password, setPassword] = useState('HolderPass123!');
  const [name, setName] = useState('Riya Sharma');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'register') {
        await api.register({
          name,
          email,
          password,
          role: 'HOLDER',
          organization: 'Computer Science Department',
          walletAddress: '0x3C44CdD1605330166787697201e857465239e761'
        });
      }
      switchDemoRole('HOLDER');
      await login(email, password);
      navigate('/holder/dashboard');
    } catch (err) {
      switchDemoRole('HOLDER');
      navigate('/holder/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-10 space-y-6 animate-fade-in">
      <div className="glass-card rounded-3xl p-8 border border-purple-500/30 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-purple-950/80 border border-purple-500/40 text-purple-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(168,85,247,0.3)]">
            <Wallet className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight">
            {mode === 'login' ? 'Holder Wallet Sign In' : 'Create Holder DID Wallet'}
          </h1>
          <p className="text-xs text-slate-400">Self-Sovereign Identity Wallet for Credentials & Timed Keys</p>
        </div>

        {/* Demo Preset Button */}
        <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-500/30 flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-white block">Preset Demo Holder</span>
            <span className="text-purple-300 text-[11px] font-mono">Riya Sharma (Student)</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setEmail(DEMO_ACCOUNTS.HOLDER.email);
              setPassword(DEMO_ACCOUNTS.HOLDER.password);
            }}
            className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-[11px] transition-all shadow-[0_0_10px_rgba(168,85,247,0.3)]"
          >
            Auto Fill
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {mode === 'register' && (
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3.5 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-all"
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
              className="w-full px-3.5 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3.5 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-display font-bold text-xs shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all flex items-center justify-center space-x-2"
          >
            <span>{loading ? 'Opening Wallet...' : mode === 'login' ? 'Open Identity Wallet' : 'Create Identity Wallet'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-800 text-xs text-slate-400">
          {mode === 'login' ? (
            <p>
              New Holder?{' '}
              <Link to="/holder/register" className="text-purple-400 font-bold hover:underline">
                Create DID Wallet
              </Link>
            </p>
          ) : (
            <p>
              Already have a wallet?{' '}
              <Link to="/holder/login" className="text-purple-400 font-bold hover:underline">
                Sign In
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
