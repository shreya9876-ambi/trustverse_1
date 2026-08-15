import React, { useState, useEffect } from 'react';
import { ShieldCheck, Users, Building, Activity, AlertTriangle } from 'lucide-react';
import { api } from '../../services/api';

export const AdminDashboard = () => {
  return (
    <div className="space-y-8 py-4">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">TrustVerse System Administration</h1>
          <p className="text-xs text-slate-500">Platform health, institutional approval, and Polygon Amoy node status.</p>
        </div>
        <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
          Super Admin Active
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="text-slate-500 text-xs font-semibold">Registered Institutions</div>
          <div className="text-3xl font-extrabold text-slate-900">48</div>
          <div className="text-[11px] text-emerald-600 font-semibold">All DIDs Verified</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="text-slate-500 text-xs font-semibold">Total Active Credentials</div>
          <div className="text-3xl font-extrabold text-indigo-600">12,480</div>
          <div className="text-[11px] text-indigo-600 font-semibold">Anchored on Polygon Amoy</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="text-slate-500 text-xs font-semibold">Blockchain RPC Status</div>
          <div className="text-3xl font-extrabold text-purple-600">80002</div>
          <div className="text-[11px] text-purple-600 font-semibold">Polygon Amoy Testnet RPC OK</div>
        </div>
      </div>
    </div>
  );
};
