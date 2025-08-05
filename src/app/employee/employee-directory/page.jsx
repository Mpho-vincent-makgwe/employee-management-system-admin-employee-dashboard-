"use client";
import { useState, useMemo } from "react";
import Table from "@/components/Table";
import { employeeData } from "@/data/adminData/employeeData";
import { FaSearch } from "react-icons/fa";

const columns = [
  { key: "name", title: "Name" },
  { key: "role", title: "Role" },
  { key: "employeeType", title: "Employee Type" },
  { key: "status", title: "Status" },
  { key: "dateJoined", title: "Date Joined" },
  { key: "action", title: "Action" }
];

const statusColorMap = {
  Active: "text-green-500",
  "On leave": "text-yellow-500",
  Suspended: "text-red-500"
};

export default function EmployeeDirectory() {
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Calculate unique roles and statuses for filter dropdowns
  const uniqueRoles = useMemo(() => {
    const roles = new Set(employeeData.map((item) => item.role));
    return Array.from(roles);
  }, [employeeData]);

  const uniqueStatuses = useMemo(() => {
    const statuses = new Set(employeeData.map((item) => item.status));
    return Array.from(statuses);
  }, [employeeData]);

  // Filter data based on filters and search term
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
  }, [employeeData, searchTerm, roleFilter, statusFilter]);

  return (
    <div className="p-4 gap-6">
      {/* Always visible filter section */}
      <div className="flex flex-col gap-4 p-4 pb-4 bg-white rounded-md border-b border-gray-100 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {/* Employee Count - Always visible */}
          <div className="text-lg font-medium">
            Employee: <span className="font-bold">{filteredData.length}</span>
          </div>

          {/* Search - Always visible */}
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search employees"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Filters - Always visible */}
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-sm text-black whitespace-nowrap">
              Filter by Role
            </span>
            <select
              className="border rounded-md px-3 py-1 text-sm w-full"
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
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-sm text-black whitespace-nowrap">
              Filter by Status
            </span>
            <select
              className="border rounded-md px-3 py-1 text-sm w-full"
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

      {/* Table component */}
      <Table
        columns={columns}
        data={filteredData.map((employee) => ({
          ...employee,
          action: { text: "View Details" },
        }))}
        statusColorMap={statusColorMap}
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