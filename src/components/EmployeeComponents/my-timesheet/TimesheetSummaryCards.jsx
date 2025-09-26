"use client";

import { BsClockFill } from "react-icons/bs";
import { timesheetEntries } from "../../../data/employeeData/timesheetData";
import { getTimeSummary } from "@/utils/attendanceUtils";
import SummaryCard from "@/components/ui/SummaryCard";

const TimesheetSummaryCards = () => {
  const summary = getTimeSummary(timesheetEntries);

  const items = [
    {
      label: "This Month",
      value: `${summary.thisMonth} hrs`,
      icon: <BsClockFill className="w-[14px] h-[14px] text-white" />,
    },
    {
      label: "This Week",
      value: `${summary.thisWeek} hrs`,
      icon: <BsClockFill className="w-[14px] h-[14px] text-white" />,
    },
    {
      label: "Today",
      value: `${summary.today} hrs`,
      icon: <BsClockFill className="w-[14px] h-[14px] text-white" />,
    },
    {
      label: "Overtime",
      value: `${summary.overtime} hrs`,
      icon: <BsClockFill className="w-[14px] h-[14px] text-white" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {items.map((item, i) => (
        <SummaryCard
          key={i}
          icon={item.icon}
          label={item.label}
          value={item.value}
        />
      ))}
    </div>
  );
};

export default TimesheetSummaryCards;
