"use client";

import Table from "../../Table";
import { timesheetEntries } from "../../../data/employeeData/timesheetData";
import { useEffect } from "react";
import { useSearch } from "../../../context/SearchContext";
import { fillMissingDays } from "@/utils/attendanceUtils";
import Link from "next/link";

const MyAttendanceTable = () => {
  const statusStyles = {
    Present: "text-[#10B981] font-[500]",
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
        const colorClass = statusStyles[status] || "text-gray-700";
        return <span className={`${colorClass}`}>{status}</span>;
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

  const dataWithStatus = fillMissingDays(timesheetEntries);
  const recentEntries = dataWithStatus.slice(0, 3);

  return (
    <div className="bg-white">
      <div className="flex justify-between items-center mb-2 px-4 pt-4">
        <h2 className="text-base text-[#3A3A3C]">Recent Entries</h2>
        <Link
          href="/employee/my-attendance"
          className="text-sm text-[#4F46E5] font-medium hover:underline"
        >
          View all
        </Link>
      </div>

      <Table columns={columns} data={recentEntries} enablePagination={false} />
    </div>
  );
};

export default MyAttendanceTable;
