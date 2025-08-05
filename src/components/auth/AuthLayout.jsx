// components/auth/AuthLayout.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { LeftSide } from "./LeftSide";
import { LoginForm } from "./LoginForm";
import { PersonalDetailsForm } from "./PersonalDetailsForm";
import { JobDetailsForm } from "./JobDetailsForm";
import { OTPForm } from "./OTPForm";

export const AuthLayout = () => {
  const router = useRouter();
  const { 
    login, 
    verifyOtp, 
    updateProfile,
    loading,
    user,
    checkAuth
  } = useUser();
  
  const [step, setStep] = useState("login"); // login | otp | personal | job
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

  const handleLoginSubmit = async (email, password) => {
    try {
      const result = await login(email, password);
      
      if (result.success) {
        setFormData(prev => ({ ...prev, email }));
        setStep("otp");
      } else {
        setErrors({ form: result.error });
      }
    } catch (error) {
      setErrors({ form: error.message });
    }
  };

  const handleOtpSubmit = async (otp) => {
    try {
      const result = await verifyOtp(formData.email, otp);
      
      if (result.success) {
        // Check if profile needs completion
        const needsProfileCompletion = !result.user.profile?.personal || !result.user.profile?.job;
        
        if (needsProfileCompletion) {
          setStep("personal");
          setFormData(prev => ({
            ...prev,
            email: result.user.email
          }));
        } else {
          router.push(result.user.role === 'Admin' ? '/admin/dashboard' : '/employee/dashboard');
        }
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
        router.push(result.user.role === 'Admin' ? '/admin/dashboard' : '/employee/dashboard');
      } else {
        setErrors({ form: result.error });
      }
    } catch (error) {
      setErrors({ form: error.message });
    }
  };

  // Check authentication state on mount
  useEffect(() => {
    const checkAuthState = async () => {
      await checkAuth();
    };
    checkAuthState();
  }, [checkAuth]);

  // Redirect if user is already authenticated with complete profile
  useEffect(() => {
    if (user && user.profile?.personal && user.profile?.job) {
      router.push(user.role === 'Admin' ? '/admin/dashboard' : '/employee/dashboard');
    }
  }, [user, router]);

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
      <LeftSide />
      
      <div className="flex p-8 max-w-[85%] bg-white">
        {step === "login" && (
          <LoginForm 
            onSubmit={handleLoginSubmit}
            errors={errors}
            loading={loading}
          />
        )}

        {step === "otp" && (
          <OTPForm
            email={formData.email}
            onSubmit={handleOtpSubmit}
            errors={errors}
            loading={loading}
          />
        )}

        {step === "personal" && (
          <PersonalDetailsForm
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
            handleSubmit={handlePersonalDetailsSubmit}
            loading={loading}
          />
        )}

        {step === "job" && (
          <JobDetailsForm
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
            handleSubmit={handleJobDetailsSubmit}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default AuthLayout;