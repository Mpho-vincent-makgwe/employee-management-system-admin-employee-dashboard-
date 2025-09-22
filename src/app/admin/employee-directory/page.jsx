"use client";

import { useState, useMemo } from "react";
import Table from "@/components/Table";
import { employeeData } from "@/data/adminData/employeeData";
import Filters from "../../../ui/EmployeeFilters";

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
          <h2 className="text-2xl">
            {" "}
            Employee: <span className="font-bold">
              {filteredData.length}
            </span>{" "}
          </h2>
          <p>Manage and view all employee information</p>
        </div>

        <Filters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          uniqueRoles={uniqueRoles}
          uniqueStatuses={uniqueStatuses}
        />

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
    </div>
  );
}
