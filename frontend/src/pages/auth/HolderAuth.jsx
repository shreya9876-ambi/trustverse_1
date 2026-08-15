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
    <div className="max-w-md mx-auto py-10 space-y-6">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center mx-auto shadow-md shadow-purple-200">
            <Wallet className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            {mode === 'login' ? 'Holder Wallet Sign In' : 'Create Holder DID Wallet'}
          </h1>
          <p className="text-xs text-slate-500">Dedicated Self-Sovereign Identity Wallet for Students & Individuals</p>
        </div>

        {/* Demo Preset Button */}
        <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-100 flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-purple-950 block">Preset Demo Holder</span>
            <span className="text-purple-700 text-[11px]">Riya Sharma (Student)</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setEmail(DEMO_ACCOUNTS.HOLDER.email);
              setPassword(DEMO_ACCOUNTS.HOLDER.password);
            }}
            className="px-3 py-1 rounded-lg bg-purple-600 text-white font-bold text-[11px]"
          >
            Auto Fill
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {mode === 'register' && (
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
          )}

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-md flex items-center justify-center space-x-2 transition-all"
          >
            <span>{loading ? 'Opening Wallet...' : mode === 'login' ? 'Open Holder Wallet' : 'Create DID Wallet'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-slate-500 flex justify-between border-t border-slate-100">
          {mode === 'login' ? (
            <Link to="/holder/register" className="text-purple-600 font-semibold hover:underline">New Holder? Create Wallet</Link>
          ) : (
            <Link to="/holder/login" className="text-purple-600 font-semibold hover:underline">Already Have Wallet? Sign In</Link>
          )}
          <Link to="/auth/select-role" className="text-slate-400 hover:text-slate-600">Switch Role Portal</Link>
        </div>
      </div>
    </div>
  );
};
