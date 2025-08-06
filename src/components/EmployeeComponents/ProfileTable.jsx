"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ProfileEdit from "./ProfileEdit";
import { useState } from "react";

const ProfileTable = ({
  profilePicture,
  personalDetails,
  jobDetails,
  editable = false,
  onSave,
  showActionButton = true,
  theme = {
    primaryColor: "indigo-700",
    labelColor: "gray-600",
    borderColor: "gray-300",
  },
}) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(editable);

  // Handle action button click
  const handleActionClick = () => {
    if (isEditing) {
      onSave?.(); // Call save
      setIsEditing(false); // Back to view mode
    } else {
      setIsEditing(true); // Switch to edit mode
    }
  };

  const renderProfilePicture = () => {
    if (!profilePicture) return null;

    return (
      <div className="flex flex-col items-center w-1/4 min-w-[130px]">
        {profilePicture.image ? (
          <Image
            src={profilePicture.image}
            alt="Profile"
            className="w-32 h-32 rounded-full mb-2 object-cover"
            width={128}
            height={128}
          />
        ) : (
          <div className="w-32 h-32 bg-gray-300 rounded-full mb-2"></div>
        )}
        {isEditing && profilePicture.changeText && (
          <button className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline">
            {profilePicture.changeText}
          </button>
        )}
      </div>
    );
  };

  const renderDetailsSection = (title, details) => {
    if (!details || details.length === 0) return null;

    return (
      <div className="space-y-4">
        <h2 className={`text-xl font-semibold text-${theme.primaryColor}`}>
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {details.map((detail, index) => (
            <div key={index} className="flex flex-col gap-[5px] w-[343px]">
              <label className={`text-sm font-medium text-${theme.labelColor}`}>
                {detail.label}
              </label>

              {isEditing ? (
                <input
                  type="text"
                  defaultValue={detail.value}
                  className={`
                    h-[50px] w-full px-[16px] rounded-[4px]
                    border border-${theme.borderColor}
                    bg-white text-gray-800
                    focus:ring focus:ring-${theme.primaryColor}
                    focus:border-transparent
                  `}
                />
              ) : (
                <div
                  className={`
                    h-[50px] w-full px-[16px] rounded-[4px]
                    border border-${theme.borderColor}
                    bg-white text-gray-800 flex items-center
                  `}
                >
                  {detail.value}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white p-6 shadow-sm rounded text-indigo-600">
      {/* Top-right Action Button */}
      {showActionButton && (
        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={handleActionClick}
            className={`bg-${theme.primaryColor} text-white px-6 py-2 rounded-md hover:opacity-90 transition`}
          >
            {isEditing ? "Save" : "Edit Profile"}
          </button>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8">
        {renderProfilePicture()}
        <div className="flex-1 space-y-10">
          {renderDetailsSection("Personal Details", personalDetails)}
          {renderDetailsSection("Job Details", jobDetails)}
        </div>
      </div>
    </div>
  );
};

export default ProfileTable;
