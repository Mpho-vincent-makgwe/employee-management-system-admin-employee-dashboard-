"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const AuthLayout = () => {
  const router = useRouter();
  const [step, setStep] = useState("login"); // login | signup | otp | personal | job
  const [userType, setUserType] = useState("Employee");
  const [formData, setFormData] = useState({
    firstName: "Paul",
    lastName: "Ironfoulor",
    gender: "Male",
    dob: "1/01/2025",
    maritalStatus: "Single",
    email: "PaulIronfoulor@gmail.com",
    contactNumber: "+234 9038299205",
    nationality: "Nigeria",
    homeAddress: "25 Providence Street, Leikki, Lagos",
    emergencyNumber: "+234 863659276",
    employeeId: "BD6789DD",
    jobTitle: "Product Designer",
    department: "Design and Marketing",
    manager: "Moses Daniel",
    employmentType: "Full Time",
    workEmail: "Paul.toribuler@ethuku.com",
    dateOfJoining: "2nd April 2024",
    workLocation: "Remotely"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Toggle between admin and employee dashboard for development
    const isAdmin = Math.random() > 0.5;
    router.push(isAdmin ? "/admin/dashboard" : "/employee/dashboard");
  };

  const renderRightContent = () => {
    switch (step) {
      case "login":
        return <LoginForm onSwitch={setStep} onSubmit={handleLoginSubmit} />;
      case "signup":
        return <SignupForm onSwitch={setStep} userType={userType} setUserType={setUserType} />;
      case "otp":
        return <OtpForm onSwitch={setStep} email={formData.email} />;
      case "personal":
        return <PersonalDetailsForm onSwitch={setStep} formData={formData} handleInputChange={handleInputChange} />;
      case "job":
        return <JobDetailsForm onSwitch={setStep} formData={formData} handleInputChange={handleInputChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gray-50">
      {/* Left Side - Consistent across all screens */}
      <div className="bg-[#3730a3] rounded-md text-white flex flex-col justify-center items-center p-8 rounded-l-md">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Manage your work, time, and profile<br />
          all in one place—simple, fast, and secure.
        </h1>
        
        {/* Dashboard image placeholder */}
        <div className="w-full max-w-xs h-48 bg-indigo-700 rounded-lg mt-4 flex items-center justify-center text-indigo-200">
          [Dashboard Preview]
        </div>
        
        {/* Centered Testimonial */}
        <div className="mt-8 p-6  bg-[#312e81] text-center max-w-md">
          <p className="mb-4 italic">
            "The Employee Management System has completely changed their meaning any week. Last week is required time, 
            and when any broadcasts all in one place, it's like every track each longer the updated effect having to 
            close up for a transaction. Nextday, it takes me to reach the every week."
          </p>
          <div className="font-medium">Motor Portal</div>
          <div className="text-indigo-200 text-xs">Design & Marketing</div>
        </div>
      </div>

      {/* Right Side - Changes based on step */}
      <div className="flex  p-8 bg-white rounded-r-md">
        {renderRightContent()}
      </div>
    </div>
  );
};

// Updated LoginForm with onSubmit
const LoginForm = ({ onSwitch, onSubmit }) => (
  <div className="w-full max-w-md">
    <h2 className="text-2xl font-semibold text-[#3730a3] mb-2">Let's Get Started</h2>
    <p className="text-gray-600 mb-6">Login as an Admin / Employee</p>
    
    <form onSubmit={onSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
        <input
          type="email"
          placeholder="Enter email address"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          type="password"
          placeholder="Enter password"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
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
        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-4"
      >
        Login
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

// Signup Screen - Matches the signup image exactly
const SignupForm = ({ onSwitch, userType, setUserType }) => (
  <div className="w-full max-w-md">
    <h2 className="text-2xl font-semibold text-[#3730a3] mb-2">Let's Get Started</h2>
    <p className="text-gray-600 mb-6">Signup as an Admin / Employee</p>
    
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
        placeholder="Enter email address"
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
    
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
      <input
        type="password"
        placeholder="Enter password"
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
    
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
      <input
        type="password"
        placeholder="Confirm password"
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
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
      className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-4"
      onClick={() => onSwitch("otp")}
    >
      Next
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
  </div>
);

// OTP Screen - Matches the OTP verification image exactly
const OtpForm = ({ onSwitch, email }) => (
  <div className="w-full max-w-md">
    <h1 className="text-2xl font-semibold text-[#3730a3] mb-2">Manage your work, time, and profile</h1>
    <p className="text-gray-600 mb-6">all in one place—simple, fast, and secure.</p>
    
    <h2 className="text-xl font-semibold text-gray-800 mb-4">Verify OTP</h2>
    <p className="text-sm text-gray-600 mb-6">
      Enter the OTP sent to your email {email || 'poultronibulor@gmail.com'}
    </p>
    
    <div className="grid grid-cols-4 gap-3 mb-8">
      {[1, 2, 3, 4].map((i) => (
        <input
          key={i}
          type="text"
          maxLength="1"
          className="w-full p-3 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      ))}
    </div>
    
    <button 
      className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-6"
      onClick={() => onSwitch("personal")}
    >
      Submit
    </button>
    
    <div className="p-4 bg-gray-50 rounded-md">
      <p className="text-sm text-gray-600 italic">
        "The Employee Management System has completely changed their meaning any week. Last week is required time, 
        and when any transfusion all is one place, it's too, every cause, and longer are updated without having 
        to close up for a transactive identity. It tries not to reach the every need."
      </p>
    </div>
  </div>
);

// Personal Details Screen - Matches the profile setup image exactly
const PersonalDetailsForm = ({ onSwitch, formData, handleInputChange }) => (
  <div className="w-full max-w-md">
    <h1 className="text-2xl font-semibold text-[#3730a3] mb-2">Manage your work, time, and profile</h1>
    <p className="text-gray-600 mb-6">all in one place—simple, fast, and secure.</p>
    
    <h2 className="text-xl font-semibold text-gray-800 mb-6">Set up your Profile</h2>
    <h3 className="text-md font-medium text-gray-700 mb-4">Personal Details</h3>
    
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
      </div>
    </div>
    
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block text-sm text-gray-600 mb-1">Gender</label>
        <input
          type="text"
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">DOB</label>
        <input
          type="text"
          name="dob"
          value={formData.dob}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
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
    </div>
    
    <button 
      className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      onClick={() => onSwitch("job")}
    >
      Continue
    </button>
  </div>
);

// Job Details Screen - Matches the job details image exactly
const JobDetailsForm = ({ onSwitch, formData, handleInputChange }) => (
  <div className="w-full max-w-md">
    <h1 className="text-2xl font-semibold text-[#3730a3] mb-2">Manage your work, time, and profile</h1>
    <p className="text-gray-600 mb-6">all in one place—simple, fast, and secure.</p>
    
    <h2 className="text-xl font-semibold text-gray-800 mb-6">Set up your Profile</h2>
    <h3 className="text-md font-medium text-gray-700 mb-4">Job Details</h3>
    
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
        <option>Design and Marketing</option>
        <option>Management</option>
        <option>Development</option>
      </select>
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
    </div>
    
    <div className="mb-4">
      <label className="block text-sm text-gray-600 mb-1">Employment Type</label>
      <input
        type="text"
        name="employmentType"
        value={formData.employmentType}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      />
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
    </div>
    
    <div className="mb-4">
      <label className="block text-sm text-gray-600 mb-1">Date of Joining</label>
      <input
        type="text"
        name="dateOfJoining"
        value={formData.dateOfJoining}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      />
    </div>
    
    <div className="mb-6">
      <label className="block text-sm text-gray-600 mb-1">Work Location</label>
      <input
        type="text"
        name="workLocation"
        value={formData.workLocation}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      />
    </div>
    
    <button className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
      Complete Registration
    </button>
    
    <div className="mt-8 p-4 text-center bg-gray-50 rounded-md">
      <p className="text-sm text-gray-600 italic mb-2">
        "The Employee Management System has completely changed their meaning any work I can deal in, 
        request time, and view any broadcasts all in one place. In this, every issue was larger me 
        against ethical having to close up the transaction Monday. It took me to reach the every week."
      </p>
      <div className="font-medium">Moses Daniel</div>
      <div className="text-xs text-gray-500">Design & Marketing</div>
    </div>
  </div>
);

export default AuthLayout;