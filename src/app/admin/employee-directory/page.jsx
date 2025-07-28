"use client";

import Table from "@/components/Table";
import { employeeData } from "@/data/adminData/employeeData";

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
  return (
    <div className="p-4">
      <Table
        title="Employee Directory"
        subtitle="All registered staff members"
        columns={columns}
        data={employeeData}
        statusColorMap={statusColorMap}
        limit={5}
        enablePagination={true}
        viewMoreLink={{ href: "/employees", text: "View All Employees" }}
        stripedRows={true}
        sortable={true}
      />
    </div>
  );
}