import React from "react";
import DetailField from "./DetailField";

const DirectoryProfileTable = ({
  profilePicture,
  personalDetails,
  jobDetails,
}) => {
  const renderProfilePicture = () => {
    if (!profilePicture) return null;

    return (
      <div className="col-span-1 flex flex-col items-center">
        <img
          src={
            profilePicture.image ||
            "https://placehold.co/140x140/cccccc/333333?text=Profile"
          }
          alt="Profile"
          className="w-[180px] h-[180px] rounded-full object-cover border-4 border-indigo-200 mb-4"
        />
      </div>
    );
  };

  const renderDetailsSection = (title, details) => {
    if (!details || details.length === 0) return null;

    return (
      <div>
        <h2 className="text-md text-[#4F46E5] mb-4 mt-1">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-7">
          {details.map((detail, index) => (
            <DetailField
              key={index}
              label={detail.label}
              value={detail.value}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 bg-white rounded-lg p-[68px] gap-8">
      {/* Profile Picture */}
      {renderProfilePicture()}

      {/* Details */}
      <div className="col-span-1 md:col-span-3 pl-[29px] border-l-[0.6px] border-[#D0D5DD]">
        {/* Personal Details */}
        {renderDetailsSection("Personal Details", personalDetails)}

        {/* Job Details */}
        {renderDetailsSection("Job Details", jobDetails)}
      </div>
    </div>
  );
};

export default DirectoryProfileTable;
