"use client";

import { timesheetEntries } from "../../../data/employeeData/timesheetData";
import { getAttendanceSummary } from "@/utils/attendanceUtils";
import { BsClockFill } from "react-icons/bs";
import SummaryCard from "@/components/ui/SummaryCard";

const AttendanceSummary = () => {
  const summary = getAttendanceSummary(timesheetEntries);

  const items = [
    { label: "This Month Working Days", value: summary.workingDaysThisMonth },
    { label: "Present", value: summary.present },
    { label: "Absent", value: summary.absent },
    { label: "Late", value: summary.late },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {items.map(({ label, value }) => (
        <SummaryCard
          key={label}
          icon={<BsClockFill className="w-[14px] h-[14px] text-white" />}
          label={label}
          value={value}
        />
      ))}
    </div>
  );
};

export default AttendanceSummary;
