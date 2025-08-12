"use client";

import Table from "@/components/Table"; 
import payrollData from "@/data/adminData/payrollData";
import { FaSearch } from "react-icons/fa";

const columns = [
  { key: "date", title: "Date" },
  { key: "name", title: "Name" },
  { key: "role", title: "Role" },
  { key: "basicSalary", title: "Basic Salary" },
  { key: "bonus", title: "Bonus" },
  { key: "deduction", title: "Deduction" },
  { key: "totalPayout", title: "Total Payout" },
  { key: "status", title: "Status" },
];

const PayrollPage = () => {
  return (
    <div className="p-6">

      <div className="flex flex-row sm:flex-row gap-4  ">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 bg-white border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Search employees"
             
                  />
                  <div className="flex items-center gap-2 w-1/2  ">
                  <span className="text-sm text-black whitespace-nowrap">
                    Filter by Role
                  </span>
                  <select
                    className="bg-white text-black border rounded-md px-3 py-1 text-sm w-full"
                    
                  >
                    <option value="">All Roles</option>
                  
                  </select>
                </div>
                 <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-sm text-black whitespace-nowrap">
                    Filter by Status
                  </span>
                  <select
                    className="border rounded-md px-3 py-1 text-sm w-full"
                    
                  >
                    <option value="">All Statuses</option>
                    
                  </select>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-sm text-black whitespace-nowrap">
                    Filter by Status
                  </span>
                  <select
                    className="border rounded-md px-3 py-1 text-sm w-full"
                  
                  >
                    <option value="">All Statuses</option>
                   
                  </select>
                </div>
                </div>
                
      <Table
        title="Payroll Summary"
        subtitle="Monthly payments for employees"
        columns={columns}
        data={payrollData}
        sortable
        stripedRows
        shadow
        rounded
        enablePagination
        statusColorMap={{
          Paid: "text-green-500",
          Pending: "text-yellow-500",
          Rejected: "text-red-500",
        }}
      />
    </div>
  );
};

export default PayrollPage;