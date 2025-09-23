"use client";

import React, { useState } from "react";
import { useUser } from "@/context/UserContext";
import CustomButton from "../../ui/CustomButton";

const ProfileEdit = ({ onSave, onCancel }) => {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    picture: user.profile.picture || "",
    personal: { ...user.profile.personal },
    job: { ...user.profile.job },
  });

  // Handle input changes
  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  // Handle picture change
  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // For preview purposes
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, picture: imageUrl }));
    }
  };

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-4 bg-white rounded-lg p-[68px]">
        {/* Profile Picture */}
        <div className="col-span-1 flex flex-col items-center">
          <img
            src={
              formData.picture ||
              "https://placehold.co/140x140/cccccc/333333?text=Profile"
            }
            alt={`${formData.personal.firstName} ${formData.personal.lastName}`}
            className="w-[180px] h-[180px] rounded-full object-cover border-4 border-indigo-200 mb-4"
          />
          <label className="text-sm font-medium cursor-pointer">
            Change Picture
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePictureChange}
            />
          </label>
        </div>

        {/* Editable Fields */}
        <div className="col-span-1 md:col-span-3 pl-[29px] border-l-[0.6px] border-[#D0D5DD] opacity-100">
          {/* Action Buttons */}
          <div className="flex gap-2 mb-4 justify-end items-start">
            <CustomButton
              text="Save"
              variant="primary"
              size="medium"
              onClick={() => onSave?.(formData)}
            />
            <CustomButton
              text="Cancel"
              variant="outline"
              size="medium"
              onClick={onCancel}
            />
          </div>

          {/* Personal Details */}
          <h2 className="text-lg font-medium text-[#4F46E5] mb-4 mt-1">
            Personal Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-7">
            {Object.entries(formData.personal).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {key.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) =>
                    handleChange("personal", key, e.target.value)
                  }
                  className="h-[50px] w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-[#4F46E5]"
                />
              </div>
            ))}
          </div>

          {/* Job Details */}
          <h2 className="text-lg font-medium text-[#4F46E5] mb-4">
            Job Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(formData.job).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {key.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleChange("job", key, e.target.value)}
                  className="h-[50px] w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-[#4F46E5]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
