"use client";
import Table from "@/components/ui/Table";
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
  Active: "text-[#10B981]",
  "On leave": "text-[#F59E0B]",
  Suspended: "text-[#EF4444]",
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
    <div className="ml-[25px]">
      <Heading
        title={`Employee: ${filteredData.length}`}
        subtitle="View all employee information"
      />

      <EmployeeFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filters={filters}
        setFilters={setFilters}
        uniqueValues={uniqueValues}
        filterKeys={["role", "status"]}
      />
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
      />
    </div>
  );
}
