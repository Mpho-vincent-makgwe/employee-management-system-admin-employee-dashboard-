"use client";

import React, { useState } from "react";
import DetailField from "../../ui/DetailField";
import { useUser } from "@/context/UserContext";
import CustomButton from "../../ui/CustomButton";
import ProfileEdit from "./ProfileEdit";

const ProfileView = () => {
  const { user, loading } = useUser();
  const [isEditing, setIsEditing] = useState(false);

  if (loading) return <div>Loading profile...</div>;
  if (!user || !user.profile) return <div>No profile data found.</div>;

  const handleSave = (updatedData) => {
    // TODO: API call to save `updatedData`
    console.log("Saving profile:", updatedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <ProfileEdit onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 bg-white rounded-lg p-[68px]">
          {/* Profile Picture */}
          <div className="col-span-1 flex flex-col items-center">
            <img
              src={
                user.profile.picture ||
                "https://placehold.co/140x140/cccccc/333333?text=Profile"
              }
              alt={`${user.profile.personal.firstName} ${user.profile.personal.lastName}`}
              className="w-[180px] h-[180px] rounded-full object-cover border-4 border-indigo-200 mb-4"
            />
          </div>

          {/* Details */}
          <div className="col-span-1 md:col-span-3 pl-[29px] border-l-[0.6px] border-[#D0D5DD]">
            {/* Edit Button */}
            <div className="flex justify-end items-start w-full mb-4">
              <CustomButton
                text="Edit"
                onClick={() => setIsEditing(true)}
                variant="primary"
                size="medium"
                className="h-[50px] sm:w-[100px] lg:w-[157px]"
              />
            </div>

            {/* Personal Details */}
            <h2 className="text-lg font-medium text-[#4F46E5] mb-4 mt-1">
              Personal Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-7">
              <DetailField
                label="First Name"
                value={user.profile.personal.firstName}
              />
              <DetailField
                label="Last Name"
                value={user.profile.personal.lastName}
              />
              <DetailField
                label="Gender"
                value={user.profile.personal.gender}
              />
              <DetailField label="DOB" value={user.profile.personal.dob} />
              <DetailField
                label="Marital Status"
                value={user.profile.personal.maritalStatus}
              />
              <DetailField
                label="Nationality"
                value={user.profile.personal.nationality}
              />
              <DetailField label="Email Address" value={user.email} />
              <DetailField
                label="Home Address"
                value={user.profile.personal.homeAddress}
              />
              <DetailField
                label="Contact Number"
                value={user.profile.personal.contactNumber}
              />
              <DetailField
                label="Emergency Number"
                value={user.profile.personal.emergencyNumber}
              />
            </div>

            {/* Job Details */}
            <h2 className="text-lg font-medium text-[#4F46E5] mb-4">
              Job Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DetailField
                label="Employee ID"
                value={user.profile.job.employeeId}
              />
              <DetailField
                label="Job Title"
                value={user.profile.job.jobTitle}
              />
              <DetailField
                label="Department"
                value={user.profile.job.department}
              />
              <DetailField label="Manager" value={user.profile.job.manager} />
              <DetailField
                label="Employment Type"
                value={user.profile.job.employmentType}
              />
              <DetailField
                label="Date of Joining"
                value={user.profile.job.dateOfJoining}
              />
              <DetailField
                label="Work Email"
                value={user.profile.job.workEmail}
              />
              <DetailField
                label="Work Location"
                value={user.profile.job.workLocation}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileView;
