"use client";

import Table from "./Table";
import birthdayData from "@/data/employeeData/birthdayData";
import { useEffect, useMemo } from "react";
import { useSearch } from "../context/SearchContext";

const BirthdayTable = () => {
  const columns = [
    { key: "name", title: "Name" },
    { key: "dob", title: "D.O.B" },
    { key: "role", title: "Role" },
    { key: "employmentType", title: "Employment Type" },
    { key: "dateJoined", title: "Date Joined" },
    { key: "dayOfWeek", title: "Day of the week" },
  ];

  //Search
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
          data={birthdayData}
          titleClassName="text-blue-800 " // Custom title styling
          // subtitle="Manage public holidays and company-specific holidays"
          viewMoreLink={{ text: "Birthdays" }}
          enablePagination={birthdayData.length > 5}
        />
      </div>
    </div>
  );
};

export default BirthdayTable;
