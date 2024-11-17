'use client';

import { useState } from 'react';
import GoogleButton from '@/component/GoogleSignInButton';

export default function RegisterSalesRep() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div style={{ backgroundColor: '#050D2B', color: '#FFFFFF', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <form onSubmit={handleSubmit} style={{ backgroundColor: '#1C1E3A', padding: '2rem', borderRadius: '8px', textAlign: 'center', width: '400px' }}>
        <h2 style={{ marginBottom: '1rem', color: '#FF00E2' }}>Register as Sales Rep</h2>
        <input
          name="name"
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: '1rem', padding: '0.8rem', borderRadius: '4px', border: 'none' }}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: '1rem', padding: '0.8rem', borderRadius: '4px', border: 'none' }}
        />
        <input
          name="phone"
          type="tel"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: '1rem', padding: '0.8rem', borderRadius: '4px', border: 'none' }}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: '1rem', padding: '0.8rem', borderRadius: '4px', border: 'none' }}
        />
        <button type="submit" style={{ width: '100%', padding: '0.8rem', backgroundColor: '#8906E6', color: '#FFFFFF', borderRadius: '4px', border: 'none' }}>
          Register
        </button>
        <GoogleButton/> 
      </form>
    </div>
  );
}
