// components/auth/LoginForm.jsx
"use client";

import { useState } from "react";

export const LoginForm = ({ onSubmit, errors, loading }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) errors[name] = null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData.email, formData.password);
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold text-[#4F46E5] mb-2">Let's Get Started</h2>
      <p className="text-gray-600 mb-6">Login as an Admin / Employee</p>
      
      {errors.form && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
          {errors.form}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-black mb-1">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            required
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-black mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            required
          />
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
        </div>
        
        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 mb-4 disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};