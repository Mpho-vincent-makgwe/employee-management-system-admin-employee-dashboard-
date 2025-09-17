"use client";
import { useState } from "react";
import CompanyInfo from "@/components/EmployeeComponents/CompanyInfo";
import ForgotPassword from "@/components/AdminComponents/ForgotPassword";
import ProfileView from "@/components/EmployeeComponents/ProfileView";
import Heading from "@/components/Heading";
import Roles from "@/components/EmployeeComponents/Roles";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("Profile");

  const tabs = [
    { label: "Profile", value: "Profile" },
    { label: "Company Info", value: "CompanyInfo" },
    { label: "Roles", value: "Roles" },
  ];

  return (
    <div className="ml-[25px]">
      <Heading title="Settings" subtitle="Manage your account settings" />

      <div className="flex border-b border-[#B8B8B8] mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-2 text-md font-sm focus:outline-none ${
              activeTab === tab.value
                ? "text-[#4F46E5] border-b-2 border-[#4F46E5]"
                : "text-[#2C2C2E] hover:text-[#4F46E5]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {activeTab === "Profile" && <ProfileView />}
        {activeTab === "CompanyInfo" && <CompanyInfo />}
        {activeTab === "Roles" && <Roles />}
      </div>
    </div>
  );
}
