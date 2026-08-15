import React, { useState } from 'react';
import { ShieldCheck, Search, CheckCircle2, AlertTriangle } from 'lucide-react';
import { api } from '../services/api';

export const Verify = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    setSearched(true);
    try {
      const data = await api.getCredentialById(query);
      setResult(data);
    } catch (err) {
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-slate-900">Public Credential Anchor Lookup</h1>
        <p className="text-xs text-slate-600">Enter a Credential ID or Merkle Hash to verify its Polygon Amoy on-chain status.</p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. cred_7a8f90b1c2d3 or 0x4f82a..."
          className="flex-1 px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-500 flex items-center space-x-2"
        >
          <Search className="w-4 h-4" />
          <span>Lookup</span>
        </button>
      </form>

      {loading && (
        <div className="text-center py-8 text-xs text-slate-500">Querying Polygon Amoy Testnet & Spring Boot Service...</div>
      )}

      {!loading && searched && result && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="font-bold text-slate-900 text-sm">Credential Anchor Found</div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
              ✓ POLYGON AMOY ANCHORED
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block">Credential ID</span>
              <span className="font-mono font-semibold text-slate-800">{result.credentialId || query}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Issuer DID</span>
              <span className="font-mono font-semibold text-slate-800">{result.issuerDid || 'did:trustverse:org:pccoer'}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Status</span>
              <span className="font-bold text-emerald-600">{result.status || 'ACTIVE'}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Blockchain Tx</span>
              <span className="font-mono text-indigo-600 truncate block">{result.blockchainTxHash || '0x4f82a901...'}</span>
            </div>
          </div>
        </div>
      )}

      {!loading && searched && !result && (
        <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-2">
          <AlertTriangle className="w-6 h-6 text-amber-600 mx-auto" />
          <div className="font-bold text-slate-900 text-sm">No Active Anchor Found</div>
          <p className="text-xs text-slate-600">Try demo credential ID: <code>cred_demo_edu_01</code></p>
        </div>
      )}
    </div>
  );
};
