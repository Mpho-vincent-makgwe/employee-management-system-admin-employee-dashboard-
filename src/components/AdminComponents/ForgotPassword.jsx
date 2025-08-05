'use client';

import { useState } from 'react';
import ForgotPwDetail from './ForgotPwDetail.jsx';
import { FiMail } from 'react-icons/fi';


export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [showDetail, setShowDetail] = useState(false); 

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Password reset request for:', email);
    setShowDetail(true); 
  };

  if (showDetail) {
    return <ForgotPwDetail email={email} />
  }

  return (
    <div className="p-6">
      <div className="w-full bg-white rounded-lg shadow-sm h-auto p-6">
        <h2 className="text-lg font-semibold text-indigo-600 mb-6">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <FiMail className='h-5 w-5' />
            </span>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              className="w-1/2 px-4 py-2 pl-10 pr-10 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-1/2 bg-indigo-600 text-white py-2 rounded-md text-sm font-medium hover:bg-indigo-500 transition-all"
          >
            Continue
          </button>
        </form>
      </div>

      
    </div>
  );
}
