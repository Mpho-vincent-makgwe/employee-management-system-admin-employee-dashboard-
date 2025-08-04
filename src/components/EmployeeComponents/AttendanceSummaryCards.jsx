import { timesheetEntries } from "../../data/employeeData/timesheetData";
import { getTimeSummary } from "@/utils/attendanceUtils";
import { getAttendanceSummary } from "@/utils/attendanceUtils";

import { Clock } from "lucide-react";
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
          className="w-full h-[124px] p-4 border-[0.4px] border-gray-200 rounded-[8px] bg-white flex flex-col sm:flex-row items-center gap-[10px] shadow"
        >
          {/* Icon */}
          <div className="w-[40px] h-[40px] bg-indigo-600 text-white rounded-full flex items-center justify-center">
            <Clock />
          </div>

          {/* Text Block */}
          <div className="text-center sm:text-left">
            <div className="text-[10px] font-normal leading-[16px] text-gray-600 w-full h-[16px] mb-1">
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
