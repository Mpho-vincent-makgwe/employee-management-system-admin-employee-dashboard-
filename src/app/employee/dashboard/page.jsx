import React from "react";
import RecentEntries from "@/components/EmployeeComponents/RecentEntries";
import BarChart from "@/components/EmployeeComponents/BarChart";

const page = () => {
  return (
    <div>
      <BarChart />
      <RecentEntries />
    </div>
  );
};

export default page;
