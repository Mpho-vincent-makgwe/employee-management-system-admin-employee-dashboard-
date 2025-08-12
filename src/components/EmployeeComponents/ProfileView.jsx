"use client";

import React from "react";
import { Plus } from "lucide-react";
import CustomButton from "../Buttons/CustomButton";
import ProfileTable from "./ProfileTable";
import Heading from "../Heading";
import { useUser } from "@/context/UserContext";

const ProfileView = () => {
  const { user, loading } = useUser();

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (!user || !user.profile) {
    return <div>No profile data found.</div>;
  }
  const personalDetails = [
    { label: "First Name", value: user.profile.personal.firstName },
    { label: "Last Name", value: user.profile.personal.lastName },
    { label: "Gender", value: user.profile.personal.gender },
    { label: "DOB", value: user.profile.personal.dob },
    { label: "Marital Status", value: user.profile.personal.maritalStatus },
    { label: "Nationality", value: user.profile.personal.nationality },
    { label: "Email Address", value: user.email },
    { label: "Home Address", value: user.profile.personal.homeAddress },
    { label: "Contact Number", value: user.profile.personal.contactNumber },
    { label: "Emergency Number", value: user.profile.personal.emergencyNumber },
  ];

  const jobDetails = [
    { label: "Employee I.D", value: user.profile.job.employeeId },
    { label: "Job Title", value: user.profile.job.jobTitle },
    { label: "Department", value: user.profile.job.department },
    { label: "Manager", value: user.profile.job.manager },
    { label: "Employment Type", value: user.profile.job.employmentType },
    { label: "Date of Joining", value: user.profile.job.dateOfJoining },
    { label: "Work Email", value: user.profile.job.workEmail },
    { label: "Work Location", value: user.profile.job.workLocation },
  ];

  return (
    <div className="bg-gray-100">
      <div className="flex justify-between items-center">
        <div>
          {/* <Heading
            title="Profile"
            subtitle="Manage your personal information and account settings."
            // position={true}
          /> */}
        </div>
      </div>

      <ProfileTable
        profilePicture={{
          changeText: "Change Picture",
          image: "/profilepic.png",
        }}
        personalDetails={personalDetails}
        jobDetails={jobDetails}
        editable={false} // Set to true when you want editing enabled
        theme={{
          primaryColor: "indigo-700",
          labelColor: "gray-600",
          borderColor: "gray-300",
        }}
      />
    </div>
  );
};

export default ProfileView;
