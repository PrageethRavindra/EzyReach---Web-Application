'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for redirection
import { registerUser } from '@/firebase/firebaseHelpers'; // Import the registerUser function
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import {app} from '../../firebase/firebase'; // Adjust path to Firebase config file

export default function RegisterSalesRep() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    user_type: '',
    shopName: '',
    shopLocation: '',
    companyName: '',
    branchLocation: '',
    companyLocation: '',
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null); // State for success message
  const [loading, setLoading] = useState(false); // State for loading
  const [companies, setCompanies] = useState<{ id: string; name: string }[]>([]); // State to store company list
  const router = useRouter(); // For page redirection

  // Fetch companies from Firestore
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const db = getFirestore(app);
        const companyCollection = collection(db, 'company'); // Firestore collection for companies
        const companySnapshot = await getDocs(companyCollection);
        const companyList = companySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().companyName, // Extract only the companyName
        }));
        setCompanies(companyList);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchCompanies();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      // Call the registerUser function to send data to Firebase
      const result = await registerUser(form);
      if (result.success) {
        console.log('User registered successfully', result);
        setSuccessMessage('Registration successful! Redirecting to login...'); // Set success message
        setTimeout(() => {
          router.push('/login'); // Redirect to login page after success
        }, 2000); // Redirect after 2 seconds
      } else {
        console.log('Registration failed');
        setSuccessMessage('Registration failed. Please try again.'); // Set error message
      }
    } catch (error) {
      console.error('Error registering user:', error);
      setSuccessMessage('An error occurred. Please try again later.'); // Set error message
    } finally {
      setLoading(false); // Stop loading
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
        <h2 className="mb-4 text-[#1b1a1b] text-2xl font-bold">Register</h2>
        <select
          name="user_type"
          value={form.user_type}
          onChange={handleChange}
          required
          className="w-full mb-4 p-3 rounded-lg text-gray-900 border-none"
        >
          <option value="" disabled>
            Select User Type
          </option>
          <option value="sales_rep">Sales Representative</option>
          <option value="shop_owner">Shop Owner</option>
          <option value="company">Company</option>
        </select>

        {form.user_type === 'sales_rep' && (
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
            <select
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              required
              className="w-full mb-4 p-3 rounded-lg text-gray-900 border-none"
            >
              <option value="" disabled>
                Select Company
              </option>
              {companies.map((company) => (
                <option key={company.id} value={company.name}>
                  {company.name} {/* Display only the company name */}
                </option>
              ))}
            </select>
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

        {form.user_type === 'shop_owner' && (
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

        {form.user_type === 'company' && (
          <>
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
              name="companyLocation"
              type="text"
              placeholder="Location"
              value={form.companyLocation}
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

        {successMessage && (
          <div className="text-green-500 mb-4">{successMessage}</div>
        )}

        <button
          type="submit"
          className="w-full p-3 bg-[#8906E6] text-white rounded-lg hover:bg-purple-800 transition"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}
