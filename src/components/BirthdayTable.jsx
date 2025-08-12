"use client";
import { useState, useMemo } from "react";
import Table from "@/components/Table";
import birthdayData from "@/data/employeeData/birthdayData";
import { FaSearch } from "react-icons/fa";

const columns = [
  { key: "name", title: "Name" },
  { key: "dob", title: "D.O.B" },
  { key: "role", title: "Role" },
  { key: "employmentType", title: "Employment Type" },
  { key: "dateJoined", title: "Date Joined" },
  { key: "dayOfWeek", title: "Day of the week" },
];

export default function BirthdayTable() {
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Calculate unique roles and statuses for filter dropdowns
  const uniqueRoles = useMemo(() => {
    const roles = new Set(birthdayData.map((item) => item.role));
    return Array.from(roles);
  }, [birthdayData]);

  const uniqueStatuses = useMemo(() => {
    const statuses = new Set(birthdayData.map((item) => item.status));
    return Array.from(statuses);
  }, [birthdayData]);

  // Filter data based on filters and search term
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
  }, [birthdayData, searchTerm, roleFilter, statusFilter]);

  return (
    <div className="">
      <div className="flex flex-col lg:flex-row pb-4 items-center gap-4">
        {/* Horizontal flex for search and filters */}
        <div className="flex flex-row w-full gap-4 items-center">
          {/* Search Bar */}
          <div className="relative flex-1 min-w-0">
            <span className="text-sm text-transparent mb-1 whitespace-nowrap">
              Search Bar
            </span>
            <div className="relative w-full">
              <input
                type="text"
                className="w-full h-[51px] pl-10 pr-3 py-2 border border-[0.6px] border-[#D0D5DD] rounded-sm leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search employees"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Filter by Role */}
          <div className="flex flex-col">
            <span className="text-sm text-black mb-1">Filter by Role</span>
            <select
              className="bg-white h-[51px] border border-[0.6px] border-[#D0D5DD] rounded-sm px-3 py-1 text-sm"
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

          {/* Filter by Status */}
          <div className="flex flex-col">
            <span className="text-sm text-black mb-1 whitespace-nowrap">
              Filter by Status
            </span>
            <select
              className="bg-white h-[51px] border border-[0.6px] border-[#D0D5DD] rounded-sm px-3 py-1 text-sm"
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
          action: { text: "View" },
        }))}
        // statusColorMap={statusColorMap}
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
