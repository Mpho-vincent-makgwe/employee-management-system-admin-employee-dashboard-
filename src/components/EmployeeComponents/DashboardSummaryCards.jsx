"use client";

import { Clock3, CalendarRange, CalendarCheck, AlarmClock } from "lucide-react";
import { timesheetEntries } from "../../data/employeeData/timesheetData";
import { getTimeSummary } from "@/utils/attendanceUtils";
import users from "@/data/users.json";
import { useUser } from "@/context/UserContext";

const DashboardSummaryCards = () => {
  const { user, loading } = useUser();

  const totalEmployees = users.filter(
    (user) => user.role === "Employee"
  ).length;

  const hoursThisWeek = Number(user?.hoursWorkedThisWeek ?? 0);

  const checkedInStatus = user?.isCheckedIn ? "Checked In" : "Not Checked In";

  const birthday = user?.profile?.personal?.birthday || "Not set";
  console.log("User from context:", user);

  if (loading) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {[
        {
          label: "Total Employees",
          value: totalEmployees,
          icon: <CalendarRange className="w-6 h-6 text-white" />,
        },
        {
          label: "Hours This Week",
          value: `${hoursThisWeek} hrs`,
          icon: <CalendarCheck className="w-6 h-6 text-white" />,
        },
        {
          label: "Today’s Status",
          // value: checkedInStatus,
          value: `Checked In`,
          icon: <Clock3 className="w-6 h-6 text-white" />,
        },
        {
          label: "My Birthday",
          value: birthday,
          icon: <AlarmClock className="w-6 h-6 text-white" />,
        },
      ].map((item, i) => (
        <div
          key={i}
          className="w-full h-[124px] p-4 border-[0.4px] border-[#D0D5DD] rounded-[8px] bg-white flex flex-col sm:flex-row items-center gap-[10px]"
        >
          {/* Icon */}
          <div className="w-[40px] h-[40px] bg-indigo-600 rounded-full flex items-center justify-center">
            {item.icon}
          </div>

          {/* Text Block */}
          <div className="text-center sm:text-left">
            <div className="text-[10px] font-normal leading-[16px] text-gray-600 w-[110px] h-[16px] mb-1">
              {item.label}
            </div>
            <div className="w-[110px] h-[24px] text-[20px] font-semibold leading-[32px] text-[#3A3A3C]">
              {item.value}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardSummaryCards;
