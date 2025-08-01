"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

const AuthLayout = () => {
  const router = useRouter();
  const { 
    register, 
    login, 
    verifyOtp, 
    updateProfile,
    loading
  } = useUser();
  
  const [step, setStep] = useState("login"); // login | signup | otp | personal | job
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    maritalStatus: "",
    contactNumber: "",
    nationality: "",
    homeAddress: "",
    emergencyNumber: "",
    employeeId: "",
    jobTitle: "",
    department: "",
    manager: "",
    employmentType: "",
    workEmail: "",
    dateOfJoining: "",
    workLocation: ""
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const validateSignup = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePersonalDetails = () => {
    const requiredFields = [
      'firstName', 'lastName', 'gender', 'dob', 
      'maritalStatus', 'contactNumber', 'nationality', 
      'homeAddress', 'emergencyNumber'
    ];
    const newErrors = {};
    
    requiredFields.forEach(field => {
      if (!formData[field]) newErrors[field] = `${field.replace(/([A-Z])/g, ' $1')} is required`;
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateJobDetails = () => {
    const requiredFields = [
      'employeeId', 'jobTitle', 'department', 
      'manager', 'employmentType', 'workEmail',
      'dateOfJoining', 'workLocation'
    ];
    const newErrors = {};
    
    requiredFields.forEach(field => {
      if (!formData[field]) newErrors[field] = `${field.replace(/([A-Z])/g, ' $1')} is required`;
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = formData;
      const result = await login(email, password);
      
      if (result.success) {
        router.push(result.user.role === 'Admin' ? '/admin/dashboard' : '/employee/dashboard');
      } else {
        setErrors({ form: result.error });
      }
    } catch (error) {
      setErrors({ form: error.message });
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (!validateSignup()) return;
    
    try {
      const { email, password } = formData;
      const result = await register(email, password);
      
      if (result.success) {
        setStep("otp");
      } else {
        setErrors({ form: result.error });
      }
    } catch (error) {
      setErrors({ form: error.message });
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, otp } = formData;
      const result = await verifyOtp(email, otp);
      
      if (result.success) {
        setStep("personal");
      } else {
        setErrors({ otp: result.error });
      }
    } catch (error) {
      setErrors({ otp: error.message });
    }
  };

  const handlePersonalDetailsSubmit = async (e) => {
    e.preventDefault();
    if (!validatePersonalDetails()) return;
    setStep("job");
  };

  const handleJobDetailsSubmit = async (e) => {
    e.preventDefault();
    if (!validateJobDetails()) return;
    
    try {
      const personalDetails = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        gender: formData.gender,
        dob: formData.dob,
        maritalStatus: formData.maritalStatus,
        email: formData.email,
        contactNumber: formData.contactNumber,
        nationality: formData.nationality,
        homeAddress: formData.homeAddress,
        emergencyNumber: formData.emergencyNumber
      };

      const jobDetails = {
        employeeId: formData.employeeId,
        jobTitle: formData.jobTitle,
        department: formData.department,
        manager: formData.manager,
        employmentType: formData.employmentType,
        workEmail: formData.workEmail,
        dateOfJoining: formData.dateOfJoining,
        workLocation: formData.workLocation
      };

      const result = await updateProfile(personalDetails, jobDetails);
      
      if (result.success) {
        router.push('/');
      } else {
        setErrors({ form: result.error });
      }
    } catch (error) {
      setErrors({ form: error.message });
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
      {/* Left Side */}
      <div className="bg-[#3F38B8] text-white flex flex-col rounded-md p-16 pt-24 pb-24">
  <div className="w-full mb-8">
    <p className="text-indigo-200 text-lg">Manage your work, time, and profile<br/>
      all in one place—simple, fast, and<br/>secure.</p>
  </div>
  
  <div className="w-full flex justify-center mb-8">
    <div className=" bg-indigo-700 rounded-lg overflow-hidden"> {/* Increased size by 50% */}
      <img
        src="./dashboardpic.jpeg"
        alt="Dashboard Preview"
        className="object-cover w-full h-full"
      />
    </div>
  </div>
  
  <div className="w-full">
    <div className="p-6 bg-[#ffffff]/5 rounded-md text-center">
      <h4 className="text-sm font-semibold mb-4">Testimonial</h4>
      <p className="mb-4 italic text-xs">
        "The Employee Management System has completely changed their meaning any week. Last week is required time, and when any broadcasts all in one place, it's like every track each longer the updated effect having to close up for a transaction. Nextday, it takes me to reach the every week."
      </p>
      <div className="flex items-center justify-center space-x-2">
        <img 
          src="./user-avatar.jpg" 
          alt="Testifier" 
          className="w-8 h-8 rounded-full"
        />
        <div>
          <div className="font-medium">Motor Portal</div>
          <div className="text-indigo-200 text-sm">Design & Marketing</div>
        </div>
      </div>
    </div>
  </div>
</div>


      {/* Right Side */}
      <div className="flex p-8 bg-white">
        {step === "login" && (
          <div className="w-full">
            <h2 className="text-2xl font-semibold text-[#4F46E5] mb-2">Let's Get Started</h2>
            <p className="text-gray-600 mb-6">Login as an Admin / Employee</p>
            
            {errors.form && (
              <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
                {errors.form}
              </div>
            )}
            
            <form onSubmit={handleLoginSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-black mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
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
            
            <div className="text-sm text-center text-gray-600">
              Don't have an account?{' '}
              <button 
                className="text-indigo-600 hover:text-indigo-500 font-medium"
                onClick={() => setStep("signup")}
              >
                Sign up
              </button>
            </div>
          </div>
        )}

        {step === "signup" && (
          <div className="w-full ">
            <h2 className="text-2xl font-semibold text-[#4F46E5] mb-2">Let's Get Started</h2>
            <p className="text-gray-600 mb-6">Signup as an Admin / Employee</p>
            
            {errors.form && (
              <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
                {errors.form}
              </div>
            )}
            
            <form onSubmit={handleSignupSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-black mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
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
                />
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-black mb-1">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                />
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
              </div>
              
              <div className="mb-6 p-4 bg-gray-50 rounded-md">
                <h4 className="text-sm font-medium text-black mb-2">Your password must:</h4>
                <ul className="text-xs text-black list-disc pl-5 space-y-1">
                  <li>Have at least 8 characters</li>
                  <li>Have at least one number</li>
                  <li>Have at least an uppercase</li>
                  <li>Have a special character (#$@N&K+)</li>
                </ul>
              </div>
              
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 mb-4 disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Next'}
              </button>
            </form>
          </div>
        )}

        {step === "otp" && (
          <div className="w-full ">
            <h2 className="text-xl font-semibold text-[#4F46E5] mb-4">Verify OTP</h2>
            <p className="text-sm text-gray-600 mb-6">Enter the OTP sent to your email {formData.email}</p>
            
            {errors.otp && (
              <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
                {errors.otp}
              </div>
            )}
            
            <form onSubmit={handleOtpSubmit}>
              <div className="grid grid-cols-4 gap-3 mb-8">
                {[1, 2, 3, 4].map((i) => (
                  <input
                    key={i}
                    type="text"
                    name={`otp${i}`}
                    maxLength="1"
                    value={formData[`otp${i}`] || ''}
                    onChange={(e) => {
                      const newOtp = formData.otp.split('');
                      newOtp[i-1] = e.target.value;
                      handleInputChange({
                        target: {
                          name: 'otp',
                          value: newOtp.join('')
                        }
                      });
                      if (e.target.value && i < 4) {
                        document.querySelector(`input[name=otp${i+1}]`).focus();
                      }
                    }}
                    className="w-full p-3 text-center border border-gray-300 rounded-md text-black"
                  />
                ))}
              </div>
              
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 mb-6 disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Submit'}
              </button>
            </form>
          </div>
        )}

        {step === "personal" && (
          <div className="w-full ">
            <h2 className="text-xl font-semibold text-[#4F46E5] mb-6">Set up your Profile</h2>
            <h3 className="text-md font-medium text-black mb-4">Personal Details</h3>
            
            {errors.form && (
              <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
                {errors.form}
              </div>
            )}
            
            <form onSubmit={handlePersonalDetailsSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-black mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                  />
                  {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm text-black mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                  />
                  {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-black mb-1">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
                </div>
                <div>
                  <label className="block text-sm text-black mb-1">DOB</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                  />
                  {errors.dob && <p className="mt-1 text-sm text-red-600">{errors.dob}</p>}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-black mb-1">Marital Status</label>
                  <input
                    type="text"
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                  />
                  {errors.maritalStatus && <p className="mt-1 text-sm text-red-600">{errors.maritalStatus}</p>}
                </div>
                <div>
                  <label className="block text-sm text-black mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-black"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-black mb-1">Contact Number</label>
                  <input
                    type="text"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                  />
                  {errors.contactNumber && <p className="mt-1 text-sm text-red-600">{errors.contactNumber}</p>}
                </div>
                <div>
                  <label className="block text-sm text-black mb-1">Nationality</label>
                  <input
                    type="text"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                  />
                  {errors.nationality && <p className="mt-1 text-sm text-red-600">{errors.nationality}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="mb-4">
                <label className="block text-sm text-black mb-1">Home Address</label>
                <input
                  type="text"
                  name="homeAddress"
                  value={formData.homeAddress}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                />
                {errors.homeAddress && <p className="mt-1 text-sm text-red-600">{errors.homeAddress}</p>}
              </div>
              
              <div className="mb-6">
                <label className="block text-sm text-black mb-1">Emergency Number</label>
                <input
                  type="text"
                  name="emergencyNumber"
                  value={formData.emergencyNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                />
                {errors.emergencyNumber && <p className="mt-1 text-sm text-red-600">{errors.emergencyNumber}</p>}
              </div>
              </div>


              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Continue'}
              </button>
            </form>
          </div>
        )}

        {step === "job" && (
          <div className="w-full ">
            <h2 className="text-xl font-semibold text-[#4F46E5] mb-6">Set up your Profile</h2>
            <h3 className="text-md font-medium text-black mb-4">Job Details</h3>
            
            {errors.form && (
              <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
                {errors.form}
              </div>
            )}
            
            <form onSubmit={handleJobDetailsSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-black mb-1">Employee ID</label>
                  <input
                    type="text"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                  />
                  {errors.employeeId && <p className="mt-1 text-sm text-red-600">{errors.employeeId}</p>}
                </div>
                <div>
                  <label className="block text-sm text-black mb-1">Job Title</label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                  />
                  {errors.jobTitle && <p className="mt-1 text-sm text-red-600">{errors.jobTitle}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="mb-4">
                <label className="block text-sm text-black mb-1">Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                />
                {errors.department && <p className="mt-1 text-sm text-red-600">{errors.department}</p>}
              </div>
              
              <div className="mb-4">
                <label className="block text-sm text-black mb-1">Manager</label>
                <input
                  type="text"
                  name="manager"
                  value={formData.manager}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                />
                {errors.manager && <p className="mt-1 text-sm text-red-600">{errors.manager}</p>}
              </div>
              </div>

              
              <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="mb-4">
                <label className="block text-sm text-black mb-1">Employment Type</label>
                <input
                  type="text"
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                />
                {errors.employmentType && <p className="mt-1 text-sm text-red-600">{errors.employmentType}</p>}
              </div>
              
              <div className="mb-4">
                <label className="block text-sm text-black mb-1">Work Email</label>
                <input
                  type="email"
                  name="workEmail"
                  value={formData.workEmail}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                />
                {errors.workEmail && <p className="mt-1 text-sm text-red-600">{errors.workEmail}</p>}
              </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="mb-4">
                <label className="block text-sm text-black mb-1">Date of Joining</label>
                <input
                  type="date"
                  name="dateOfJoining"
                  value={formData.dateOfJoining}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                />
                {errors.dateOfJoining && <p className="mt-1 text-sm text-red-600">{errors.dateOfJoining}</p>}
              </div>
              
              <div className="mb-6">
                <label className="block text-sm text-black mb-1">Work Location</label>
                <input
                  type="text"
                  name="workLocation"
                  value={formData.workLocation}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                />
                {errors.workLocation && <p className="mt-1 text-sm text-red-600">{errors.workLocation}</p>}
              </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'LogIn'}
              </button>
              
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthLayout;