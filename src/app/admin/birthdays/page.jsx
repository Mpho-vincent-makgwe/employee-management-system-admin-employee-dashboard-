"use client";

import { useState, useMemo } from "react";
import Table from "@/components/Table";
import birthdayData from "@/data/employeeData/birthdayData";
import EmployeeFilters from "@/components/ui/EmployeeFilters";
import { Filters } from "@/hooks/Filters";
import Heading from "@/components/ui/Heading";

const columns = [
  { key: "name", title: "Name" },
  { key: "dob", title: "D.O.B" },
  { key: "role", title: "Role" },
  { key: "employmentType", title: "Employment Type" },
  { key: "dateJoined", title: "Date Joined" },
  { key: "dayOfWeek", title: "Day of the week" },
];

export default function Birthdays() {
  const {
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    uniqueValues,
    filteredData,
  } = Filters(birthdayData, columns);

  return (
    <div className="p-4">
      <div className="space-y-2">
        <Heading
          title="Upcoming Birthday's"
          subtitle="View all employee birthdays"
        />
      </div>
      <EmployeeFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filters={filters}
        setFilters={setFilters}
        uniqueValues={uniqueValues}
        filterKeys={["role", "employmentType"]}
      />
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
      />
    </div>
  );
}
