import React from 'react';
import { ShieldCheck, Lock, Cpu, KeyRound, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';

export const HowItWorks = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-10 py-6">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-extrabold text-slate-900">TrustVerse Cryptographic Architecture</h1>
        <p className="text-slate-600 text-sm">
          Comprehensive breakdown of salted Merkle commitments, Web3j Polygon Amoy anchoring, and Groth16 selective disclosure.
        </p>
      </div>

      {/* Security Principles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-rose-600 font-bold text-sm">
            <Lock className="w-5 h-5" />
            <span>Attack 1: Dictionary Hashing Vulnerability</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Standard <code>SHA256(claim)</code> is vulnerable to dictionary and rainbow table attacks when claim fields have low entropy (e.g. CGPA values between 0.0 and 10.0, or birth years).
          </p>
          <div className="p-3 rounded-lg bg-slate-900 text-slate-200 font-mono text-xs">
            Hash(claim || randomSalt_256bit)
          </div>
          <p className="text-xs text-emerald-600 font-semibold">
            TrustVerse generates a cryptographically secure 256-bit random salt for every claim commitment, rendering rainbow tables impossible.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-indigo-600 font-bold text-sm">
            <KeyRound className="w-5 h-5" />
            <span>Attack 2: Replay Attack Vulnerability</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            A static zero-knowledge proof generated for Verifier A could be intercepted and replayed to Verifier B if not bound to the session context.
          </p>
          <div className="p-3 rounded-lg bg-slate-900 text-slate-200 font-mono text-xs">
            PublicInputs = MerkleRoot || Nonce_256bit || HolderDID
          </div>
          <p className="text-xs text-indigo-600 font-semibold">
            Every proof session generates a cryptographically secure one-time verifier nonce bound to the holder's DID. Replaying a proof fails instantly.
          </p>
        </div>
      </div>

      {/* Java & Web3j Architecture */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-slate-900">Java 21 / Spring Boot 3.x Web3j Service</h2>
        <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
          <p>
            The Spring Boot backend communicates directly with the Polygon Amoy EVM Testnet using <strong>Web3j 4.10.3</strong>.
          </p>
          <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-[11px] space-y-1">
            <div className="text-purple-400">// Spring Boot Web3j Anchor Call</div>
            <div>BlockchainService.anchorCredentialOnChain(credentialId, merkleRoot, issuerDid, pqcSig);</div>
            <div className="text-slate-400">// Smart Contract: TrustVerseAnchor.sol (Chain ID: 80002)</div>
          </div>
          <p>
            Only minimal metadata (Merkle Root, Issuer DID, timestamp, PQC signature reference) is stored on-chain. Unencrypted raw certificate JSON or PDFs are never placed on Polygon Amoy.
          </p>
        </div>
      </div>
    </div>
  );
};
