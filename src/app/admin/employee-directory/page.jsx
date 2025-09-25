"use client";

import { useState, useMemo } from "react";
import Table from "@/components/Table";
import { employeeData } from "@/data/adminData/employeeData";
import EmployeeFilters from "@/components/ui/EmployeeFilters";
import { Filters } from "@/hooks/Filters";
import Heading from "@/components/ui/Heading";

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
  const {
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    uniqueValues,
    filteredData,
  } = Filters(employeeData, columns);
  return (
    <div className="p-6 max-w-7xl  space-y-4">
      {/* Filter Section */}
      <div className="flex flex-col">
        <div className="space-y-2 text- text-black ">
          <Heading
            title={
              <>
                Employee:{" "}
                <span className="font-bold">{filteredData.length}</span>
              </>
            }
            subtitle="Manage and view all employee information"
          />
        </div>

        <EmployeeFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filters={filters}
          setFilters={setFilters}
          uniqueValues={uniqueValues}
          filterKeys={["role", "status"]}
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
