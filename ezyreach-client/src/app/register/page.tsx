'use client';

import { useState } from 'react';
import { registerUser } from '@/firebase/firebaseHelpers'; // Import the registerUser function

export default function RegisterSalesRep() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: '',
    shopName: '',
    shopLocation: '',
    companyName: '',
    branchLocation: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Call the registerUser function to send data to Firebase
      const result = await registerUser(form);
      if (result.success) {
        console.log('User registered successfully', result);
        // Optionally, you can redirect to a different page after successful registration
      } else {
        console.log('Registration failed');
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="bg-[#050D2B] text-white min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1C1E3A] p-8 rounded-lg text-center w-full max-w-sm shadow-lg"
      >
        <h2 className="mb-4 text-[#FF00E2] text-2xl font-bold">Register</h2>
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          required
          className="w-full mb-4 p-3 rounded-lg text-gray-900 border-none"
        >
          <option value="" disabled>
            Select Role
          </option>
          <option value="sales_rep">Sales Representative</option>
          <option value="shop_owner">Shop Owner</option>
        </select>

        {form.role === 'sales_rep' && (
          <>
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full mb-4 p-3 rounded-lg text-gray-900 border-none"
            />
            <input
              name="companyName"
              type="text"
              placeholder="Company Name"
              value={form.companyName}
              onChange={handleChange}
              required
              className="w-full mb-4 p-3 rounded-lg text-gray-900 border-none"
            />
            <input
              name="branchLocation"
              type="text"
              placeholder="Branch Location"
              value={form.branchLocation}
              onChange={handleChange}
              required
              className="w-full mb-4 p-3 rounded-lg text-gray-900 border-none"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full mb-4 p-3 rounded-lg text-gray-900 border-none"
            />
            <input
              name="phone"
              type="tel"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full mb-4 p-3 rounded-lg text-gray-900 border-none"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full mb-4 p-3 rounded-lg text-gray-900 border-none"
            />
          </>
        )}

        {form.role === 'shop_owner' && (
          <>
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full mb-4 p-3 rounded-lg text-gray-900 border-none"
            />
            <input
              name="shopName"
              type="text"
              placeholder="Shop Name"
              value={form.shopName}
              onChange={handleChange}
              required
              className="w-full mb-4 p-3 rounded-lg text-gray-900 border-none"
            />
            <input
              name="shopLocation"
              type="text"
              placeholder="Shop Location"
              value={form.shopLocation}
              onChange={handleChange}
              required
              className="w-full mb-4 p-3 rounded-lg text-gray-900 border-none"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full mb-4 p-3 rounded-lg text-gray-900 border-none"
            />
            <input
              name="phone"
              type="tel"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full mb-4 p-3 rounded-lg text-gray-900 border-none"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full mb-4 p-3 rounded-lg text-gray-900 border-none"
            />
          </>
        )}

        <button
          type="submit"
          className="w-full p-3 bg-[#8906E6] text-white rounded-lg hover:bg-purple-800 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
}
