import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth, DEMO_ACCOUNTS } from '../../context/AuthContext';
import { api } from '../../services/api';

export const IssuerAuth = ({ mode = 'login' }) => {
  const { login, switchDemoRole } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('issuer@pccoer.edu');
  const [password, setPassword] = useState('IssuerPass123!');
  const [orgName, setOrgName] = useState('PCCOER University');
  const [domain, setDomain] = useState('education');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'register') {
        await api.register({
          name: orgName,
          email,
          password,
          role: 'ISSUER',
          organization: orgName,
          walletAddress: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'
        });
      }
      switchDemoRole('ISSUER');
      await login(email, password);
      navigate('/issuer/dashboard');
    } catch (err) {
      // Fallback demo login
      switchDemoRole('ISSUER');
      navigate('/issuer/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-10 space-y-6">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-md shadow-indigo-200">
            <Building2 className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            {mode === 'login' ? 'Issuer Portal Sign In' : 'Issuer Organization Registration'}
          </h1>
          <p className="text-xs text-slate-500">Dedicated Portal for Universities, Employers & Authorities</p>
        </div>

        {/* Demo Preset Button */}
        <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-100 flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-indigo-950 block">Preset Demo Issuer</span>
            <span className="text-indigo-700 text-[11px]">PCCOER University Registrar</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setEmail(DEMO_ACCOUNTS.ISSUER.email);
              setPassword(DEMO_ACCOUNTS.ISSUER.password);
            }}
            className="px-3 py-1 rounded-lg bg-indigo-600 text-white font-bold text-[11px]"
          >
            Auto Fill
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {mode === 'register' && (
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Organization Name</label>
              <input
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          )}

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Issuer Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md flex items-center justify-center space-x-2 transition-all"
          >
            <span>{loading ? 'Authenticating...' : mode === 'login' ? 'Sign In to Issuer Portal' : 'Register Institution'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-slate-500 flex justify-between border-t border-slate-100">
          {mode === 'login' ? (
            <Link to="/issuer/register" className="text-indigo-600 font-semibold hover:underline">New Issuer? Register Institution</Link>
          ) : (
            <Link to="/issuer/login" className="text-indigo-600 font-semibold hover:underline">Already Registered? Sign In</Link>
          )}
          <Link to="/auth/select-role" className="text-slate-400 hover:text-slate-600">Switch Role Portal</Link>
        </div>
      </div>
    </div>
  );
};
