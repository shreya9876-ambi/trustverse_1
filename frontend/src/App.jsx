import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { RoleGuard } from './components/RoleGuard';

// Public Pages
import { Home } from './pages/Home';
import { HowItWorks } from './pages/HowItWorks';
import { Verify } from './pages/Verify';

// Role Gateway & Auth Pages
import { RoleSelect } from './pages/auth/RoleSelect';
import { IssuerAuth } from './pages/auth/IssuerAuth';
import { HolderAuth } from './pages/auth/HolderAuth';
import { VerifierAuth } from './pages/auth/VerifierAuth';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';

// Issuer Pages (ISSUER role only)
import { IssuerDashboard } from './pages/issuer/IssuerDashboard';
import { IssueCredential } from './pages/issuer/IssueCredential';
import { ManageSchemas } from './pages/issuer/ManageSchemas';
import { IssuedCredentials } from './pages/issuer/IssuedCredentials';

// Holder Pages (HOLDER role only)
import { HolderDashboard } from './pages/holder/HolderDashboard';
import { GenerateProof } from './pages/holder/GenerateProof';

// Verifier Pages (VERIFIER role only)
import { VerifierPortal } from './pages/verifier/VerifierPortal';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';

export function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Routes>
            {/* ── Public Routes ── */}
            <Route path="/" element={<Home />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/verify" element={<Verify />} />

            {/* ── Role Auth Portals (public) ── */}
            <Route path="/auth/select-role"   element={<RoleSelect />} />
            <Route path="/issuer/login"       element={<IssuerAuth mode="login" />} />
            <Route path="/issuer/register"    element={<IssuerAuth mode="register" />} />
            <Route path="/holder/login"       element={<HolderAuth mode="login" />} />
            <Route path="/holder/register"    element={<HolderAuth mode="register" />} />
            <Route path="/verifier/login"     element={<VerifierAuth mode="login" />} />
            <Route path="/verifier/register"  element={<VerifierAuth mode="register" />} />
            <Route path="/login"              element={<Login />} />
            <Route path="/register"           element={<Register />} />

            {/* ── ISSUER-ONLY Routes ── */}
            <Route path="/issuer/dashboard" element={
              <RoleGuard allowed={['ISSUER', 'ADMIN']}><IssuerDashboard /></RoleGuard>
            } />
            <Route path="/issuer/issue" element={
              <RoleGuard allowed={['ISSUER', 'ADMIN']}><IssueCredential /></RoleGuard>
            } />
            <Route path="/issuer/schemas" element={
              <RoleGuard allowed={['ISSUER', 'ADMIN']}><ManageSchemas /></RoleGuard>
            } />
            <Route path="/issuer/credentials" element={
              <RoleGuard allowed={['ISSUER', 'ADMIN']}><IssuedCredentials /></RoleGuard>
            } />

            {/* ── HOLDER-ONLY Routes ── */}
            <Route path="/holder/dashboard" element={
              <RoleGuard allowed={['HOLDER', 'ADMIN']}><HolderDashboard /></RoleGuard>
            } />
            <Route path="/holder/generate-proof" element={
              <RoleGuard allowed={['HOLDER', 'ADMIN']}><GenerateProof /></RoleGuard>
            } />

            {/* ── VERIFIER-ONLY Routes ── */}
            <Route path="/verifier" element={
              <RoleGuard allowed={['VERIFIER', 'ADMIN']}><VerifierPortal /></RoleGuard>
            } />

            {/* ── ADMIN Routes ── */}
            <Route path="/admin/dashboard" element={
              <RoleGuard allowed={['ADMIN']}><AdminDashboard /></RoleGuard>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
