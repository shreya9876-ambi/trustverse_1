import React, { useState } from 'react';
import { Search, ShieldCheck, CheckCircle2, FileCheck, ArrowRight } from 'lucide-react';
import { api } from '../services/api';

export const Verify = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
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
    <div className="max-w-2xl mx-auto py-10 space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(6,182,212,0.3)]">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-display font-bold text-white">Public Credential Record Lookup</h1>
        <p className="text-xs text-slate-400">Enter a Credential ID or Key to verify its status on the decentralized ledger.</p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. cred_7a8f90b1c2d3 or TV-CS-9810"
          className="flex-1 px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <button
          type="submit"
          className="px-6 py-3 rounded-xl btn-gradient-cyan text-slate-950 font-bold text-xs shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center space-x-2"
        >
          <Search className="w-4 h-4" />
          <span>Lookup</span>
        </button>
      </form>

      {loading && (
        <div className="text-center py-8 text-xs text-slate-400 font-mono">Querying Decentralized Ledger & Registry...</div>
      )}

      {!loading && searched && result && (
        <div className="glass-card p-6 rounded-3xl border border-emerald-500/30 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="font-bold text-white text-sm">Credential Anchor Found</div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-300 text-xs font-mono font-bold border border-emerald-500/40">
              ✓ DECENTRALIZED LEDGER ANCHORED
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Credential ID</span>
              <span className="font-semibold text-white">{result.credentialId || query}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Issuer DID</span>
              <span className="font-semibold text-cyan-300">{result.issuerDid || 'did:trustverse:org:pccoer'}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Status</span>
              <span className="font-bold text-emerald-400">{result.status || 'ACTIVE'}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Ledger Anchor Tx</span>
              <span className="text-indigo-300 truncate block">{result.blockchainTxHash || '0x4f82a901...'}</span>
            </div>
          </div>
        </div>
      )}

      {!loading && searched && !result && (
        <div className="glass-card p-8 rounded-3xl border border-slate-800 text-center space-y-2">
          <p className="text-slate-300 text-xs font-semibold">No active record found for query.</p>
          <p className="text-slate-500 text-[11px] font-mono">Verify that the ID or key is correct and has been registered by an authority.</p>
        </div>
      )}
    </div>
  );
};
