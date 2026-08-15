import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * RoleGuard — Wraps routes that require specific roles.
 * Strictly prevents cross-role access (e.g. Issuer accessing Holder Wallet).
 * Redirects unauthorized users to their own portal or the role selection page.
 */
export const RoleGuard = ({ allowed, children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/auth/select-role" state={{ from: location }} replace />;
  }

  // Normalise role to bare string e.g. "HOLDER" from "ROLE_HOLDER"
  const userRole = (user.role || '').replace('ROLE_', '').toUpperCase();

  if (!allowed.includes(userRole)) {
    // Redirect logged-in user to their own dedicated portal if they try to access another role's route
    const roleHomeMap = {
      ISSUER:   '/issuer/dashboard',
      HOLDER:   '/holder/dashboard',
      VERIFIER: '/verifier',
      ADMIN:    '/admin/dashboard',
    };
    const redirectPath = roleHomeMap[userRole] || '/auth/select-role';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};
