import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, UserCheck, Lock } from 'lucide-react';
import { useAuth, DEMO_ACCOUNTS } from '../../context/AuthContext';

export const Login = () => {
  const { login, switchDemoRole } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('issuer@pccoer.edu');
  const [password, setPassword] = useState('IssuerPass123!');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const loggedUser = await login(email, password);
      if (loggedUser.role?.includes('ISSUER')) navigate('/issuer/dashboard');
      else if (loggedUser.role?.includes('HOLDER')) navigate('/holder/dashboard');
      else if (loggedUser.role?.includes('VERIFIER')) navigate('/verifier');
      else navigate('/admin/dashboard');
    } catch (err) {
      alert('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = (roleKey) => {
    const acc = DEMO_ACCOUNTS[roleKey];
    setEmail(acc.email);
    setPassword(acc.password);
    switchDemoRole(roleKey);
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-md shadow-indigo-200">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Sign In to TrustVerse</h1>
          <p className="text-xs text-slate-500">Access Issuer Portal, Holder Wallet, or Verifier Tools</p>
        </div>

        {/* Quick Demo Buttons */}
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">Quick Demo Account Switcher</span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button type="button" onClick={() => handleQuickFill('ISSUER')} className="p-2 rounded-lg bg-white border border-slate-200 hover:border-indigo-500 font-semibold text-slate-700 text-left">
              🎓 Issuer (PCCOER)
            </button>
            <button type="button" onClick={() => handleQuickFill('HOLDER')} className="p-2 rounded-lg bg-white border border-slate-200 hover:border-indigo-500 font-semibold text-slate-700 text-left">
              💳 Holder (Riya)
            </button>
            <button type="button" onClick={() => handleQuickFill('VERIFIER')} className="p-2 rounded-lg bg-white border border-slate-200 hover:border-indigo-500 font-semibold text-slate-700 text-left">
              🔍 Verifier (Acme)
            </button>
            <button type="button" onClick={() => handleQuickFill('ADMIN')} className="p-2 rounded-lg bg-white border border-slate-200 hover:border-indigo-500 font-semibold text-slate-700 text-left">
              ⚡ Admin
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md transition-all"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};
