'use client';  // This marks the file as a Client Component
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '../../context/UserContext';

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useUser(); // Get the login function from context

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3005/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone_number: phoneNumber, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Login successful!');
        login(data.user); // Call login from UserContext to update the user state
        router.push('/cart'); // Navigate to a dashboard or another page on success
      } else {
        setError(data.error || 'Invalid phone number or password.');
      }
    } catch (error) {
      setError('Failed to login. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-md shadow-md w-80"
      >
        <h1 className="text-xl font-bold mb-4">Login</h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-300 rounded text-black bg-white"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-300 rounded text-black bg-white"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
        <p className="text-sm text-gray-500 mt-3">
          Don&apos;t have an account?{' '}
          <Link href="/login_signup/signup" className="text-blue-500 underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
