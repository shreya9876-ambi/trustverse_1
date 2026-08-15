import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Building2, Wallet, Search, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const RoleSelect = () => {
  const { switchDemoRole } = useAuth();
  const navigate = useNavigate();

  const handleSelectRole = (roleKey, targetPath) => {
    switchDemoRole(roleKey);
    navigate(targetPath);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-8">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-md shadow-indigo-200">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">Select Portal Entry Role</h1>
        <p className="text-xs text-slate-600 max-w-xl mx-auto">
          TrustVerse uses strictly segregated portals for Issuing Institutions, Credential Holders, and Verifiers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ISSUER PORTAL CARD */}
        <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-md hover:shadow-xl transition-all space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Issuer Portal</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              For Universities, Colleges, Employers, Hospitals, and Government Authorities. Upload certificates, run AI forensic checks, and anchor salted Merkle roots on Polygon Amoy.
            </p>
          </div>
          <button
            onClick={() => handleSelectRole('ISSUER', '/issuer/login')}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md flex items-center justify-center space-x-2"
          >
            <span>Issuer Login / Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* HOLDER WALLET CARD */}
        <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-md hover:shadow-xl transition-all space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Wallet className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Holder Wallet</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              For Students, Candidates, and Credential Holders. Manage self-sovereign DID credentials, select specific claims (e.g. CGPA &ge; 7.5), and generate Groth16 ZK proofs.
            </p>
          </div>
          <button
            onClick={() => handleSelectRole('HOLDER', '/holder/login')}
            className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md flex items-center justify-center space-x-2"
          >
            <span>Holder Wallet Login</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* VERIFIER PORTAL CARD */}
        <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-md hover:shadow-xl transition-all space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Search className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Verifier Portal</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              For Recruiters, HR Managers, and Verifying Agencies. Request claims, generate one-time verifier nonces, scan QR codes, and audit Zero-Knowledge proof evaluations.
            </p>
          </div>
          <button
            onClick={() => handleSelectRole('VERIFIER', '/verifier/login')}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md flex items-center justify-center space-x-2"
          >
            <span>Verifier Login / Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
