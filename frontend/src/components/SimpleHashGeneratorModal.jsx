import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock,
  KeyRound,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  X,
  Sparkles,
  Lock,
  Eye,
  EyeOff,
  FileCheck,
  CheckSquare,
  Square,
  ChevronDown,
  ChevronUp,
  Layers
} from 'lucide-react';
import { timedKeysService } from '../services/timedKeys';

export const SimpleHashGeneratorModal = ({
  isOpen,
  onClose,
  credentials = [],
  initialSelectedCredentialId = null
}) => {
  const navigate = useNavigate();

  // All available credentials (fallbacks if empty)
  const defaultCredentials = [
    {
      id: 'cred_edu_01',
      credentialId: 'cred_edu_2026_001',
      domain: 'education',
      title: 'B.E. Computer Engineering Degree',
      issuerName: 'PCCOER University',
      issuerDid: 'did:trustverse:org:pccoer',
      merkleRoot: '0x4f82a991bc8732e19aa7235541098bfe19283746a1005b6c8910471f49e02319',
      claims: {
        degree: 'B.E. Computer Engineering',
        cgpa: '8.7',
        branch: 'Computer Engineering',
        institution: 'PCCOER',
        graduationYear: '2026',
        studentName: 'Riya Sharma',
        studentId: 'STU-2026-8891'
      }
    },
    {
      id: 'cred_emp_02',
      credentialId: 'cred_emp_2026_002',
      domain: 'employment',
      title: 'Senior Software Engineer Experience Letter',
      issuerName: 'Acme Technologies Inc.',
      issuerDid: 'did:trustverse:org:acme',
      merkleRoot: '0x9d8172bc91029348102938471029384710293847102938471029384710293847',
      claims: {
        designation: 'Senior Software Engineer',
        employmentStatus: 'Full Time',
        organization: 'Acme Technologies Inc.',
        experienceYears: '4',
        employeeName: 'Riya Sharma',
        employeeId: 'EMP-9910'
      }
    }
  ];

  const availableCreds = credentials && credentials.length > 0 ? credentials : defaultCredentials;

  // Selected document IDs map: { [credId]: true/false }
  const [selectedDocs, setSelectedDocs] = useState({});

  // Selected attributes per document: { [credId]: { [attributeKey]: true/false } }
  const [selectedAttributes, setSelectedAttributes] = useState({});

  // Expanded card for attribute customization: credId
  const [expandedDocId, setExpandedDocId] = useState(null);

  // Expiration Duration
  const [selectedDuration, setSelectedDuration] = useState(15); // 15 mins default

  // Generated Key Result
  const [generatedKey, setGeneratedKey] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [timeLeftStr, setTimeLeftStr] = useState('');

  // Initialize selections when modal opens
  useEffect(() => {
    if (isOpen) {
      setGeneratedKey(null);

      const initDocs = {};
      const initAttrs = {};

      availableCreds.forEach((c, idx) => {
        const id = c.credentialId || c.id;
        // If initialSelectedCredentialId matches, select only that one by default; else select first
        const isSelected = initialSelectedCredentialId
          ? id === initialSelectedCredentialId
          : idx === 0;

        initDocs[id] = isSelected;
        initAttrs[id] = {};

        // Default selective fields: select essential fields, keep sensitive personal names/IDs masked by default
        Object.keys(c.claims || {}).forEach((key) => {
          const isSensitive = ['studentName', 'employeeName', 'studentId', 'employeeId', 'ssn', 'aadhaar'].includes(key);
          initAttrs[id][key] = !isSensitive;
        });
      });

      setSelectedDocs(initDocs);
      setSelectedAttributes(initAttrs);
      setExpandedDocId(initialSelectedCredentialId || availableCreds[0]?.credentialId || availableCreds[0]?.id);
    }
  }, [isOpen, initialSelectedCredentialId]);

  // Live Countdown Clock Interval
  useEffect(() => {
    if (!generatedKey) return;

    const updateTimer = () => {
      const remainingMs = Math.max(0, generatedKey.expiresAt - Date.now());
      const seconds = Math.floor(remainingMs / 1000);
      setTimeLeftStr(timedKeysService.formatDuration(seconds));
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [generatedKey]);

  if (!isOpen) return null;

  // Toggle Document Selection
  const toggleDocSelection = (docId) => {
    setSelectedDocs(prev => {
      const updated = { ...prev, [docId]: !prev[docId] };
      if (updated[docId]) {
        setExpandedDocId(docId);
      }
      return updated;
    });
  };

  // Toggle Single Attribute Inside Document
  const toggleAttribute = (docId, attrKey) => {
    setSelectedAttributes(prev => ({
      ...prev,
      [docId]: {
        ...(prev[docId] || {}),
        [attrKey]: !prev[docId]?.[attrKey]
      }
    }));
  };

  // Select/Deselect all attributes for a document
  const setAllAttributes = (docId, value) => {
    const targetDoc = availableCreds.find(c => (c.credentialId || c.id) === docId);
    if (!targetDoc) return;
    const newDocAttrs = {};
    Object.keys(targetDoc.claims || {}).forEach(k => {
      newDocAttrs[k] = value;
    });
    setSelectedAttributes(prev => ({
      ...prev,
      [docId]: newDocAttrs
    }));
  };

  // Generate Key Handler
  const handleGenerateKey = () => {
    // Build bundle documents array
    const bundleDocs = [];

    availableCreds.forEach(c => {
      const docId = c.credentialId || c.id;
      if (selectedDocs[docId]) {
        const docAttrs = selectedAttributes[docId] || {};
        const selectedClaims = {};
        const hiddenClaims = [];

        Object.entries(c.claims || {}).forEach(([k, v]) => {
          if (docAttrs[k]) {
            selectedClaims[k] = v;
          } else {
            hiddenClaims.push(k);
          }
        });

        bundleDocs.push({
          credentialId: docId,
          title: c.title || c.claims?.degree || c.claims?.designation || 'Verifiable Document',
          domain: c.domain || 'general',
          issuerName: c.issuerName || c.claims?.institution || 'TrustVerse Institution',
          issuerDid: c.issuerDid || 'did:trustverse:org:auth',
          merkleRoot: c.merkleRoot || '0x4f82a991bc8732e19aa7235541098bfe19283746a1005b6c8910471f49e02319',
          selectedClaims,
          hiddenClaims
        });
      }
    });

    if (bundleDocs.length === 0) {
      alert('Please select at least one document to share.');
      return;
    }

    const keyObj = timedKeysService.generateTimedKey({
      documents: bundleDocs,
      durationMinutes: selectedDuration,
      holderDid: 'did:trustverse:holder:riyasharma'
    });

    setGeneratedKey(keyObj);
  };

  const verifierUrl = `${window.location.origin}/verifier?key=${generatedKey?.shortCode || ''}`;

  const copyCodeToClipboard = () => {
    if (generatedKey?.shortCode) {
      navigator.clipboard.writeText(generatedKey.shortCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(verifierUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleTestInVerifier = () => {
    onClose();
    navigate(`/verifier?key=${generatedKey.shortCode}`);
  };

  const selectedCount = Object.values(selectedDocs).filter(Boolean).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="glass-card w-full max-w-2xl rounded-3xl p-5 sm:p-7 border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.2)] space-y-6 relative overflow-hidden text-slate-100 my-8 max-h-[90vh] flex flex-col justify-between">
        
        {/* Glow Header Accent */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Modal Top Row */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-display font-bold text-white tracking-tight">
                Selective Disclosure Key Generator
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Select documents & specific details to share with verifiable timed access
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="space-y-6 overflow-y-auto pr-1 flex-1">
          
          {/* STEP 1: Select Documents & Details */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center space-x-1.5">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>1. Select Documents & Disclose Details ({selectedCount} Selected)</span>
              </label>
              <span className="text-[11px] font-mono text-slate-400">
                Unselected details remain 100% masked
              </span>
            </div>

            <div className="space-y-3">
              {availableCreds.map((c) => {
                const docId = c.credentialId || c.id;
                const isSelected = !!selectedDocs[docId];
                const isExpanded = expandedDocId === docId;
                const docAttrs = selectedAttributes[docId] || {};
                const activeAttrCount = Object.values(docAttrs).filter(Boolean).length;
                const totalAttrCount = Object.keys(c.claims || {}).length;

                return (
                  <div
                    key={docId}
                    className={`rounded-2xl border transition-all ${
                      isSelected
                        ? 'bg-slate-900/90 border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                        : 'bg-slate-950/60 border-slate-800/80 opacity-75'
                    }`}
                  >
                    {/* Document Header Bar */}
                    <div className="p-4 flex items-center justify-between gap-3">
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <button
                          type="button"
                          onClick={() => toggleDocSelection(docId)}
                          className="text-cyan-400 hover:text-cyan-300 transition-colors flex-shrink-0"
                        >
                          {isSelected ? (
                            <CheckSquare className="w-5 h-5 text-cyan-400" />
                          ) : (
                            <Square className="w-5 h-5 text-slate-600" />
                          )}
                        </button>
                        <div
                          className="cursor-pointer flex-1 min-w-0"
                          onClick={() => {
                            if (!isSelected) toggleDocSelection(docId);
                            setExpandedDocId(isExpanded ? null : docId);
                          }}
                        >
                          <div className="flex items-center space-x-2">
                            <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                              {c.title || c.claims?.degree || c.claims?.designation || 'Document'}
                            </h4>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                              {c.domain || 'general'}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 font-mono truncate">
                            Issuer: <span className="text-cyan-300">{c.issuerName || 'TrustVerse Authority'}</span>
                            {isSelected && ` • ${activeAttrCount}/${totalAttrCount} details shared`}
                          </p>
                        </div>
                      </div>

                      {/* Expand / Collapse Details Button */}
                      {isSelected && (
                        <button
                          type="button"
                          onClick={() => setExpandedDocId(isExpanded ? null : docId)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-mono flex items-center space-x-1 flex-shrink-0"
                        >
                          <span>{isExpanded ? 'Hide Details' : 'Configure Details'}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      )}
                    </div>

                    {/* Expandable Granular Attributes Selection */}
                    {isSelected && isExpanded && (
                      <div className="px-4 pb-4 pt-1 border-t border-slate-800/80 space-y-3 bg-slate-950/50 rounded-b-2xl">
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="text-slate-300 font-semibold flex items-center space-x-1">
                            <Lock className="w-3 h-3 text-cyan-400" />
                            <span>Select Document Details To Disclose:</span>
                          </span>
                          <div className="flex items-center space-x-2">
                            <button
                              type="button"
                              onClick={() => setAllAttributes(docId, true)}
                              className="text-cyan-400 hover:underline text-[10px]"
                            >
                              Share All
                            </button>
                            <span className="text-slate-600">|</span>
                            <button
                              type="button"
                              onClick={() => setAllAttributes(docId, false)}
                              className="text-slate-400 hover:underline text-[10px]"
                            >
                              Mask All
                            </button>
                          </div>
                        </div>

                        {/* Attribute Chips */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {Object.entries(c.claims || {}).map(([key, val]) => {
                            const isShared = !!docAttrs[key];
                            return (
                              <button
                                key={key}
                                type="button"
                                onClick={() => toggleAttribute(docId, key)}
                                className={`p-2 rounded-xl text-left border transition-all flex items-center justify-between ${
                                  isShared
                                    ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-200'
                                    : 'bg-slate-900/60 border-slate-800/80 text-slate-500 opacity-60'
                                }`}
                              >
                                <div className="min-w-0 pr-2">
                                  <span className="text-[10px] font-mono capitalize block opacity-75">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                  </span>
                                  <strong className="text-xs font-mono text-white truncate block">
                                    {isShared ? String(val) : '•••••••• (Masked)'}
                                  </strong>
                                </div>
                                <div className="flex-shrink-0">
                                  {isShared ? (
                                    <Eye className="w-4 h-4 text-cyan-400" />
                                  ) : (
                                    <EyeOff className="w-4 h-4 text-slate-600" />
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 2: Expiration Duration Timeline */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>2. Select Key Expiration Timeline:</span>
            </label>
            <div className="grid grid-cols-4 gap-2 text-xs font-mono">
              {[
                { label: '15 Mins', value: 15 },
                { label: '1 Hour', value: 60 },
                { label: '24 Hours', value: 1440 },
                { label: '7 Days', value: 10080 }
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setSelectedDuration(option.value)}
                  className={`py-2 rounded-xl border font-bold transition-all text-center ${
                    selectedDuration === option.value
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Action to Generate */}
          {!generatedKey && (
            <button
              onClick={handleGenerateKey}
              disabled={selectedCount === 0}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 font-bold text-xs shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <KeyRound className="w-4 h-4" />
              <span>Generate Verification Key for Selected {selectedCount} Document{selectedCount !== 1 ? 's' : ''}</span>
            </button>
          )}

          {/* Generated Short Code Display Card */}
          {generatedKey && (
            <div className="glass-card rounded-2xl p-5 border border-cyan-500/40 bg-slate-950/95 text-center space-y-4 shadow-inner relative animate-fade-in">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-2">
                <span className="text-cyan-400 font-bold uppercase tracking-wider flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Selective Verification Key</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 font-bold border border-emerald-500/30 text-[10px]">
                  {generatedKey.durationLabel}
                </span>
              </div>

              {/* Big Short Hash Key Display */}
              <div className="py-2">
                <div className="text-3xl sm:text-4xl font-mono font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 select-all">
                  {generatedKey.shortCode}
                </div>
                <p className="text-[11px] text-slate-400 font-mono mt-1">
                  {generatedKey.title} • {generatedKey.claim}
                </p>
              </div>

              {/* Countdown Clock Display */}
              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400 flex items-center space-x-1.5">
                  <Clock className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <span>Expires In:</span>
                </span>
                <strong className="text-emerald-400 font-bold text-sm">
                  {timeLeftStr || 'Calculating...'}
                </strong>
              </div>

              {/* Quick Copy & Share Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={copyCodeToClipboard}
                  className="py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 font-bold text-xs border border-cyan-500/30 transition-all flex items-center justify-center space-x-2"
                >
                  {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedCode ? 'Key Copied!' : 'Copy Verification Key'}</span>
                </button>

                <button
                  type="button"
                  onClick={copyLinkToClipboard}
                  className="py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-indigo-300 font-bold text-xs border border-indigo-500/30 transition-all flex items-center justify-center space-x-2"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <ExternalLink className="w-4 h-4" />}
                  <span>{copiedLink ? 'Link Copied!' : 'Copy Direct Verifier URL'}</span>
                </button>
              </div>

              {/* Direct Action in Verifier */}
              <button
                type="button"
                onClick={handleTestInVerifier}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 font-bold text-xs shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all flex items-center justify-center space-x-1.5"
              >
                <span>Open & Audit in Verifier Portal</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
