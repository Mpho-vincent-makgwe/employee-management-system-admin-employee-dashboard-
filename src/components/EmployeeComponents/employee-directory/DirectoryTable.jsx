"use client";

import Table from "../../ui/Table";
import birthdayData from "@/data/employeeData/birthdayData";
import { useEffect, useMemo } from "react";
import { useSearch } from "../../../context/SearchContext";

const DirectoryTable = () => {
  const columns = [
    { key: "name", title: "Name" },

    { key: "role", title: "Role" },
    { key: "employmentType", title: "Employment Type" },
    { key: "status", title: "Status" },
    { key: "dateJoined", title: "Date Joined" },
    { key: "action", title: "Action" },
  ];

  const statusColorMap = {
    Active: "text-green-500",
    "On leave": "text-yellow-500",
    Suspended: "text-red-500",
  };

  //Search
  const { setSearchTerm } = useSearch();

  useEffect(() => {
    setSearchTerm("");
    return () => setSearchTerm("");
  }, [setSearchTerm]);

  // Add 'action' field dynamically using the person's ID
  const formattedData = useMemo(
    () =>
      birthdayData.map((person) => ({
        ...person,
        name: `${person.firstName} ${person.lastName}`,
        action: {
          link: `/employee/employee-directory/${person.id}`,

          text: "View Details",
        },
      })),
    []
  );
  return (
    <div className="bg-gray-100">
      <div>
        <Table
          columns={columns}
          data={formattedData}
          titleClassName="text-blue-800 " // Custom title styling
          // subtitle="Manage public holidays and company-specific holidays"
          viewMoreLink={{ text: "Birthdays" }}
          statusColorMap={statusColorMap}
          limit={5}
          enablePagination={true}
          stripedRows={true}
          sortable={true}
        />
      </div>
    </div>
  );
};

export default DirectoryTable;
