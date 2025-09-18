"use client";
import { useState, useMemo } from "react";
import Table from "@/components/Table"; 
import payrollData from "@/data/adminData/payrollData";
import { FaSearch } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import Filters from "@/ui/Filters";

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
   const [roleFilter, setRoleFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
  
    const uniqueRoles = useMemo(() => {
      const roles = new Set(payrollData.map((item) => item.role));
      return Array.from(roles);
    }, []);
  
    const uniqueStatuses = useMemo(() => {
      const statuses = new Set(payrollData.map((item) => item.status));
      return Array.from(statuses);
    }, []);
  
    const filteredData = useMemo(() => {
      let result = [...payrollData];
  
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
        <h2 className="text-black  text-2xl">Payroll</h2>
        <p className="text-black">View all employee information</p>
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
        data={payrollData}
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