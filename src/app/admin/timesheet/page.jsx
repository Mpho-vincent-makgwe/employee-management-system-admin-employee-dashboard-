import TimesheetCards from "@/components/AdminComponents/timesheet/TimesheetCards";
import TimesheetTracking from "@/components/AdminComponents/timesheet/TimeSheetTracking";
import Heading from "@/components/ui/Heading";

export default function Timesheet() {
  return (
    <div className="p-6 ">
      <div className="mb-6 space-y-2">
        <Heading
          title="Timesheet Tracking"
          subtitle="Attendance and working hours on the 4th of July, 2025
"
        />
      </div>
      <TimesheetCards />
      <TimesheetTracking />
    </div>
  );
}
