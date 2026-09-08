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
      switchDemoRole('ISSUER');
      navigate('/issuer/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-10 space-y-6 animate-fade-in">
      <div className="glass-card rounded-3xl p-8 border border-indigo-500/30 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-indigo-950/80 border border-indigo-500/40 text-indigo-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(99,102,241,0.3)]">
            <Building2 className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight">
            {mode === 'login' ? 'Issuer Portal Sign In' : 'Issuer Organization Registration'}
          </h1>
          <p className="text-xs text-slate-400">Dedicated Authority Portal for Issuing Credentials</p>
        </div>

        {/* Demo Preset Button */}
        <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-white block">Preset Demo Issuer</span>
            <span className="text-indigo-300 text-[11px] font-mono">PCCOER University Registrar</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setEmail(DEMO_ACCOUNTS.ISSUER.email);
              setPassword(DEMO_ACCOUNTS.ISSUER.password);
            }}
            className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] transition-all shadow-[0_0_10px_rgba(99,102,241,0.3)]"
          >
            Auto Fill
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {mode === 'register' && (
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Organization Name</label>
              <input
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                required
                className="w-full px-3.5 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all"
              />
            </div>
          )}

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Issuer Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3.5 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3.5 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-display font-bold text-xs shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all flex items-center justify-center space-x-2"
          >
            <span>{loading ? 'Authenticating...' : mode === 'login' ? 'Sign In as Issuer' : 'Register Organization'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-800 text-xs text-slate-400">
          {mode === 'login' ? (
            <p>
              New Institution?{' '}
              <Link to="/issuer/register" className="text-indigo-400 font-bold hover:underline">
                Register as Issuer
              </Link>
            </p>
          ) : (
            <p>
              Already Registered?{' '}
              <Link to="/issuer/login" className="text-indigo-400 font-bold hover:underline">
                Sign In
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
