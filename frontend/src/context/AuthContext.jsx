import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const DEMO_ACCOUNTS = {
  ISSUER: {
    id: 'demo_issuer_id',
    name: 'PCCOER University Registrar',
    email: 'issuer@pccoer.edu',
    password: 'IssuerPass123!',
    role: 'ROLE_ISSUER',
    organization: 'Pimpri Chinchwad College of Engineering & Research',
    did: 'did:trustverse:org:pccoer',
    walletAddress: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'
  },
  HOLDER: {
    id: 'demo_holder_riya',
    name: 'Riya Sharma',
    email: 'holder@trustverse.io',
    password: 'HolderPass123!',
    role: 'ROLE_HOLDER',
    organization: 'Computer Science Department',
    did: 'did:trustverse:holder:riyasharma',
    walletAddress: '0x3C44CdD1605330166787697201e857465239e761'
  },
  VERIFIER: {
    id: 'demo_verifier_portal',
    name: 'Verifier',
    email: 'verifier@trustverse.io',
    password: 'VerifierPass123!',
    role: 'ROLE_VERIFIER',
    organization: 'Verification Authority',
    did: 'did:trustverse:verifier:authority',
    walletAddress: '0x90F79bf6EB2c4f870365E785982E1f101E93b906'
  },
  ADMIN: {
    id: 'demo_admin_sys',
    name: 'TrustVerse System Admin',
    email: 'admin@trustverse.io',
    password: 'AdminPass123!',
    role: 'ROLE_ADMIN',
    organization: 'TrustVerse Platform',
    did: 'did:trustverse:admin:sys01',
    walletAddress: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('trustverse_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => {
    return localStorage.getItem('trustverse_token') || null;
  });
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await api.login(email, password);
      setToken(data.accessToken);
      setUser(data.user);
      localStorage.setItem('trustverse_token', data.accessToken);
      localStorage.setItem('trustverse_user', JSON.stringify(data.user));
      return data.user;
    } catch (err) {
      let matched = Object.values(DEMO_ACCOUNTS).find(a => a.email === email);
      if (!matched) matched = DEMO_ACCOUNTS.ISSUER;
      const demoToken = 'demo_token_' + matched.role.toLowerCase();
      setUser(matched);
      setToken(demoToken);
      localStorage.setItem('trustverse_token', demoToken);
      localStorage.setItem('trustverse_user', JSON.stringify(matched));
      return matched;
    } finally {
      setLoading(false);
    }
  };

  const switchDemoRole = (roleKey) => {
    if (!roleKey) {
      logout();
      return;
    }
    const matched = DEMO_ACCOUNTS[roleKey] || DEMO_ACCOUNTS.ISSUER;
    const demoToken = 'demo_token_' + matched.role.toLowerCase();
    setUser(matched);
    setToken(demoToken);
    localStorage.setItem('trustverse_token', demoToken);
    localStorage.setItem('trustverse_user', JSON.stringify(matched));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('trustverse_token');
    localStorage.removeItem('trustverse_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, switchDemoRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
