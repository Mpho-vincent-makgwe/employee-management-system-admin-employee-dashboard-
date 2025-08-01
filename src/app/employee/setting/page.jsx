"use client";
import { useState } from "react";
import CompanyInfo from "@/components/EmployeeComponents/CompanyInfo";
import ForgotPassword from "@/components/AdminComponents/ForgotPassword";
import ProfileView from "@/components/EmployeeComponents/ProfileView";
import Heading from "@/components/Heading";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("Profile");

  const tabs = [
    { label: "Profile", value: "Profile" },
    { label: "Company Info", value: "CompanyInfo" },
    { label: "Roles", value: "Roles" },
  ];

  return (
    <div className="w-full">
      <Heading title="Settings" subtitle="Manage your account settings" />

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

      <div className="mt-4">
        {activeTab === "Profile" && <ProfileView />}
        {activeTab === "CompanyInfo" && <CompanyInfo />}
      </div>
    </div>
  );
}
