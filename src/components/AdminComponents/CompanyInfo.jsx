'use client';

import { companyData } from '@/data/adminData/adminData';
import { adminData } from '@/data/adminData/adminData';
import DetailField from './DetailField';

export default function CompanyInfo() {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white rounded-lg p-6">
        {/* Company Avatar & Identity */}
        <div className="col-span-1 flex flex-col items-center">
         <img
                     src={
                       adminData.profilePicture ||
                       "https://placehold.co/140x140/cccccc/333333?text=adminData"
                     }
                     alt={`${adminData.firstName} ${adminData.lastName}`}
                     className="w-40 h-40 rounded-full object-cover border-4 border-indigo-200 mb-4"
                   />
          <p className="text-base font-semibold">{companyData.name}</p>
          <span className="text-sm text-gray-500">Company Profile</span>
        </div>

        {/* Company Info Sections */}
        <div className="col-span-1 md:col-span-2 pl-5 border-l border-gray-100">
          <h2 className="text-lg font-semibold text-indigo-600 mb-4">
            Company Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-7">
            <DetailField label="Company Name" value={companyData.name} />
            <DetailField label="Company Email Address" value={companyData.email} />
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
