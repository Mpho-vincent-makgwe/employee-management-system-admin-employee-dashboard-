"use client";

import Table from "../../Table";
import { timesheetEntries } from "../../../data/employeeData/timesheetData";
import { useEffect, useMemo } from "react";
import { useSearch } from "../../../context/SearchContext";

const TimesheetEntries = () => {
  const columns = [
    { key: "date", title: "Date" },
    { key: "clockIn", title: "Clock In" },
    { key: "clockOut", title: "Clock out" },
    { key: "totalHours", title: "Total Hours" },
  ];

  const parseDate = (str) => {
    const [day, month, year] = str.split("/");

    // Converts 2-digit year to 4-digit year
    const fullYear = parseInt(year) < 50 ? "20" + year : "19" + year;

    return new Date(`${fullYear}-${month}-${day}`); // ISO format
  };

  const sortedEntries = useMemo(() => {
    return [...timesheetEntries].sort((a, b) => {
      return parseDate(b.date) - parseDate(a.date); // most recent first
    });
  }, []);

  const { setSearchTerm } = useSearch();

  useEffect(() => {
    setSearchTerm("");
    return () => setSearchTerm("");
  }, [setSearchTerm]);

  return (
    <div className="">
      <div>
        <Table
          columns={columns}
          data={sortedEntries}
          title="Recent Entries"
          titleClassName="" // Custom title styling
          // subtitle="Manage public holidays and company-specific holidays"
          viewMoreLink={{ text: "" }}
          enablePagination={sortedEntries.length > 5}
        />
      </div>
    </div>
  );
};

export default TimesheetEntries;
