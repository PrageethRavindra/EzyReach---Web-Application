'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '@/firebase/firebase'; // Your Firebase config initialization

const auth = getAuth(app);
const db = getFirestore(app);

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Sign in with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Get the user data from Firestore based on user email
      const userDocRef = doc(db, 'users', userCredential.user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.role === role) {
          // Role matches, redirect to appropriate page
          console.log('Login successful');
          router.push('/dashboard'); // Redirect to the dashboard or home page
        } else {
          setError('Role does not match.');
        }
      } else {
        setError('User not found.');
      }
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg text-center w-96"
      >
        <h2 className="mb-4 text-xl text-pink-500">Login to EZYREACH</h2>
        {error && (
          <p className="text-red-500 mb-4">
            {error}
          </p>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 p-3 rounded-md border-none bg-gray-700 text-white focus:ring-2 focus:ring-pink-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-4 p-3 rounded-md border-none bg-gray-700 text-white focus:ring-2 focus:ring-pink-500"
        />
        
        {/* Role selection dropdown */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          className="w-full mb-4 p-3 rounded-md border-none bg-gray-700 text-white focus:ring-2 focus:ring-pink-500"
        >
          <option value="">Select Role</option>
          <option value="sales_rep">Sales Representative</option>
          <option value="shop_owner">Shop Owner</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className="w-full p-3 bg-purple-600 text-white rounded-md cursor-pointer hover:bg-purple-700"
        >
          Login
        </button>
        <p className="mt-4 text-white">
          Don't have an account?{' '}
          <span
            onClick={() => router.push('/register')}
            className="text-pink-500 cursor-pointer underline"
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
}
