"use client";

import { BsClockFill } from "react-icons/bs";
import { timesheetEntries } from "../../data/employeeData/timesheetData";
import { getTimeSummary } from "@/utils/attendanceUtils";

const TimesheetSummaryCards = () => {
  const summary = getTimeSummary(timesheetEntries);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {[
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
      
      ].map((item, i) => (
        <div
          key={i}
          className="w-full h-[124px] p-4 border-[0.4px] border-[#D0D5DD] rounded-[8px] bg-white flex flex-col sm:flex-row items-center gap-[10px]"
        >
          {/* Icon */}
          <div className="w-[40px] h-[40px] bg-[#4F46E5] rounded-full flex items-center justify-center">
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

export default TimesheetSummaryCards;
