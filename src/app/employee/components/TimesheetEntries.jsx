"use client";

import Table from "./Table";
import { timesheetEntries } from "../data/timesheetData";
import { useEffect } from "react";
import { useSearch } from "../context/SearchContext";

const TimesheetEntries = () => {
  const columns = [
    { key: "date", title: "Date" },
    { key: "clockIn", title: "Clock In" },
    { key: "clockOut", title: "Clock out" },
    { key: "totalHours", title: "Total Hours" },
  ];

  const { setSearchTerm } = useSearch();

  useEffect(() => {
    setSearchTerm("");
    return () => setSearchTerm("");
  }, [setSearchTerm]);

  return (
    <div className="bg-gray-100">
      <div>
        <Table
          columns={columns}
          data={timesheetEntries}
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

export default TimesheetEntries;
