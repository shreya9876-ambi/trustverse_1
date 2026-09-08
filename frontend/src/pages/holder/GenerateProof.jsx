import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import {
  ShieldCheck,
  KeyRound,
  CheckCircle2,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  Clock,
  Layers
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { SimpleHashGeneratorModal } from '../../components/SimpleHashGeneratorModal';

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

  // Modal State
  const [isGeneratorModalOpen, setIsGeneratorModalOpen] = useState(false);

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
        <div className="w-12 h-12 rounded-2xl bg-purple-950/80 border border-purple-500/30 text-purple-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(168,85,247,0.25)]">
          <KeyRound className="w-6 h-6 stroke-[2.5]" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
          Selective Disclosure Proof Generator
        </h1>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Choose which details to disclose or create a human-friendly timed verification key.
        </p>

        {/* Timed Key Generator Button */}
        <div className="pt-3 flex justify-center">
          <button
            onClick={() => setIsGeneratorModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 font-bold text-xs shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all flex items-center space-x-2"
          >
            <Layers className="w-4 h-4 text-slate-950" />
            <span>Select Multiple Documents & Generate Key</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-500/30 text-xs text-rose-300">
          {error}
        </div>
      )}

      {/* STEP 1: Verifier Nonce Request */}
      {!proofRequest && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-indigo-500/20 shadow-2xl space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              Verifier Requested Condition / Claim Statement
            </label>
            <input
              type="text"
              value={requestedClaim}
              onChange={(e) => setRequestedClaim(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 font-mono font-semibold text-xs text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none transition-all"
            />
            <p className="text-[11px] text-slate-400 font-mono">
              Example: <code>cgpa &ge; 7.5</code> or <code>experienceYears &ge; 2</code>
            </p>
          </div>

          <button
            onClick={handleInitiateNonce}
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-[0_0_20px_rgba(168,85,247,0.3)] flex items-center justify-center space-x-2 transition-all"
          >
            <KeyRound className="w-4 h-4" />
            <span>{loading ? 'Obtaining Verifier Nonce...' : 'Obtain Verifier One-Time Nonce'}</span>
          </button>
        </div>
      )}

      {/* STEP 2: Interactive Selective Claim Discloser */}
      {proofRequest && !zkProof && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-indigo-500/20 shadow-2xl space-y-6">

          {/* Verifier Nonce Badge */}
          <div className="p-3.5 rounded-2xl bg-purple-950/60 border border-purple-500/30 text-xs space-y-1 font-mono">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Verifier One-Time Nonce:</span>
              <span className="px-2 py-0.5 rounded bg-purple-900 text-purple-300 text-[10px] font-bold border border-purple-500/30">REPLAY PROTECTED</span>
            </div>
            <p className="text-purple-300 font-bold break-all text-xs">{proofRequest.nonce}</p>
          </div>

          {/* Selective Claim Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Selective Disclosure — Choose What to Show
              </label>
              <span className="text-[11px] text-purple-400 font-semibold flex items-center space-x-1 font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Holder Privacy Control</span>
              </span>
            </div>

            <div className="space-y-2">
              {Object.entries(claimSelections).map(([claimKey, isSelected]) => (
                <div
                  key={claimKey}
                  onClick={() => toggleClaim(claimKey)}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-purple-950/40 border-purple-500/40 ring-1 ring-purple-500/40'
                      : 'bg-slate-950/60 border-slate-800 opacity-60'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}}
                      className="w-4 h-4 text-purple-500 rounded focus:ring-purple-400 bg-slate-900 border-slate-700"
                    />
                    <div>
                      <span className="font-bold text-white text-xs capitalize">
                        {claimKey.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="block text-[10px] text-slate-400 font-mono">
                        {isSelected ? 'WILL BE DISCLOSED TO VERIFIER' : 'HIDDEN IN ZERO-KNOWLEDGE PROOF'}
                      </span>
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold font-mono flex items-center space-x-1 ${
                    isSelected ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400'
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
            className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold text-xs shadow-[0_0_20px_rgba(168,85,247,0.3)] flex items-center justify-center space-x-2 transition-all"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>{loading ? 'Computing Groth16 ZK Circuit & Hash Key...' : 'Generate Selective Disclosure Hash & ZK Proof'}</span>
          </button>
        </div>
      )}

      {/* STEP 3: Generated Selective Disclosure Hash & ZK Proof */}
      {zkProof && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-2xl space-y-6">

          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-display font-bold text-white">Selective Disclosure Proof Generated!</h2>
            <p className="text-xs text-slate-400 font-mono">
              Proof session: <code>{zkProof.proofRequestId.substring(0, 10)}...</code>
            </p>
          </div>

          {/* QR Code Presentation */}
          <div className="text-center p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
            <QRCodeSVG value={`${window.location.origin}/verifier?sessionId=${zkProof.proofRequestId}`} size={150} className="mx-auto p-2 bg-white rounded-xl" />
            <p className="text-[10px] text-slate-400 font-mono">Scan QR code or present Session ID to Verifier</p>
          </div>

          {/* Action button to present to verifier */}
          <button
            onClick={() => navigate(`/verifier?sessionId=${zkProof.proofRequestId}`)}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 text-slate-950 font-bold text-xs shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center space-x-2 transition-all"
          >
            <span>Present Proof to Verifier Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Selective Disclosure & Multi-Doc Key Generator Modal */}
      <SimpleHashGeneratorModal
        isOpen={isGeneratorModalOpen}
        onClose={() => setIsGeneratorModalOpen(false)}
        initialSelectedCredentialId={credentialIdParam}
      />

    </div>
  );
};
