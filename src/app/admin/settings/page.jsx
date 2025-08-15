'use client'
import { useState } from "react";
import CompanyInfo from "@/components/AdminComponents/CompanyInfo";
import Profile from "@/components/AdminComponents/Profile";
import ForgotPassword from "@/components/AdminComponents/ForgotPassword";
import Roles from "@/components/AdminComponents/Roles";
import UserManagement from "@/components/AdminComponents/UserManagement";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("Profile");

  const tabs = [
    { label: "Profile", value: "Profile" },
    { label: "Company Info", value: "CompanyInfo" },
    { label: "Password", value: "ForgotPassword" },
    { label: "Roles", value: "Roles" },
    { label: "User Management", value: "UserManagement" },
  ];

  return (
    <div className="w-full">
    
      <div className="mb-6 space-y-2">
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <p className="text-sm text-gray-600">
          Manage system preferences and configurations.
        </p>
      </div>

     
      <div className="flex border-b border-gray-200 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-2 text-sm font-medium focus:outline-none ${
              activeTab === tab.value
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

     
      <div className="mt-4  ">
        {activeTab === "Profile" && <Profile />}
        {activeTab === "CompanyInfo" && <CompanyInfo />}
        {activeTab === "ForgotPassword" && <ForgotPassword />}
        {activeTab === "Roles" && <Roles />}
        {activeTab === "UserManagement" && <UserManagement />}
      </div>
    </div>
  );
}
