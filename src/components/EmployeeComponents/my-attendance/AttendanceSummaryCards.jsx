import { timesheetEntries } from "../../../data/employeeData/timesheetData";
import { getTimeSummary } from "@/utils/attendanceUtils";
import { getAttendanceSummary } from "@/utils/attendanceUtils";

import { Clock } from "lucide-react";
import { BsClockFill } from "react-icons/bs";
const AttendanceSummary = () => {
  const summary = getAttendanceSummary(timesheetEntries);

  const items = [
    { title: "This Month Working Days", value: summary.workingDaysThisMonth },
    { title: "Present", value: summary.present },
    { title: "Absent", value: summary.absent },
    { title: "Late", value: summary.late },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {items.map(({ title, value }) => (
        <div
          key={title}
          className="w-full h-[124px] p-4 border-[0.4px] border-[#D0D5DD] rounded-[8px] bg-white flex flex-col sm:flex-row items-center gap-[10px]"
        >
          {/* Icon */}
          <div className="w-[40px] h-[40px] bg-[#4F46E5] rounded-full flex items-center justify-center">
            <BsClockFill className="w-[14px] h-[14px] text-white" />
          </div>

          {/* Text Block */}
          <div className="text-center sm:text-left">
            <div className="text-[12px] font-normal leading-[16px] text-gray-600 w-full h-[16px] mb-1">
              {title}
            </div>
            <div className="w-[110px] h-[24px] text-[20px] font-semibold leading-[32px] text-[#3A3A3C]">
              {value}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttendanceSummary;
