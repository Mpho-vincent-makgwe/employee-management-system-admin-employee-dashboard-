'use client';

import { useState } from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // trigger API call or password reset logic
    console.log('Password reset request for:', email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-6 text-center">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
              📧
            </span>
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-md text-sm font-medium hover:bg-indigo-500 transition-all"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
