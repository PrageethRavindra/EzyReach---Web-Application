'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
    // Handle login logic here
  };

  return (
    <div
      style={{
        backgroundColor: '#050D2B',
        color: '#FFFFFF',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: '#1C1E3A',
          padding: '2rem',
          borderRadius: '8px',
          textAlign: 'center',
          width: '400px',
        }}
      >
        <h2 style={{ marginBottom: '1rem', color: '#FF00E2' }}>Login to EZYREACH</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: '100%',
            marginBottom: '1rem',
            padding: '0.8rem',
            borderRadius: '4px',
            border: 'none',
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: '100%',
            marginBottom: '1rem',
            padding: '0.8rem',
            borderRadius: '4px',
            border: 'none',
          }}
        />
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '0.8rem',
            backgroundColor: '#8906E6',
            color: '#FFFFFF',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Login
        </button>
        <p style={{ marginTop: '1rem', color: '#FFFFFF' }}>
          Don't have an account?{' '}
          <span
            onClick={() => router.push('/register-shop-owner')}
            style={{ color: '#FF00E2', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
}
