"use client";

import React from "react";
// import Link from 'next/Link';
import Image from "next/image";

const ProfileTable = ({
  profilePicture,
  personalDetails,
  jobDetails,
  editable = false, // Default to false if not provided
  theme = {
    primaryColor: "#4F46E5",
    labelColor: "#2C2C2E",
    borderColor: "#D0D5DD",
  },
}) => {
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
          //   <Link to={`/profile/edit'`}>Change Picture</Link>
          <div className="w-32 h-32 bg-gray-300 rounded-full mb-2"></div>
        )}
        {editable && profilePicture.changeText && (
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
            <div
              key={index}
              className="flex flex-col gap-[5px] w-[343px]" // Horizontal flow with 5px gap
            >
              <label className={`text-sm font-medium text-${theme.labelColor}`}>
                {detail.label}
              </label>

              {editable ? (
                <input
                  type="text"
                  defaultValue={detail.value}
                  className={`
        h-[50px]
        w-full
        px-[16px]
        rounded-[4px]
        border border-${theme.borderColor}
        bg-white text-gray-800
        focus:ring focus:ring-${theme.primaryColor}
        focus:border-transparent
      `}
                />
              ) : (
                <div
                  className={`
        h-[50px]
        w-full
        px-[16px]
        rounded-[4px]
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
