"use client";

import { companyData } from "@/data/employeeData/companyData";
import birthdayData from "@/data/employeeData/birthdayData";
import DetailField from "./DetailField";

export default function CompanyInfo() {
  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-white rounded-lg p-[68px]">
        {/* Company Avatar & Identity */}
        <div className="col-span-1 flex flex-col items-center">
          <img
            src={
              birthdayData.profilePicture ||
              "https://placehold.co/140x140/cccccc/333333?text=birthdayData"
            }
            alt={`${birthdayData.firstName} ${birthdayData.lastName}`}
            className="w-[180px] h-[180px] rounded-full object-cover border-4 border-indigo-200 mb-4"
          />
          <p className="text-base text-[#4F46E5] ">{companyData.name}</p>
          <span className="text-sm text-gray-500">Company Profile</span>
        </div>

        {/* Company Info Sections */}
        <div className="col-span-1 md:col-span-3 pl-[29px] border-l-[0.6px] border-[#D0D5DD] opacity-100">
          <h2 className="text-lg font-medium text-[#4F46E5] mb-4 mt-1">
            Company Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-7">
            <DetailField label="Company Name" value={companyData.name} />
            <DetailField
              label="Company Email Address"
              value={companyData.email}
            />
            <DetailField label="Company Type" value={companyData.type} />
            <DetailField label="Staff Size" value={companyData.staffSize} />
            <DetailField label="Industry" value={companyData.industry} />
            <DetailField label="Founded" value={companyData.founded} />
            <DetailField label="Office Address" value={companyData.address} />
            <DetailField label="Office Address" value={companyData.address} />
          </div>

          <div className="md:col-span-1">
            <DetailField label="Specialities" value={companyData.specialties} />
          </div>
        </div>
      </div>
    </div>
  );
}
