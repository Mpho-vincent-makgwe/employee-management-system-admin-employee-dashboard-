import React from "react";
import RecentEntries from "@/components/EmployeeComponents/RecentEntries";
import BarChart from "@/components/EmployeeComponents/BarChart";
import DashboardNotifications from "@/components/EmployeeComponents/DashboardNotifications";

const page = () => {
  return (
    <div>
      <BarChart />
      <DashboardNotifications />
      <RecentEntries />
    </div>
  );
};

export default page;
