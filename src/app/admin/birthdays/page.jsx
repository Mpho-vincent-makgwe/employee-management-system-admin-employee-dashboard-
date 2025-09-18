'use client'

import { useState, useMemo } from "react";
import Table from "@/components/Table";
import { FaSearch } from "react-icons/fa";
import birthdayData from "@/data/employeeData/birthdayData";
import { FiChevronDown } from "react-icons/fi";
import Filters from "@/ui/Filters";


const columns = [
  { key: "name", title: "Name" },
  { key: "dob", title: "D.O.B" },
  { key: "role", title: "Role" },
  { key: "employmentType", title: "Employment Type" },
  { key: "dateJoined", title: "Date Joined" },
  { key: "dayOfWeek", title: "Day of the week" },
];

export default function Birthdays() {
   const [roleFilter, setRoleFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
  
    const uniqueRoles = useMemo(() => {
      const roles = new Set(birthdayData.map((item) => item.role));
      return Array.from(roles);
    }, []);
  
    const uniqueStatuses = useMemo(() => {
      const statuses = new Set(birthdayData.map((item) => item.status));
      return Array.from(statuses);
    }, []);
  
    const filteredData = useMemo(() => {
      let result = [...birthdayData];
  
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        result = result.filter((item) =>
          columns.some((col) => {
            const value = item[col.key];
            return (
              value !== undefined &&
              value !== null &&
              String(value).toLowerCase().includes(term)
            );
          })
        );
      }
  
      if (roleFilter) {
        result = result.filter((item) => item.role === roleFilter);
      }
  
      if (statusFilter) {
        result = result.filter((item) => item.status === statusFilter);
      }
  
      return result;
    }, [searchTerm, roleFilter, statusFilter]);
  return (
    <div className="p-4">
      <div className="space-y-2">
        <h2 className="text-black  text-2xl">Upcoming Birthday's</h2>
        <p className="text-black">View all employee birthdays</p>
      </div>
  <Filters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        uniqueRoles={uniqueRoles}
        uniqueStatuses={uniqueStatuses}
      />  
     <Table
        columns={columns}
        data={filteredData.map((employee) => ({
          ...employee,
          action: { text: "View" },
        }))}
        
        limit={5}
        enablePagination={true}
        stripedRows={true}
        sortable={true}
        // Remove these props as they're now handled in the parent component
        // showEmployeeCount={true}
        // showFilters={true}
        // showSearch={true}
        // roleFilter={roleFilter}
        // statusFilter={statusFilter}
        // searchTerm={searchTerm}
      />
    </div>
  );
}
