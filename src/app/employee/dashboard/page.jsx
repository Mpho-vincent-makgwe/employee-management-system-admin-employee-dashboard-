import React from "react";
import RecentEntries from "@/components/EmployeeComponents/RecentEntries";
import DashboardBarChart from "@/components/EmployeeComponents/dashboard/DashboardBarChart";
import DashboardNotifications from "@/components/EmployeeComponents/DashboardNotifications";
import DashboardSummaryCards from "@/components/EmployeeComponents/DashboardSummaryCards";
import Heading from "@/components/ui/Heading";

const page = () => {
  return (
    <div className="ml-[25px]">
      <Heading
        title="Dashboard Overview"
        subtitle="Here's what's happening with your work today."
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 mb-[22px] ">
        <DashboardSummaryCards />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-9 gap-[12px] h-full mb-[20px]">
        {/* Bar Chart (2/3 width on large screens) */}
        <div className="lg:col-span-5">
          <DashboardBarChart />
        </div>

        {/* Notifications (1/3 width) */}
        <div className="lg:col-span-4">
          <DashboardNotifications />
        </div>
      </div>

      {/* Recent Entries (Full width) */}
      <div>
        <RecentEntries />
      </div>
    </div>
  );
};
export default page;
