import React from 'react';
import { ShieldCheck, Lock, CheckCircle, Cpu } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs py-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 text-white font-bold text-lg mb-3">
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
              <span>TrustVerse</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              A privacy-preserving cryptographic trust rail where authorized organizations issue verifiable credentials, enabling holders to prove claims without raw document disclosure.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Core Security Guarantees</h4>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>NO Raw Document On Blockchain</span>
              </li>
              <li className="flex items-center space-x-2">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>NO Unsalted Credential Hash</span>
              </li>
              <li className="flex items-center space-x-2">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>NO Reusable Verification Proof</span>
              </li>
              <li className="flex items-center space-x-2">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Holder DID & Verifier Nonce Scoped</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Technology Stack</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>Java 21 & Spring Boot 3.x Backend</li>
              <li>Spring Data MongoDB & Spring Security</li>
              <li>Web3j & Polygon Amoy Testnet</li>
              <li>Python FastAPI AI Forensic Service</li>
              <li>Groth16 ZK Proof Engine & Merkle Hashing</li>
              <li>React.js & Vite & Tailwind CSS</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Supported Domains</h4>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2 py-1 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 text-[11px]">Education (Full Demo)</span>
              <span className="px-2 py-1 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 text-[11px]">Employment (Full Demo)</span>
              <span className="px-2 py-1 rounded bg-slate-800 text-slate-300 text-[11px]">Healthcare (Schema Ready)</span>
              <span className="px-2 py-1 rounded bg-slate-800 text-slate-300 text-[11px]">Government / Legal (Schema Ready)</span>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-slate-500">
          <div>&copy; 2026 TrustVerse Academic Master Prototype. All Rights Reserved.</div>
          <div className="flex items-center space-x-4 mt-2 sm:mt-0">
            <span>Polygon Amoy Chain ID: 80002</span>
            <span>Web3j Version 4.10.3</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
