'use client';

import { useState } from 'react';
import NotificationModal from './NotificationModal';
import { CheckCircleIcon } from 'lucide-react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { FaCheck } from 'react-icons/fa';

export default function ForgotPwDetail() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSuccess, setShowSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Password reset request:', { password, confirmPassword });
    setShowSuccess(true);
  };

    const toggleShowPassword = () => setShowPassword((prev) => !prev);
  const toggleShowConfirm = () => setShowConfirm((prev) => !prev);

  return (
    <div className="p-6">
  <form className="w-full bg-white rounded-lg shadow-sm h-auto p-6 space-y-6">
      <h2 className="text-lg font-semibold text-[#4F46E5] mb-6">Reset Password</h2>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 items-start">
       
        <div className="w-1/2 relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            required
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute top-[34px] right-3 text-gray-500"
          >
            {showPassword ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
          </button>
        </div>

     
        <div className="w-1/2 relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
          <input
            type={showConfirm ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter password"
            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            required
          />
          <button
            type="button"
            onClick={toggleShowConfirm}
            className="absolute top-[34px] right-3 text-gray-500"
          >
            {showConfirm ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
          </button>
        </div>
      </div>


        
      

<ul className="text-sm text-gray-700 list-none space-y-2 mt-4">
  {[
    'Have at least 8 characters',
    'Have at least one number',
    'Have at least an uppercase',
    'Have a special character (#$@!%&*-)',
  ].map((rule, idx) => (
    <li key={idx} className="flex items-center gap-3">
      <span className="w-5 h-5 rounded-[4.4px] bg-[#4F46E5] flex items-center justify-center text-white text-xs">
        <FaCheck />
      </span>
      {rule}
    </li>
  ))}
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
        title= 'Successful'
        message="Your password has been reset.  
You can now use your new password to sign in."
        buttonLabel='Go Back'
        onConfirm={() => setShowSuccess(false)}
       
      />
    </div>
  );
}
