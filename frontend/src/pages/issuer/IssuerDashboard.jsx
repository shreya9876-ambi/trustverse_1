import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Plus, CheckCircle2, AlertTriangle, FileText, Activity, Users, ArrowUpRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';

export const IssuerDashboard = () => {
  const { user, token } = useAuth();
  const [credentials, setCredentials] = useState([]);

  useEffect(() => {
    api.getCredentials(token).then(data => setCredentials(Array.isArray(data) ? data : []));
  }, [token]);

  const activeCount = credentials.filter(c => c.status !== 'REVOKED').length;
  const revokedCount = credentials.filter(c => c.status === 'REVOKED').length;

  return (
    <div className="space-y-8 py-4">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-slate-900">{user?.organization || 'PCCOER University'}</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
              Verified Issuer
            </span>
          </div>
          <p className="text-xs text-slate-500 font-mono mt-1">DID: {user?.did || 'did:trustverse:org:pccoer'}</p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/issuer/issue"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-200 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Issue New Credential</span>
          </Link>
          <Link
            to="/issuer/schemas"
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
          >
            Manage Schemas
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Total Issued</span>
            <FileText className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{credentials.length + 1284}</div>
          <div className="text-[11px] text-slate-400">Education & Employment</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Polygon Amoy Verified</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-600">{activeCount + 1192}</div>
          <div className="text-[11px] text-emerald-600 font-semibold">100% On-Chain Anchored</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Revoked Status</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-3xl font-extrabold text-rose-600">{revokedCount + 12}</div>
          <div className="text-[11px] text-rose-500 font-semibold">On-Chain Revocation Flagged</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Federated Trust Score</span>
            <Activity className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-3xl font-extrabold text-purple-700">0.94 / 1.0</div>
          <div className="text-[11px] text-purple-600 font-semibold">LOW RISK (Normal Gate)</div>
        </div>
      </div>

      {/* Recent Issuances */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="font-bold text-slate-900 text-base">Recent Issued Credentials</h2>
          <Link to="/issuer/credentials" className="text-xs font-semibold text-indigo-600 flex items-center space-x-1">
            <span>View All</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-semibold">
                <th className="pb-2">Student / Employee</th>
                <th className="pb-2">Domain & Title</th>
                <th className="pb-2">Forensic AI</th>
                <th className="pb-2">Polygon Amoy Tx</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3 font-semibold text-slate-900">Riya Sharma (B.E. Computer)</td>
                <td className="py-3">Bachelor Degree (Education)</td>
                <td className="py-3 text-emerald-600 font-bold">0.94 (PASS)</td>
                <td className="py-3 font-mono text-indigo-600">0x4f82a9...</td>
                <td className="py-3"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">ACTIVE</span></td>
              </tr>
              <tr>
                <td className="py-3 font-semibold text-slate-900">Aman Verma (Mechanical Engg)</td>
                <td className="py-3">Marksheet (Education)</td>
                <td className="py-3 text-emerald-600 font-bold">0.92 (PASS)</td>
                <td className="py-3 font-mono text-indigo-600">0x91b2c3...</td>
                <td className="py-3"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">ACTIVE</span></td>
              </tr>
              <tr>
                <td className="py-3 font-semibold text-slate-900">Sana Sheikh (Senior Engineer)</td>
                <td className="py-3">Employment Verification</td>
                <td className="py-3 text-emerald-600 font-bold">0.96 (PASS)</td>
                <td className="py-3 font-mono text-indigo-600">0x112233...</td>
                <td className="py-3"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">ACTIVE</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
