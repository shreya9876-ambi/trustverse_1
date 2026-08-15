const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const api = {
  // Auth
  login: async (email, password) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) throw new Error('Login failed');
    return res.json();
  },

  register: async (userData) => {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    if (!res.ok) throw new Error('Registration failed');
    return res.json();
  },

  getCurrentUser: async (token) => {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) return null;
    return res.json();
  },

  // Schemas
  getSchemas: async (domain = '') => {
    const url = domain ? `${API_BASE_URL}/schemas?domain=${domain}` : `${API_BASE_URL}/schemas`;
    const res = await fetch(url);
    return res.json();
  },

  createSchema: async (schemaData, token) => {
    const res = await fetch(`${API_BASE_URL}/schemas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(schemaData)
    });
    return res.json();
  },

  // Credentials
  issueCredential: async (payload, token) => {
    const res = await fetch(`${API_BASE_URL}/credentials/issue`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Issuance failed');
    }
    return res.json();
  },

  getCredentials: async (token) => {
    const res = await fetch(`${API_BASE_URL}/credentials`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.json();
  },

  getCredentialById: async (id) => {
    const res = await fetch(`${API_BASE_URL}/credentials/${id}`);
    return res.json();
  },

  revokeCredential: async (id, reason, token) => {
    const res = await fetch(`${API_BASE_URL}/credentials/${id}/revoke`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ reason })
    });
    return res.json();
  },

  // Forensics & Trust
  analyzeForensics: async (fileName) => {
    const res = await fetch(`${API_BASE_URL}/forensics/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileName, fileSize: 102400 })
    });
    return res.json();
  },

  evaluateTrustScore: async (issuerDid, holderDid, domain, forensicScore) => {
    const res = await fetch(`${API_BASE_URL}/trust-score`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ issuerDid, holderDid, domain, forensicScore })
    });
    return res.json();
  },

  // Proofs & Verification
  requestProof: async (credentialId, requestedClaim, token) => {
    const res = await fetch(`${API_BASE_URL}/proofs/request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ credentialId, requestedClaim })
    });
    return res.json();
  },

  generateZkProof: async (proofRequestId, holderDid, selectedClaims, token) => {
    const res = await fetch(`${API_BASE_URL}/proofs/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ proofRequestId, holderDid, selectedClaims })
    });
    return res.json();
  },

  verifyZkProof: async (zkPayload) => {
    const res = await fetch(`${API_BASE_URL}/proofs/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(zkPayload)
    });
    return res.json();
  },

  getVerificationSession: async (sessionId) => {
    const res = await fetch(`${API_BASE_URL}/verify/${sessionId}`);
    return res.json();
  }
};
