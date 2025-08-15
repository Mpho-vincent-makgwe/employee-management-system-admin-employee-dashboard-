'use client'

import { useState, useMemo } from "react";
import Table from "@/components/Table";
import { FaSearch } from "react-icons/fa";
import birthdayData from "@/data/employeeData/birthdayData";


const columns = [
  { key: "name", title: "Name" },
  { key: "dob", title: "D.O.B" },
  { key: "role", title: "Role" },
  { key: "employmentType", title: "Employment Type" },
  { key: "dateJoined", title: "Date Joined" },
  { key: "dayOfWeek", title: "Day of the week" },
];

export default function Birthdays() {
   const [roleFilter, setRoleFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
  
    const uniqueRoles = useMemo(() => {
      const roles = new Set(birthdayData.map((item) => item.role));
      return Array.from(roles);
    }, []);
  
    const uniqueStatuses = useMemo(() => {
      const statuses = new Set(birthdayData.map((item) => item.status));
      return Array.from(statuses);
    }, []);
  
    const filteredData = useMemo(() => {
      let result = [...birthdayData];
  
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        result = result.filter((item) =>
          columns.some((col) => {
            const value = item[col.key];
            return (
              value !== undefined &&
              value !== null &&
              String(value).toLowerCase().includes(term)
            );
          })
        );
      }
  
      if (roleFilter) {
        result = result.filter((item) => item.role === roleFilter);
      }
  
      if (statusFilter) {
        result = result.filter((item) => item.status === statusFilter);
      }
  
      return result;
    }, [searchTerm, roleFilter, statusFilter]);
  return (
    <div className="p-4">
      <div className="space-y-2">
        <h2 className="text-black  text-2xl">Upcoming Birthday's</h2>
        <p className="text-black">View all employee birthdays</p>
      </div>
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2 mb-4">
        {/* Search Input - Left */}
        <div className="flex flex-col gap-1 w-[669px] pt-5">
          <span className="text-sm text-black"> </span>
          <div className="relative">
            <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="text"
              className="w-[669px] h-[51px] pl-10 pr-3 py-3 bg-white border border-gray-300 rounded-[4px] text-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Search employees"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      
        {/* Filters - Right */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Role Filter */}
          <div className="flex flex-col gap-1 w-[193px]">
            <span className="text-sm text-black">Filter by Role</span>
            <select
              className="w-[193px] h-[50px] px-3 py-3 bg-white border border-gray-300 rounded-[4px] text-sm text-black placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="">All Roles</option>
              {uniqueRoles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
      
          {/* Status Filter */}
          <div className="flex flex-col gap-1 w-[193px]">
            <span className="text-sm text-black">Filter by Status</span>
            <select
              className="w-[193px] h-[50px] px-3 py-3 bg-white border border-gray-300 rounded-[4px] text-sm text-black placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              {uniqueStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
     <Table
        columns={columns}
        data={filteredData.map((employee) => ({
          ...employee,
          action: { text: "View" },
        }))}
        
        limit={5}
        enablePagination={true}
        stripedRows={true}
        sortable={true}
        // Remove these props as they're now handled in the parent component
        // showEmployeeCount={true}
        // showFilters={true}
        // showSearch={true}
        // roleFilter={roleFilter}
        // statusFilter={statusFilter}
        // searchTerm={searchTerm}
      />
    </div>
  );
}
