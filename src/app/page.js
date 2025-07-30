"use client";

import { useState, useContext } from "react";
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
  const [userType, setUserType] = useState("Employee");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
    firstName: "",
    lastName: "",
    gender: "Male",
    dob: "",
    maritalStatus: "Single",
    contactNumber: "",
    nationality: "",
    homeAddress: "",
    emergencyNumber: "",
    employeeId: "",
    jobTitle: "",
    department: "",
    manager: "",
    employmentType: "Full Time",
    workEmail: "",
    dateOfJoining: "",
    workLocation: "Remote"
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
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
      'contactNumber', 'nationality', 'homeAddress', 
      'emergencyNumber'
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
  
  // Validate first
  if (!validateSignup()) return;
  
  try {
    setErrors({}); // Clear previous errors
    const { email, password } = formData;
    
    console.log('Attempting to register:', email); // Debug log
    
    const result = await register(email, password, userType);
    
    if (result.success) {
      console.log('Registration successful for:', email);
      // Update form state with the registered email
      setFormData(prev => ({ 
        ...prev, 
        email: result.user.email // Use the normalized email from backend
      }));
      setStep("otp");
    } else {
      console.error('Registration failed:', result.error);
      setErrors({ form: result.error });
    }
  } catch (error) {
    console.error('Registration error:', error);
    setErrors({ 
      form: error.message || 'Registration failed. Please try again.' 
    });
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
        // router.push(result.user.role === 'Admin' ? '/admin/dashboard' : '/employee/dashboard');
        router.push('/');
      } else {
        setErrors({ form: result.error });
      }
    } catch (error) {
      setErrors({ form: error.message });
    }
  };

  const renderRightContent = () => {
    switch (step) {
      case "login":
        return (
          <LoginForm 
            onSwitch={setStep} 
            onSubmit={handleLoginSubmit}
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
            loading={loading}
          />
        );
      case "signup":
        return (
          <SignupForm 
            onSwitch={setStep} 
            userType={userType} 
            setUserType={setUserType}
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
            loading={loading}
            onSubmit={handleSignupSubmit}
          />
        );
      case "otp":
        return (
          <OtpForm 
            onSwitch={setStep} 
            email={formData.email}
            formData={formData}
            handleInputChange={handleInputChange}
            onSubmit={handleOtpSubmit}
            errors={errors}
            loading={loading}
          />
        );
      case "personal":
        return (
          <PersonalDetailsForm 
            onSwitch={setStep} 
            formData={formData} 
            handleInputChange={handleInputChange}
            onSubmit={handlePersonalDetailsSubmit}
            errors={errors}
            loading={loading}
          />
        );
      case "job":
        return (
          <JobDetailsForm 
            onSwitch={setStep} 
            formData={formData} 
            handleInputChange={handleInputChange}
            onSubmit={handleJobDetailsSubmit}
            errors={errors}
            loading={loading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gray-50">
      {/* Left Side - Consistent across all screens */}
      <div className="bg-[#3730a3] rounded-md text-white flex flex-col justify-center items-center p-8 rounded-l-md">
        {/* Dashboard image placeholder */}
        <div className="w-full max-w-xs h-48 bg-indigo-700 rounded-lg mt-4 flex items-center justify-center text-indigo-200">
          <img
            src="./dashboardpic.jpeg"
            alt="Dashboard Preview"
            className="rounded-lg object-cover w-full h-full"
          />
        </div>
        
        {/* Centered Testimonial */}
        <div className="mt-8 p-6 bg-[#312e81] text-center max-w-md">
          <p className="mb-4 italic">
            "The Employee Management System has completely transformed our workflow. 
            Everything we need is in one place, saving us time and increasing productivity."
          </p>
          <div className="font-medium">Motor Portal</div>
          <div className="text-indigo-200 text-xs">Design & Marketing</div>
        </div>
      </div>

      {/* Right Side - Changes based on step */}
      <div className="flex p-8 bg-white rounded-r-md">
        {renderRightContent()}
      </div>
    </div>
  );
};

// Updated form components with error handling and loading states
const LoginForm = ({ onSwitch, onSubmit, formData, handleInputChange, errors, loading }) => (
  <div className="w-full max-w-md">
    <h2 className="text-2xl font-semibold text-[#3730a3] mb-2">Let's Get Started</h2>
    <p className="text-gray-600 mb-6">Login as an Admin / Employee</p>
    
    {errors.form && (
      <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
        {errors.form}
      </div>
    )}
    
    <form onSubmit={onSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter email address"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Enter password"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
      </div>
      
      <div className="text-right mb-6">
        <button 
          type="button"
          className="text-sm text-indigo-600 hover:text-indigo-500"
          onClick={() => onSwitch("otp")}
        >
          Forget Password?
        </button>
      </div>
      
      <button 
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
    
    <div className="text-sm text-center text-gray-600">
      Don't have an account yet?{' '}
      <button 
        className="text-indigo-600 hover:text-indigo-500 font-medium"
        onClick={() => onSwitch("signup")}
      >
        Sign up
      </button>
    </div>
  </div>
);

const SignupForm = ({ onSwitch, userType, setUserType, formData, handleInputChange, errors, loading, onSubmit }) => (
  <div className="w-full max-w-md">
    <h2 className="text-2xl font-semibold text-[#3730a3] mb-2">Let's Get Started</h2>
    <p className="text-gray-600 mb-6">Signup as an Admin / Employee</p>
    
    {errors.form && (
      <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
        {errors.form}
      </div>
    )}
    
    <form onSubmit={onSubmit}>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Select User Type</label>
        <div className="relative">
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
          >
            <option>Admin</option>
            <option>Employee</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter email address"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Enter password"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          placeholder="Confirm password"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
      </div>
      
      <div className="mb-6 p-4 bg-gray-50 rounded-md">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Your password must:</h4>
        <ul className="text-xs text-gray-600 list-disc pl-5 space-y-1">
          <li>Have at least 8 characters</li>
          <li>Have at least one number</li>
          <li>Have at least an uppercase</li>
          <li>Have a special character (#$@N&K+)</li>
        </ul>
      </div>
      
      <button 
        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
        type="submit"
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Next'}
      </button>
      
      <div className="text-sm text-center text-gray-600">
        Have an account already?{' '}
        <button 
          className="text-indigo-600 hover:text-indigo-500 font-medium"
          onClick={() => onSwitch("login")}
        >
          Login
        </button>
      </div>
    </form>
  </div>
);

const OtpForm = ({ onSwitch, email, formData, handleInputChange, onSubmit, errors, loading }) => (
  <div className="w-full max-w-md">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">Verify OTP</h2>
    <p className="text-sm text-gray-600 mb-6">
      Enter the OTP sent to your email {email || formData.email}
    </p>
    
    {errors.otp && (
      <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
        {errors.otp}
      </div>
    )}
    
    <form onSubmit={onSubmit}>
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
              
              // Auto focus next input
              if (e.target.value && i < 4) {
                document.querySelector(`input[name=otp${i+1}]`).focus();
              }
            }}
            className="w-full p-3 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        ))}
      </div>
      
      <button 
        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
        type="submit"
        disabled={loading}
      >
        {loading ? 'Verifying...' : 'Submit'}
      </button>
    </form>
    
    <div className="p-4 bg-gray-50 rounded-md">
      <p className="text-sm text-gray-600 italic">
        "The Employee Management System has completely transformed our workflow. 
        Everything we need is in one place, saving us time and increasing productivity."
      </p>
    </div>
  </div>
);

const PersonalDetailsForm = ({ onSwitch, formData, handleInputChange, onSubmit, errors, loading }) => (
  <div className="w-full max-w-md">
    <h2 className="text-xl font-semibold text-gray-800 mb-6">Set up your Profile</h2>
    <h3 className="text-md font-medium text-gray-700 mb-4">Personal Details</h3>
    
    {errors.form && (
      <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
        {errors.form}
      </div>
    )}
    
    <form onSubmit={onSubmit}>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">DOB</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {errors.dob && <p className="mt-1 text-sm text-red-600">{errors.dob}</p>}
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-1">Marital Status</label>
        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="maritalStatus"
              value="Single"
              checked={formData.maritalStatus === "Single"}
              onChange={handleInputChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">Single</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="maritalStatus"
              value="Married"
              checked={formData.maritalStatus === "Married"}
              onChange={handleInputChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">Married</span>
          </label>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-1">Email Address</label>
        <input
          type="email"
          value={formData.email}
          readOnly
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-1">Contact Number</label>
        <input
          type="text"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        {errors.contactNumber && <p className="mt-1 text-sm text-red-600">{errors.contactNumber}</p>}
      </div>
      
      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-1">Nationality</label>
        <input
          type="text"
          name="nationality"
          value={formData.nationality}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        {errors.nationality && <p className="mt-1 text-sm text-red-600">{errors.nationality}</p>}
      </div>
      
      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-1">Home Address</label>
        <input
          type="text"
          name="homeAddress"
          value={formData.homeAddress}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        {errors.homeAddress && <p className="mt-1 text-sm text-red-600">{errors.homeAddress}</p>}
      </div>
      
      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-1">Emergency Number</label>
        <input
          type="text"
          name="emergencyNumber"
          value={formData.emergencyNumber}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        {errors.emergencyNumber && <p className="mt-1 text-sm text-red-600">{errors.emergencyNumber}</p>}
      </div>
      
      <button 
        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        type="submit"
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Continue'}
      </button>
    </form>
  </div>
);

const JobDetailsForm = ({ onSwitch, formData, handleInputChange, onSubmit, errors, loading }) => (
  <div className="w-full max-w-md">
    <h2 className="text-xl font-semibold text-gray-800 mb-6">Set up your Profile</h2>
    <h3 className="text-md font-medium text-gray-700 mb-4">Job Details</h3>
    
    {errors.form && (
      <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
        {errors.form}
      </div>
    )}
    
    <form onSubmit={onSubmit}>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Employee ID</label>
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {errors.employeeId && <p className="mt-1 text-sm text-red-600">{errors.employeeId}</p>}
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Job Title</label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {errors.jobTitle && <p className="mt-1 text-sm text-red-600">{errors.jobTitle}</p>}
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-1">Department</label>
        <select
          name="department"
          value={formData.department}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Department</option>
          <option>Design and Marketing</option>
          <option>Management</option>
          <option>Development</option>
          <option>Human Resources</option>
          <option>Finance</option>
        </select>
        {errors.department && <p className="mt-1 text-sm text-red-600">{errors.department}</p>}
      </div>
      
      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-1">Manager</label>
        <input
          type="text"
          name="manager"
          value={formData.manager}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        {errors.manager && <p className="mt-1 text-sm text-red-600">{errors.manager}</p>}
      </div>
      
      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-1">Employment Type</label>
        <select
          name="employmentType"
          value={formData.employmentType}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option>Full Time</option>
          <option>Part Time</option>
          <option>Contract</option>
          <option>Internship</option>
        </select>
        {errors.employmentType && <p className="mt-1 text-sm text-red-600">{errors.employmentType}</p>}
      </div>
      
      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-1">Work Email</label>
        <input
          type="email"
          name="workEmail"
          value={formData.workEmail}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        {errors.workEmail && <p className="mt-1 text-sm text-red-600">{errors.workEmail}</p>}
      </div>
      
      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-1">Date of Joining</label>
        <input
          type="date"
          name="dateOfJoining"
          value={formData.dateOfJoining}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        {errors.dateOfJoining && <p className="mt-1 text-sm text-red-600">{errors.dateOfJoining}</p>}
      </div>
      
      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-1">Work Location</label>
        <select
          name="workLocation"
          value={formData.workLocation}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option>Remote</option>
          <option>Office</option>
          <option>Hybrid</option>
        </select>
        {errors.workLocation && <p className="mt-1 text-sm text-red-600">{errors.workLocation}</p>}
      </div>
      
      <button 
        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        type="submit"
        disabled={loading}
      >
        {loading ? 'Completing...' : 'Complete Registration'}
      </button>
      
      <div className="mt-8 p-4 text-center bg-gray-50 rounded-md">
        <p className="text-sm text-gray-600 italic mb-2">
          "The Employee Management System has completely transformed our workflow. 
          Everything we need is in one place, saving us time and increasing productivity."
        </p>
        <div className="font-medium">Moses Daniel</div>
        <div className="text-xs text-gray-500">Design & Marketing</div>
      </div>
    </form>
  </div>
);

export default AuthLayout;