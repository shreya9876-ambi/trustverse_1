import React, { useState } from 'react';
import { Building2, ShieldCheck, Lock, CheckCircle2, EyeOff, KeyRound, ArrowRight, Zap, Database, Clock } from 'lucide-react';

export const FlowVisual = () => {
  const [activeStep, setActiveStep] = useState(2);

  const steps = [
    {
      id: 1,
      name: 'Issuing Authority',
      sub: 'Verified Document & Digital Seal',
      icon: Building2,
      accentClass: 'border-indigo-500/40 text-indigo-400 bg-indigo-950/40',
      glowClass: 'shadow-[0_0_20px_rgba(99,102,241,0.25)]',
      pill: 'Authority Seal',
      details: [
        'Selects domain: Education, Healthcare, Government, Employment',
        'Validates document authenticity and details',
        'Registers tamper-evident digital seal on ledger'
      ],
      dataDisplay: 'Status: Signed & Registered'
    },
    {
      id: 2,
      name: 'Private Holder Wallet',
      sub: 'Selective Disclosure & Timed Keys',
      icon: Lock,
      accentClass: 'border-cyan-500/50 text-cyan-300 bg-cyan-950/50',
      glowClass: 'shadow-[0_0_25px_rgba(6,182,212,0.3)] ring-1 ring-cyan-400/40',
      pill: 'Privacy Shielded',
      details: [
        'Raw credential files remain private on user device',
        'Select which fields to share or mask (e.g. branch, marks)',
        'Generates time-limited verification key (e.g. 1 hour pass)'
      ],
      dataDisplay: 'Sensitive Data: [PROTECTED] | Key: TV-CS-9810'
    },
    {
      id: 3,
      name: 'Verifier Audit Portal',
      sub: 'Instant Key & Batch Verification',
      icon: CheckCircle2,
      accentClass: 'border-emerald-500/40 text-emerald-400 bg-emerald-950/40',
      glowClass: 'shadow-[0_0_20px_rgba(16,185,129,0.25)]',
      pill: 'Instant Audit',
      details: [
        'Audits single keys or batches of candidate keys',
        'Filters by domain, branch stream, and pointer criteria',
        'Confirms validity in seconds without storing raw records'
      ],
      dataDisplay: 'Result: ✓ VERIFIED AUTHENTIC'
    }
  ];

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border border-indigo-500/20 shadow-2xl relative overflow-hidden my-6">
      {/* Background ambient lighting */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-indigo-900/40">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-2">
            <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Interactive System Flow</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
            How Credentials Move Securely
          </h3>
          <p className="text-slate-400 text-xs mt-1">
            Data flows with privacy protection from institutional issuance to verifier audit.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-slate-900/80 p-2 rounded-xl border border-slate-800 text-xs font-mono text-slate-300">
          <EyeOff className="w-4 h-4 text-cyan-400" />
          <span>Raw Data Exposure: <strong className="text-emerald-400 font-bold">0 Bytes</strong></span>
        </div>
      </div>

      {/* 3 Step Cards */}
      <div className="py-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {steps.map((step) => {
            const Icon = step.icon;
            const isSelected = activeStep === step.id;

            return (
              <div
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 relative group ${
                  step.accentClass
                } ${isSelected ? step.glowClass + ' scale-[1.02]' : 'opacity-85 hover:opacity-100 hover:scale-[1.01]'}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-900/80 text-cyan-400 border border-cyan-500/30'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border border-current">
                    {step.pill}
                  </span>
                </div>

                <div className="space-y-1 mb-3">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">
                    Step 0{step.id}
                  </span>
                  <h4 className="text-base font-display font-bold text-white">
                    {step.name}
                  </h4>
                  <p className="text-[11px] text-slate-300 font-mono">
                    {step.sub}
                  </p>
                </div>

                <ul className="space-y-2 text-xs text-slate-300 mb-4 pt-2 border-t border-slate-800/80">
                  {step.details.map((d, i) => (
                    <li key={i} className="flex items-start space-x-1.5 leading-snug">
                      <span className="text-cyan-400 text-xs font-bold mt-0.5">›</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>

                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-[11px] text-cyan-300 truncate">
                  {step.dataDisplay}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
