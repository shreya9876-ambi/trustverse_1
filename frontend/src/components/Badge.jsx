import React from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

export const Badge = ({ variant = 'default', children, className = '' }) => {
  const styles = {
    anchored: 'bg-purple-50 text-purple-700 border-purple-200',
    verified: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    revoked: 'bg-rose-50 text-rose-700 border-rose-200',
    zkp: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    default: 'bg-slate-100 text-slate-700 border-slate-200'
  };

  return (
    <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full border text-xs font-semibold ${styles[variant] || styles.default} ${className}`}>
      {variant === 'anchored' && <ShieldCheck className="w-3.5 h-3.5" />}
      {variant === 'verified' && <CheckCircle2 className="w-3.5 h-3.5" />}
      {variant === 'revoked' && <XCircle className="w-3.5 h-3.5" />}
      {variant === 'pending' && <AlertTriangle className="w-3.5 h-3.5" />}
      <span>{children}</span>
    </span>
  );
};
