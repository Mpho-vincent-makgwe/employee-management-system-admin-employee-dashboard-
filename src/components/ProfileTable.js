import React from "react";
import Image from "next/image";

const ProfileTable = ({
  profilePicture,
  personalDetails,
  jobDetails,
  theme = {
    primaryColor: "text-indigo-600",
    labelColor: "text-gray-600",
    borderColor: "border-gray-200",
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
          <div className="w-32 h-32 bg-gray-300 rounded-full mb-2"></div>
        )}
      </div>
    );
  };

  const renderDetailsSection = (title, details) => {
    if (!details || details.length === 0) return null;

    return (
      <div className="space-y-6">
        <h2 className={`text-xl font-semibold ${theme.primaryColor} mb-4`}>
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {details.map((detail, index) => (
            <div key={index} className="flex flex-col gap-1">
              <label className={`text-sm font-medium ${theme.labelColor}`}>
                {detail.label}
              </label>
              <div
                className={`
                  h-12
                  w-full
                  px-4
                  rounded
                  border ${theme.borderColor}
                  bg-white text-gray-800 flex items-center
                `}
              >
                {detail.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg">
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