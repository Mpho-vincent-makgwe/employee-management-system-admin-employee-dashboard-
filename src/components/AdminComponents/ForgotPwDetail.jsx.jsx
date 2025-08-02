'use client';

import { useState } from 'react';

import NotificationModal from './NotificationModal';
import { CheckCircleIcon } from 'lucide-react';

export default function ForgotPwDetail() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Password reset request:', { password, confirmPassword });
    setShowSuccess(true);
  };

  return (
    <div className="p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full bg-white rounded-lg shadow-sm h-auto p-6 space-y-6"
      >
        <h2 className="text-lg font-semibold text-[#4F46E5] mb-6">
          Reset Password
        </h2>

        
       <div className="grid grid-cols-1 md:grid-cols-1 gap-6 items-start">
  <div className="w-1/2">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      New Password
    </label>
    <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Enter new password"
      className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
      required
    />
  </div>

  <div className="w-1/2">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Confirm Password
    </label>
    <input
      type="password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      placeholder="Re-enter password"
      className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
      required
    />
  </div>
</div>


        
        <ul className="text-sm text-gray-600 list-disc list-inside space-y-1 mt-4">
          <li>Have at least 8 characters</li>
          <li>Have at least one number</li>
          <li>Have at least an uppercase</li>
          <li>Have a special character (#$@!%&*-)</li>
        </ul>

       
        <div className="pt-6">
          <button
            type="submit"
            className="px-6 py-3 bg-[#4F46E5] text-white rounded-sm font-medium text-sm hover:bg-[#4338CA]"
          >
            Reset Password
          </button>
        </div>
      </form>

       <NotificationModal
        show={showSuccess}
        close={() => setShowSuccess(false)}
        icon={<CheckCircleIcon className="w-6 h-6 text-white" />}
        message="Your password has been reset.  
You can now use your new password to sign in."
        buttonLabel='Go Back'
        onConfirm={() => setShowSuccess(false)}
       
      />
    </div>
  );
}
