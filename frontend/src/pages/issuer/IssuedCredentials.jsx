import React, { useState, useEffect } from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';

export const IssuedCredentials = () => {
  const { token } = useAuth();
  const [credentials, setCredentials] = useState([]);

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    const data = await api.getCredentials(token);
    setCredentials(Array.isArray(data) ? data : []);
  };

  const handleRevoke = async (id) => {
    if (!window.confirm('Are you sure you want to revoke this credential on Polygon Amoy?')) return;
    try {
      await api.revokeCredential(id, 'Issuer decision - Administrative revocation', token);
      alert('Credential revoked on Polygon Amoy!');
      fetchList();
    } catch (err) {
      alert('Revocation failed: ' + err.message);
    }
  };

  return (
    <div className="space-y-6 py-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Issued Credentials Registry</h1>
        <p className="text-xs text-slate-500">View and manage issued credentials, Merkle roots, and on-chain revocation statuses.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[11px]">
            <tr>
              <th className="p-4">Credential ID</th>
              <th className="p-4">Domain</th>
              <th className="p-4">Merkle Root</th>
              <th className="p-4">Trust Score</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {credentials.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-6 text-center text-slate-400">No credentials issued yet. Click "Issue New Credential" to run the master pipeline.</td>
              </tr>
            ) : (
              credentials.map((c) => (
                <tr key={c.id || c.credentialId}>
                  <td className="p-4 font-mono font-semibold text-slate-900">{c.credentialId}</td>
                  <td className="p-4 uppercase font-semibold text-slate-700">{c.domain}</td>
                  <td className="p-4 font-mono text-indigo-600 truncate max-w-[150px]">{c.merkleRoot}</td>
                  <td className="p-4 text-emerald-600 font-bold">{c.trustScore || 0.94}</td>
                  <td className="p-4">
                    {c.status === 'REVOKED' ? (
                      <span className="px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 font-bold border border-rose-200">
                        REVOKED ON-CHAIN
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                        ACTIVE & ANCHORED
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    {c.status !== 'REVOKED' && (
                      <button
                        onClick={() => handleRevoke(c.credentialId || c.id)}
                        className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 font-semibold border border-rose-200 text-xs"
                      >
                        Revoke On-Chain
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
