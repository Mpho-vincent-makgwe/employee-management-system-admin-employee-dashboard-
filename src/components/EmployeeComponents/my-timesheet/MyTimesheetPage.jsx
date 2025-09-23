import TimesheetSummaryCards from "../../ui/SummaryCards";
import Heading from "../../ui/Heading";
import TimesheetEntries from "./TimesheetEntries";

export default function MyTimesheetPage() {
  return (
    <div className="ml-[25px]">
      <Heading
        title="My Timesheet"
        subtitle="View and manage your timesheet entries"
      />
      <TimesheetSummaryCards />
      <TimesheetEntries />
    </div>
  );
}
