"use client";

import Table from "../Table";
import { timesheetEntries } from "../../data/employeeData/timesheetData";
import { useEffect } from "react";
import { useSearch } from "../../context/SearchContext";
import { getStatus } from "../../data/employeeData/timesheetData";
import { fillMissingDays } from "../../data/employeeData/timesheetData";

const MyAttendanceTable = () => {
  const statusStyles = {
    Present: "text-[#10B981]",
    Late: "text-[#D1A039]",
    Absent: "text-[#D11A2A]",
  };

  const columns = [
    { key: "date", title: "Date" },
    {
      key: "status",
      title: "Status",
      render: (row) => {
        const status = row.status;
        const colorClass = statusStyles[status] || "bg-gray-100 text-gray-700";
        return <span className={` ${colorClass}`}>{status}</span>;
      },
    },
    { key: "clockIn", title: "Clock In" },
    { key: "clockOut", title: "Clock out" },
  ];

  const { setSearchTerm } = useSearch();

  useEffect(() => {
    setSearchTerm("");
    return () => setSearchTerm("");
  }, [setSearchTerm]);

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-based: July = 6

  const dataWithStatus = fillMissingDays(timesheetEntries, year, month);

  return (
    <div className="bg-gray-100">
      <div>
        <Table
          columns={columns}
          data={dataWithStatus}
          title="Recent Entries"
          titleClassName="text-blue-800 " // Custom title styling
          // subtitle="Manage public holidays and company-specific holidays"
          viewMoreLink={{ text: "Holiday List" }}
          enablePagination={timesheetEntries.length > 5}
        />
      </div>
    </div>
  );
};

export default MyAttendanceTable;
