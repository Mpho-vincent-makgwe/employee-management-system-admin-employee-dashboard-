"use client";

import { useState, useMemo } from "react";
import Table from "@/components/Table";
import { employeeData } from "@/data/adminData/employeeData";
import { FaSearch } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";

const columns = [
  { key: "name", title: "Name" },
  { key: "role", title: "Role" },
  { key: "employeeType", title: "Employee Type" },
  { key: "status", title: "Status" },
  { key: "dateJoined", title: "Date Joined" },
  { key: "action", title: "Action" },
];

const statusColorMap = {
  Active: "text-green-500",
  "On leave": "text-yellow-500",
  Suspended: "text-red-500",
};

export default function EmployeeDirectory() {
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const uniqueRoles = useMemo(() => {
    const roles = new Set(employeeData.map((item) => item.role));
    return Array.from(roles);
  }, []);

  const uniqueStatuses = useMemo(() => {
    const statuses = new Set(employeeData.map((item) => item.status));
    return Array.from(statuses);
  }, []);

  const filteredData = useMemo(() => {
    let result = [...employeeData];

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
    <div className="p-6 max-w-7xl  space-y-4">
      {/* Filter Section */}
      <div className="flex flex-col">
        <div className="space-y-2 text- text-black ">
          <h2 className="text-2xl"> Employee: <span className="font-bold">{filteredData.length}</span> </h2> 
            <p>Manage and view all employee information</p>
        
        </div>

                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2 mb-4">
        {/* Search Input - Left */}
        <div className="flex flex-col gap-1  pt-5">
          <span className="text-sm text-black"> </span>
          <div className="relative">
            <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="text"
              className="w-[769px] h-[51px] pl-10 pr-3 py-3 bg-white border border-gray-300 rounded-[4px] text-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
  
  <div className="relative w-full h-[50px]">
    <select
      className="appearance-none w-full h-full px-3 pr-10 py-3 bg-white border border-gray-300 rounded-[4px] text-sm text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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

    {/* Custom dropdown icon */}
    <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black pointer-events-none" />
  </div>
</div>
      
          {/* Status Filter */}
        <div className="flex flex-col gap-1 w-[193px]">
  <span className="text-sm text-black">Filter by Status</span>

  <div className="relative w-full h-[50px]">
    <select
      className="appearance-none w-full h-full px-3 pr-10 py-3 bg-white border border-gray-300 rounded-[4px] text-sm text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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

    {/* Custom dropdown icon */}
    <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black pointer-events-none" />
  </div>
</div>
        </div>
      </div>

      </div>

      {/* Table Section */}
      <Table
        columns={columns}
        data={filteredData.map((employee) => ({
          ...employee,
          action: { text: "View Details" },
        }))}
        statusColorMap={statusColorMap}
        limit={5}
        enablePagination
        stripedRows={true}
        sortable={true}
      />
    </div>
  );
}
