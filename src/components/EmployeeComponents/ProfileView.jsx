"use client";

import { useParams } from "next/navigation";
import birthdayData from "@/data/employeeData/birthdayData";
import DetailField from "./DetailField";

export default function ProfileView() {
  const params = useParams();
  // params.id will be a string, so convert to number if your ids are numbers
  const id = Number(params.id);

  const employee = birthdayData.find((emp) => emp.id === id);

  if (!employee) {
    return <div className="p-6">Employee not found.</div>;
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white rounded-lg p-6">
        {/* Company Avatar & Identity */}
        <div className="col-span-1 flex flex-col items-center">
          <img
            src={
              birthdayData.profilePicture ||
              "https://placehold.co/140x140/cccccc/333333?text=birthdayData"
            }
            alt={`${birthdayData.firstName} ${birthdayData.lastName}`}
            className="w-30 h-30 rounded-full object-cover border-4 border-indigo-200 mb-4"
          />
          <p className="text-base font-semibold">{birthdayData.name}</p>
          <span className="text-sm text-gray-500">Company Profile</span>
        </div>

        {/* Company Info Sections */}
        <div className="col-span-1 md:col-span-2 pl-5 border-l border-gray-100">
          <h2 className="text-lg font-semibold text-indigo-600 mb-4">
            Company Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-7">
            <DetailField label="Company Name" value={birthdayData.name} />
            <DetailField
              label="Company Email Address"
              value={birthdayData.email}
            />
            <DetailField label="First Name" value={birthdayData.type} />
            <DetailField label="Last Name" value={birthdayData.staffSize} />
            <DetailField label="Gender" value={birthdayData.industry} />
            <DetailField label="DOB" value={birthdayData.founded} />
            <DetailField label="Marital Status" value={birthdayData.address} />
            <DetailField label="Nationality" value={birthdayData.address} />
            <DetailField label="Email Address" value={birthdayData.industry} />
            <DetailField label="Home Address" value={birthdayData.founded} />
            <DetailField label="Contact Number" value={birthdayData.address} />
            <DetailField
              label="Emergency Number"
              value={birthdayData.address}
            />
          </div>

          <div className="md:col-span-1">
            <DetailField
              label="Specialities"
              value={birthdayData.specialties}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
