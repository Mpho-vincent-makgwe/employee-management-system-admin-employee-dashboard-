"use client";

import Link from "next/link";
import { adminData } from "@/data/adminData/adminData";
import DetailField from "../DetailField";

export default function Profile() {
  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white rounded-lg p-6">
        <div className="col-span-1 flex flex-col items-center">
          <img
            src={
              adminData.profilePicture ||
              "https://placehold.co/140x140/cccccc/333333?text=adminData"
            }
            alt={`${adminData.firstName} ${adminData.lastName}`}
            className="w-40 h-40 rounded-full object-cover border-4 border-indigo-200 mb-4"
          />
          <button className=" text-black text-sm font-medium">
            Change Picture
          </button>
        </div>

        <div className="col-span-1 md:col-span-2 pl-5 border-l border-gray-100">
          <h2 className="text-lg font-semibold text-indigo-600 mb-4">
            Personal Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-7">
            <DetailField label="First Name" value={adminData.firstName} />
            <DetailField label="Last Name" value={adminData.lastName} />
            <DetailField label="Gender" value={adminData.gender} />
            <DetailField label="DOB" value={adminData.dob} />
            <DetailField
              label="Marital Status"
              value={adminData.maritalStatus}
            />
            <DetailField label="Nationality" value={adminData.nationality} />
            <DetailField label="Email Address" value={adminData.email} />
            <DetailField label="Home Address" value={adminData.homeAddress} />
            <DetailField
              label="Contact Number"
              value={adminData.contactNumber}
            />
            <DetailField
              label="Emergency Number"
              value={adminData.emergencyNumber}
            />
          </div>

          <h2 className="text-lg font-semibold text-indigo-600 mb-4">
            Job Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DetailField label="Employee ID" value={adminData.employeeId} />
            <DetailField label="Manager" value={adminData.manager} />
            <DetailField
              label="Employment Type"
              value={adminData.employmentType}
            />
            <DetailField
              label="Date of Joining"
              value={adminData.dateOfJoining}
            />
            <DetailField label="Work Email" value={adminData.workEmail} />
            <DetailField label="Work Location" value={adminData.workLocation} />
          </div>
        </div>
      </div>
    </div>
  );
}
