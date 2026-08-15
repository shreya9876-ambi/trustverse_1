import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { ShieldCheck, KeyRound, CheckCircle2, Lock, ArrowRight, Hash, Fingerprint, Eye, EyeOff, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';

export const GenerateProof = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const credentialIdParam = searchParams.get('credentialId') || 'cred_edu_2026_001';

  const [requestedClaim, setRequestedClaim] = useState('cgpa >= 7.5');
  const [proofRequest, setProofRequest] = useState(null);
  const [zkProof, setZkProof] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Wallet Holder selectively chooses which claims to reveal vs keep hidden
  const [claimSelections, setClaimSelections] = useState({
    cgpa: true,
    degree: true,
    institution: false,
    studentName: false,
    studentId: false,
    graduationYear: false
  });

  const toggleClaim = (key) => {
    setClaimSelections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Step 1: Obtain verifier one-time nonce
  const handleInitiateNonce = async () => {
    setError('');
    setLoading(true);
    try {
      const request = await api.requestProof(credentialIdParam, requestedClaim, token);
      setProofRequest(request);
    } catch (err) {
      setError('Failed to obtain verifier nonce: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Compute selective disclosure hash key & Groth16 ZK proof
  const handleGenerateProof = async () => {
    if (!proofRequest) return;
    setError('');
    setLoading(true);
    try {
      const holderDid = user?.did || 'did:trustverse:holder:riyasharma';
      const payload = await api.generateZkProof(
        proofRequest.id,
        holderDid,
        claimSelections,
        token
      );
      setZkProof(payload);
    } catch (err) {
      setError('ZK Proof computation failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-6 space-y-8">

      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto shadow-md shadow-purple-100">
          <KeyRound className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900">Zero-Knowledge Selective Disclosure Generator</h1>
        <p className="text-xs text-slate-600 max-w-md mx-auto">
          Select what to reveal. Generate a new cryptographic disclosure hash & ZK proof bound to a verifier one-time nonce.
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
          {error}
        </div>
      )}

      {/* STEP 1: Verifier Nonce Request */}
      {!proofRequest && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
              Verifier Requested Condition / Claim Statement
            </label>
            <input
              type="text"
              value={requestedClaim}
              onChange={(e) => setRequestedClaim(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono font-semibold text-sm text-slate-900 focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
            <p className="text-[11px] text-slate-400">
              Example: <code>cgpa &ge; 7.5</code> or <code>experienceYears &ge; 2</code>
            </p>
          </div>

          <button
            onClick={handleInitiateNonce}
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-md flex items-center justify-center space-x-2 transition-all"
          >
            <KeyRound className="w-4 h-4" />
            <span>{loading ? 'Obtaining Verifier Nonce...' : 'Obtain Verifier One-Time Nonce'}</span>
          </button>
        </div>
      )}

      {/* STEP 2: Interactive Selective Claim Discloser */}
      {proofRequest && !zkProof && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">

          {/* Verifier Nonce Badge */}
          <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-xs space-y-1 font-mono">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Verifier One-Time Nonce:</span>
              <span className="px-2 py-0.5 rounded bg-purple-200 text-purple-800 text-[10px] font-bold">REPLAY PROTECTED</span>
            </div>
            <p className="text-purple-900 font-bold break-all text-xs">{proofRequest.nonce}</p>
          </div>

          {/* Selective Claim Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Selective Disclosure — Choose What to Show
              </label>
              <span className="text-[11px] text-purple-600 font-semibold flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Holder Privacy Control</span>
              </span>
            </div>

            <div className="space-y-2.5">
              {Object.entries(claimSelections).map(([claimKey, isSelected]) => (
                <div
                  key={claimKey}
                  onClick={() => toggleClaim(claimKey)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-purple-50/70 border-purple-300 ring-1 ring-purple-300'
                      : 'bg-slate-50 border-slate-200 opacity-70'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}}
                      className="w-4 h-4 text-purple-600 rounded focus:ring-purple-400"
                    />
                    <div>
                      <span className="font-bold text-slate-900 text-xs capitalize">
                        {claimKey.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="block text-[10px] text-slate-500">
                        {isSelected ? 'WILL BE DISCLOSED TO VERIFIER' : 'HIDDEN IN ZERO-KNOWLEDGE PROOF'}
                      </span>
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center space-x-1 ${
                    isSelected ? 'bg-purple-600 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {isSelected ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    <span>{isSelected ? 'REVEALED' : 'HIDDEN'}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerateProof}
            disabled={loading}
            className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-purple-200 flex items-center justify-center space-x-2 transition-all"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>{loading ? 'Computing Groth16 ZK Circuit & Hash Key...' : 'Generate Selective Disclosure Hash & ZK Proof'}</span>
          </button>
        </div>
      )}

      {/* STEP 3: Generated Selective Disclosure Hash & ZK Proof */}
      {zkProof && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">

          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">Selective Disclosure Proof Generated!</h2>
            <p className="text-xs text-slate-500">
              New selective disclosure hash key generated for verifier session <code>{zkProof.proofRequestId.substring(0, 10)}...</code>
            </p>
          </div>

          {/* QR Code Presentation */}
          <div className="text-center p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <QRCodeSVG value={`http://localhost:5173/verifier?sessionId=${zkProof.proofRequestId}`} size={160} className="mx-auto" />
            <p className="text-[10px] text-slate-400 font-mono">Present QR code or Session ID to Verifier</p>
          </div>

          {/* Cryptographic Hash Keys & Parameters */}
          <div className="space-y-3 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 block">Selective Disclosure Claim Evaluation</span>
              <p className="text-purple-950 font-bold text-sm">{zkProof.requestedClaim} &rarr; <span className="text-emerald-600">{zkProof.claimedResult}</span></p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Public Inputs Hash</span>
              <p className="text-slate-800 break-all text-[11px]">{zkProof.publicInputsHash}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Verifier One-Time Nonce</span>
              <p className="text-purple-700 break-all text-[11px]">{zkProof.verifierNonce}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Groth16 pi_A Proof Signature</span>
              <p className="text-slate-600 text-[10px] break-all">{zkProof.piA}</p>
            </div>
          </div>

          {/* Action button to present to verifier */}
          <button
            onClick={() => navigate(`/verifier?sessionId=${zkProof.proofRequestId}`)}
            className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md flex items-center justify-center space-x-2 transition-all"
          >
            <span>Present Proof to Verifier Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
};
