"use client";
import Table from "@/components/ui/Table";
import payrollData from "@/data/adminData/payrollData";
import EmployeeFilters from "@/components/ui/EmployeeFilters";
import { Filters } from "@/hooks/Filters";
import Heading from "@/components/ui/Heading";

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
  const {
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    uniqueValues,
    filteredData,
  } = Filters(payrollData, columns);

  return (
    <div className="p-4">
      <div className="space-y-2">
        <Heading title="Payroll" subtitle="View all employee information" />
      </div>

      <EmployeeFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filters={filters}
        setFilters={setFilters}
        uniqueValues={uniqueValues}
        filterKeys={["role", "status"]}
      />

      <Table
        columns={columns}
        data={filteredData}
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
