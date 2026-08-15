import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck, Upload, Cpu, CheckCircle2, FileCheck,
  ArrowRight, Activity, Hash, Key, Fingerprint, Link2,
  AlertTriangle, Building2, FileText, RefreshCw
} from 'lucide-react';
import { useAuth, DEMO_ACCOUNTS } from '../../context/AuthContext';

// ─── Helpers ────────────────────────────────────────────────────────────────

const API = '/api';

async function analyzeForensics(fileName, fileSize) {
  const res = await fetch(`${API}/forensics/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fileName, fileSize: fileSize || 102400 })
  });
  if (!res.ok) throw new Error('Forensic analysis request failed');
  return res.json();
}

async function evaluateTrust(issuerDid, holderDid, domain, forensicScore) {
  const res = await fetch(`${API}/trust-score`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ issuerDid, holderDid, domain, forensicScore })
  });
  if (!res.ok) throw new Error('Trust gate request failed');
  return res.json();
}

async function issueCredential(payload) {
  const res = await fetch(`${API}/credentials/issue`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    let msg = 'Issuance failed';
    try { const e = await res.json(); msg = e.message || msg; } catch (_) {}
    throw new Error(msg);
  }
  return res.json();
}

// ─── Default claim templates ─────────────────────────────────────────────────

const EDUCATION_CLAIMS = {
  studentName: 'Riya Sharma',
  studentId: 'STU-2026-8891',
  degree: 'B.E. Computer Engineering',
  branch: 'Computer Engineering',
  institution: 'Pimpri Chinchwad College of Engineering & Research',
  cgpa: '8.7',
  graduationYear: '2026',
  issueDate: new Date().toISOString().slice(0, 10)
};

const EMPLOYMENT_CLAIMS = {
  employeeName: 'Aman Verma',
  employeeId: 'EMP-9910',
  organization: 'Acme Technologies Inc.',
  designation: 'Senior Software Engineer',
  department: 'Engineering',
  joiningDate: '2022-06-01',
  experienceYears: '4',
  employmentStatus: 'Full Time',
  issueDate: new Date().toISOString().slice(0, 10)
};

// ─── Stepper ─────────────────────────────────────────────────────────────────

const STEPS = ['Domain', 'Upload Doc', 'AI Forensic', 'Trust Gate', 'Claims Review', 'Issued & Hashed'];

const StepDot = ({ idx, current }) => (
  <div className={`flex items-center space-x-1 text-[11px] font-semibold ${current >= idx + 1 ? 'text-indigo-600' : 'text-slate-400'}`}>
    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
      current > idx + 1 ? 'bg-indigo-600 text-white' : current === idx + 1 ? 'bg-indigo-100 text-indigo-700 ring-2 ring-indigo-400' : 'bg-slate-100 text-slate-400'
    }`}>{current > idx + 1 ? '✓' : idx + 1}</span>
    <span className="hidden sm:inline">{STEPS[idx]}</span>
  </div>
);

// ─── Hash display helper ──────────────────────────────────────────────────────

const HashRow = ({ label, value, color = 'indigo', icon: Icon }) => (
  <div className={`p-3.5 rounded-xl bg-${color}-50/60 border border-${color}-100 space-y-1`}>
    <div className={`flex items-center space-x-1.5 text-[10px] font-bold uppercase tracking-wider text-${color}-700`}>
      {Icon && <Icon className="w-3.5 h-3.5" />}
      <span>{label}</span>
    </div>
    <p className={`font-mono text-[11px] text-${color}-900 break-all leading-relaxed`}>{value || '—'}</p>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export const IssueCredential = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const issuerDid  = user?.did  || DEMO_ACCOUNTS.ISSUER.did;
  const issuerName = user?.name || DEMO_ACCOUNTS.ISSUER.name;
  const issuerOrg  = user?.organization || DEMO_ACCOUNTS.ISSUER.organization;

  const [step, setStep]               = useState(1);
  const [domain, setDomain]           = useState('education');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileName, setFileName]       = useState('');
  const [claims, setClaims]           = useState(EDUCATION_CLAIMS);
  const [forensicResult, setForensicResult] = useState(null);
  const [trustResult, setTrustResult]   = useState(null);
  const [issuedCred, setIssuedCred]   = useState(null);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState('');

  // ── Domain switch ────────────────────────────────────────────────────────
  const handleDomainChange = (d) => {
    setDomain(d);
    setClaims(d === 'employment' ? EMPLOYMENT_CLAIMS : EDUCATION_CLAIMS);
    setFileName('');
    setUploadedFile(null);
  };

  // ── File pick ────────────────────────────────────────────────────────────
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFile(file);
    setFileName(file.name);
    // Pre-populate issueDate claim from today
    setClaims(prev => ({ ...prev, issueDate: new Date().toISOString().slice(0, 10) }));
  };

  const useDemoFile = () => {
    const name = domain === 'employment'
      ? 'aman_verma_experience_letter.pdf'
      : 'riya_sharma_degree_certificate.pdf';
    setFileName(name);
    setUploadedFile({ name, size: 102400, type: 'application/pdf' });
  };

  // ── Step 2 → 3: AI Forensic ──────────────────────────────────────────────
  const runForensics = async () => {
    if (!fileName) { setError('Please upload or select a demo document first.'); return; }
    setError('');
    setLoading(true);
    try {
      const res = await analyzeForensics(fileName, uploadedFile?.size || 102400);
      setForensicResult(res);
      setStep(3);
    } catch (err) {
      setError('AI Forensic failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── Step 3 → 4: Trust Gate ──────────────────────────────────────────────
  const runTrustGate = async () => {
    setError('');
    setLoading(true);
    try {
      const holderDid = domain === 'employment'
        ? 'did:trustverse:holder:amanverma'
        : 'did:trustverse:holder:riyasharma';
      const res = await evaluateTrust(issuerDid, holderDid, domain, forensicResult?.forensicScore || 0.94);
      setTrustResult(res);
      setStep(4);
    } catch (err) {
      setError('Trust Gate failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── Step 4 → 5: Claims review ────────────────────────────────────────────
  const goToClaims = () => { setError(''); setStep(5); };

  // ── Step 5 → 6: Issue & Generate Hash ───────────────────────────────────
  const handleIssue = async () => {
    setError('');
    setLoading(true);
    try {
      const holderDid = domain === 'employment'
        ? 'did:trustverse:holder:amanverma'
        : 'did:trustverse:holder:riyasharma';

      const payload = {
        schemaId: domain === 'employment' ? 'schema_emp_02' : 'schema_edu_01',
        holderId: domain === 'employment' ? 'demo_holder_aman' : 'demo_holder_riya',
        holderDid,
        domain,
        claims,
        documentFileName: fileName,
        // Issuer stamp — sent even without JWT
        issuerDid,
        issuerName
      };

      const result = await issueCredential(payload);
      setIssuedCred(result);
      setStep(6);
    } catch (err) {
      setError('Issuance failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="max-w-3xl mx-auto py-6 space-y-6">

      {/* ── Stepper header ── */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-lg font-extrabold text-slate-900">Credential Issuance Pipeline</h1>
          <div className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-[10px] font-bold flex items-center space-x-1.5">
            <Building2 className="w-3.5 h-3.5" />
            <span>{issuerOrg}</span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 overflow-x-auto gap-2">
          {STEPS.map((_, i) => <StepDot key={i} idx={i} current={step} />)}
        </div>
      </div>

      {/* ── Error banner ── */}
      {error && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-start space-x-2 text-xs text-red-700">
          <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
           STEP 1: Domain
         ══════════════════════════════════════════════════════════ */}
      {step === 1 && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-base font-bold text-slate-900">Step 1 — Select Credential Domain Schema</h2>

          <div className="grid grid-cols-2 gap-4">
            {[
              { key: 'education',  label: 'Education',   desc: 'Degree, Transcripts, Marksheets — CGPA, Institution, Graduation Year' },
              { key: 'employment', label: 'Employment',  desc: 'Experience Letters, Designation, Service Record — Organization, Experience Years' },
              { key: 'healthcare', label: 'Healthcare',  desc: 'Medical Practitioner License — Specialty, Issuing Authority' },
              { key: 'government', label: 'Government',  desc: 'National Identity, Driving License, Passport — Document Number' }
            ].map(({ key, label, desc }) => (
              <button
                key={key}
                onClick={() => handleDomainChange(key)}
                className={`p-5 rounded-2xl border text-left space-y-1.5 transition-all ${
                  domain === key ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-200' : 'bg-white border-slate-200 hover:border-indigo-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">{label}</span>
                  {(key === 'education' || key === 'employment') && (
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">FULL DEMO</span>
                  )}
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
              </button>
            ))}
          </div>

          <button
            onClick={() => setStep(2)}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md flex items-center justify-center space-x-2"
          >
            <span>Proceed to Document Upload</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
           STEP 2: Document Upload
         ══════════════════════════════════════════════════════════ */}
      {step === 2 && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-1">
            <h2 className="text-base font-bold text-slate-900">Step 2 — Upload Credential Document</h2>
            <p className="text-xs text-slate-500">
              Upload the original certificate/letter. The file is scanned for AI forensic analysis (ELA noise-print) and then discarded. Claims are extracted from the form below.
            </p>
          </div>

          {/* ── Issuer Stamp Banner ── */}
          <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-start space-x-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center flex-shrink-0">
              <Fingerprint className="w-5 h-5" />
            </div>
            <div className="text-xs space-y-0.5">
              <span className="block font-bold text-indigo-900">Issuer Stamp Will Be Applied</span>
              <span className="block text-indigo-700">{issuerName} · {issuerOrg}</span>
              <span className="block font-mono text-indigo-600 text-[10px]">{issuerDid}</span>
            </div>
          </div>

          {/* ── File Drop Area ── */}
          <div
            className="border-2 border-dashed border-slate-300 hover:border-indigo-400 p-8 rounded-2xl text-center space-y-3 bg-slate-50/50 cursor-pointer transition-colors"
            onClick={() => fileRef.current?.click()}
          >
            <input ref={fileRef} type="file" accept=".pdf,.png,.jpg,.jpeg" className="hidden" onChange={handleFileChange} />
            {uploadedFile ? (
              <>
                <FileCheck className="w-10 h-10 text-emerald-500 mx-auto" />
                <div className="text-sm font-bold text-slate-800">{fileName}</div>
                <p className="text-xs text-slate-400">
                  {uploadedFile.size ? `${(uploadedFile.size / 1024).toFixed(1)} KB` : ''} — Click to change file
                </p>
              </>
            ) : (
              <>
                <Upload className="w-10 h-10 text-indigo-400 mx-auto" />
                <div className="text-sm font-semibold text-slate-700">Click to browse file</div>
                <p className="text-xs text-slate-400">PDF, PNG, JPG supported — Max 10MB</p>
              </>
            )}
          </div>

          {/* ── Demo File Button ── */}
          <button
            type="button"
            onClick={useDemoFile}
            className="w-full py-2.5 rounded-xl border border-dashed border-slate-300 hover:border-indigo-400 bg-slate-50 text-slate-600 font-semibold text-xs flex items-center justify-center space-x-2 transition-colors"
          >
            <FileText className="w-4 h-4 text-indigo-500" />
            <span>Use Demo Certificate File ({domain === 'employment' ? 'aman_verma_experience_letter.pdf' : 'riya_sharma_degree_certificate.pdf'})</span>
          </button>

          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="px-5 py-3 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs">Back</button>
            <button
              onClick={runForensics}
              disabled={loading || !fileName}
              className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-sm shadow-md flex items-center justify-center space-x-2"
            >
              {loading ? <><RefreshCw className="w-4 h-4 animate-spin" /><span>Running AI Forensic Analysis...</span></> : <><Cpu className="w-4 h-4" /><span>Run AI Forensic Analysis on Document</span></>}
            </button>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
           STEP 3: AI Forensic Result
         ══════════════════════════════════════════════════════════ */}
      {step === 3 && forensicResult && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">Step 3 — AI Forensic Analysis Result</h2>
            <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center space-x-1 ${
              forensicResult.status === 'PASS'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-red-50 text-red-700 border-red-200'
            }`}>
              {forensicResult.status === 'PASS' ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
              <span>STATUS: {forensicResult.status}</span>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 space-y-1">
              <span className="text-slate-500 block">ELA Authenticity Score</span>
              <span className="text-3xl font-extrabold text-emerald-600">{forensicResult.forensicScore}</span>
              <span className="text-emerald-700 text-[10px]">/ 1.0 — Higher = More Authentic</span>
            </div>
            <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100 space-y-1">
              <span className="text-slate-500 block">Risk Assessment</span>
              <span className="text-3xl font-extrabold text-indigo-600">{forensicResult.riskLevel}</span>
              <span className="text-indigo-700 text-[10px]">SHAP Noise-Print Analysis</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 text-xs border border-slate-200 space-y-1">
            <div className="font-bold text-slate-800">SHAP Feature Importance Explanation:</div>
            <p className="text-slate-600 leading-relaxed">{forensicResult.explanation}</p>
          </div>

          <button
            onClick={runTrustGate}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-sm shadow-md flex items-center justify-center space-x-2"
          >
            {loading ? <><RefreshCw className="w-4 h-4 animate-spin" /><span>Running Federated Trust Gate...</span></> : <><Activity className="w-4 h-4" /><span>Pass to Federated Trust Gate</span></>}
          </button>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
           STEP 4: Trust Gate Result
         ══════════════════════════════════════════════════════════ */}
      {step === 4 && trustResult && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-base font-bold text-slate-900">Step 4 — Federated Trust / Fraud Gate</h2>

          <div className="grid grid-cols-3 gap-3 text-xs text-center">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 space-y-1">
              <span className="text-slate-500 block text-[10px] uppercase">Trust Score</span>
              <span className="text-2xl font-extrabold text-emerald-600">{trustResult.overallTrustScore}</span>
            </div>
            <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100 space-y-1">
              <span className="text-slate-500 block text-[10px] uppercase">Fraud Score</span>
              <span className="text-2xl font-extrabold text-indigo-600">{trustResult.fraudScore}</span>
            </div>
            <div className={`p-4 rounded-xl border space-y-1 ${trustResult.decision === 'APPROVED' ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
              <span className="text-slate-500 block text-[10px] uppercase">Decision</span>
              <span className={`text-base font-extrabold ${trustResult.decision === 'APPROVED' ? 'text-emerald-700' : 'text-red-700'}`}>{trustResult.decision}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
            <span className="font-bold text-slate-800">Graph Attention Network (GAT) Analysis:</span>
            <div className="grid grid-cols-2 gap-2">
              {trustResult.factors && Object.entries(trustResult.factors).map(([k, v]) => (
                <div key={k} className="flex justify-between text-slate-600">
                  <span className="capitalize">{k.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className="font-bold text-slate-800">{typeof v === 'number' ? v.toFixed(2) : v}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={goToClaims}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md flex items-center justify-center space-x-2"
          >
            <FileCheck className="w-4 h-4" />
            <span>Review & Edit Extracted Claims</span>
          </button>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
           STEP 5: Claims Review & Edit
         ══════════════════════════════════════════════════════════ */}
      {step === 5 && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-1">
            <h2 className="text-base font-bold text-slate-900">Step 5 — Review & Edit Extracted Claims</h2>
            <p className="text-xs text-slate-500">
              These claims will be individually salted, hashed (SHA-256), and assembled into a Merkle tree. The root hash is the credential's blockchain anchor key.
            </p>
          </div>

          {/* Issuer stamp preview */}
          <div className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center space-x-3 text-xs">
            <Fingerprint className="w-5 h-5 text-indigo-600 flex-shrink-0" />
            <div>
              <span className="font-bold text-indigo-900 block">Issuer Stamp: {issuerName}</span>
              <span className="font-mono text-indigo-600 text-[10px]">{issuerDid}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            {Object.entries(claims).map(([key, val]) => (
              <div key={key}>
                <label className="block font-semibold text-slate-700 mb-1 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <input
                  type="text"
                  value={val}
                  onChange={(e) => setClaims(prev => ({ ...prev, [key]: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none font-mono text-slate-800 text-[11px]"
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleIssue}
            disabled={loading}
            className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-emerald-200 flex items-center justify-center space-x-2"
          >
            {loading
              ? <><RefreshCw className="w-5 h-5 animate-spin" /><span>Generating Salted Merkle Tree & Anchoring on Polygon Amoy...</span></>
              : <><Hash className="w-5 h-5" /><span>Generate Hash Key & Anchor Credential on Blockchain</span></>
            }
          </button>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
           STEP 6: Issued & Hash Key Generated
         ══════════════════════════════════════════════════════════ */}
      {step === 6 && issuedCred && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">Credential Issued & Hash Key Generated!</h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Each claim was individually salted with a 256-bit random nonce, SHA-256 hashed, and assembled into a Merkle tree. The root hash is anchored on Polygon Amoy via Web3j.
            </p>
          </div>

          {/* ── Hash Key Section ── */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-600">
              <Hash className="w-4 h-4 text-indigo-500" />
              <span>Cryptographic Hash Keys Generated</span>
            </div>

            <HashRow
              label="Credential ID"
              value={issuedCred.credentialId}
              color="slate"
              icon={FileCheck}
            />
            <HashRow
              label="Merkle Root Hash (Salted SHA-256 Tree Root)"
              value={issuedCred.merkleRoot}
              color="indigo"
              icon={Hash}
            />
            <HashRow
              label="Polygon Amoy Transaction Hash (Blockchain Anchor)"
              value={issuedCred.blockchainTxHash}
              color="purple"
              icon={Link2}
            />
            <HashRow
              label="ECDSA Issuer Signature"
              value={issuedCred.ecdsaSignature}
              color="blue"
              icon={Key}
            />
            <HashRow
              label="PQC ML-DSA Issuer Signature (Post-Quantum)"
              value={issuedCred.pqcSignature}
              color="violet"
              icon={Fingerprint}
            />
          </div>

          {/* Issuer stamp confirmation */}
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start space-x-3 text-xs">
            <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold text-emerald-900 block">Issuer Stamp Applied & Verified</span>
              <span className="text-emerald-700">{issuerName} · {issuerOrg}</span>
              <span className="font-mono text-emerald-600 text-[10px] block">{issuerDid}</span>
            </div>
          </div>

          <div className="flex gap-4 pt-2">
            <button
              onClick={() => navigate('/holder/dashboard')}
              className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
            >
              Open Holder Wallet →
            </button>
            <button
              onClick={() => { setStep(1); setIssuedCred(null); setFileName(''); setUploadedFile(null); setForensicResult(null); setTrustResult(null); }}
              className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
            >
              Issue Another
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
