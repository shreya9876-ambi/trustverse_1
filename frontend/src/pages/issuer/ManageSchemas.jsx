import React, { useState, useEffect } from 'react';
import { Layers, Plus, CheckCircle2 } from 'lucide-react';
import { api } from '../../services/api';

export const ManageSchemas = () => {
  const [schemas, setSchemas] = useState([]);

  useEffect(() => {
    api.getSchemas().then(data => setSchemas(Array.isArray(data) ? data : []));
  }, []);

  return (
    <div className="space-y-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Schema Engine Management</h1>
          <p className="text-xs text-slate-500">Multi-domain dynamic schemas defining fields, validation rules, and ZKP proof eligibility.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {schemas.map((s) => (
          <div key={s.id || s.name} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-base">{s.name}</h3>
                <span className="text-xs text-slate-500 uppercase font-semibold">Domain: {s.domain}</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
                v{s.version || '1.0'}
              </span>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">Defined Schema Fields:</div>
              <div className="divide-y divide-slate-100">
                {s.fields?.map((f) => (
                  <div key={f.name} className="py-2 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-mono font-semibold text-slate-800">{f.name}</span>
                      <span className="ml-2 px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] uppercase">{f.type}</span>
                    </div>
                    {f.selectableForProof && (
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        ZKP Selectable
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
