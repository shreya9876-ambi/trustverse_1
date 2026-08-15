import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuth, DEMO_ACCOUNTS } from '../../context/AuthContext';
import { api } from '../../services/api';

export const VerifierAuth = ({ mode = 'login' }) => {
  const { login, switchDemoRole } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('verifier@acme.com');
  const [password, setPassword] = useState('VerifierPass123!');
  const [agencyName, setAgencyName] = useState('Acme Corp Talent Acquisition');
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
    <div className="max-w-md mx-auto py-10 space-y-6">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md shadow-emerald-200">
            <Search className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            {mode === 'login' ? 'Verifier Portal Sign In' : 'Verifier Registration'}
          </h1>
          <p className="text-xs text-slate-500">Dedicated Portal for Recruiters & Background Agencies</p>
        </div>

        {/* Demo Preset Button */}
        <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-emerald-950 block">Preset Demo Verifier</span>
            <span className="text-emerald-700 text-[11px]">Acme Corp Talent Acquisition</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setEmail(DEMO_ACCOUNTS.VERIFIER.email);
              setPassword(DEMO_ACCOUNTS.VERIFIER.password);
            }}
            className="px-3 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[11px]"
          >
            Auto Fill
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {mode === 'register' && (
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Company / Agency Name</label>
              <input
                type="text"
                value={agencyName}
                onChange={(e) => setAgencyName(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          )}

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Verifier Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md flex items-center justify-center space-x-2 transition-all"
          >
            <span>{loading ? 'Authenticating...' : mode === 'login' ? 'Sign In to Verifier Portal' : 'Register Verifier'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-slate-500 flex justify-between border-t border-slate-100">
          {mode === 'login' ? (
            <Link to="/verifier/register" className="text-emerald-600 font-semibold hover:underline">New Verifier? Register Account</Link>
          ) : (
            <Link to="/verifier/login" className="text-emerald-600 font-semibold hover:underline">Already Registered? Sign In</Link>
          )}
          <Link to="/auth/select-role" className="text-slate-400 hover:text-slate-600">Switch Role Portal</Link>
        </div>
      </div>
    </div>
  );
};
