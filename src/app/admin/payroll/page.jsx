"use client";

import Table from "@/components/Table"; // Adjust this if your Table component is elsewhere
import payrollData from "@/data/adminData/payrollData";

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
        filterTabs={["All", "Paid", "Pending", "Rejected"]}
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