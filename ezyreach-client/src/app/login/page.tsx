'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, query, where, getDocs, collection } from 'firebase/firestore';
import { app } from '../../firebase/firebase'; // Import Firebase config

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear any previous error messages

    try {
      const auth = getAuth(app); // Pass the initialized app to getAuth
      // Sign in with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Get Firestore instance
      const db = getFirestore(app); // Pass the initialized app to getFirestore

      // Query for the user role based on the entered email
      const roleCollections = ['company', 'sales-rep', 'shop_owner'];
      let userRole = '';

      // Loop through the role collections to find the user
      for (const role of roleCollections) {
        const usersCollection = collection(db, role);
        const q = query(usersCollection, where('email', '==', email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          userRole = role; // Found the user in the respective role collection
          break;
        }
      }

      if (userRole) {
        // Redirect user based on their role
        if (userRole === 'company') {
          router.push('/company_Dashboard');
        } else if (userRole === 'shop_owner') {
          router.push('/shop-owners');
        } else if (userRole === 'sales-rep') {
          router.push('/sales-reps');
        }
      } else {
        setError('User not found in any role.');
      }

      console.log('Login successful:', userCredential.user);
    } catch (err) {
      // Display error messages
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg text-center w-96"
      >
        <h2 className="mb-4 text-xl text-pink-500">Login to EZYREACH</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
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
