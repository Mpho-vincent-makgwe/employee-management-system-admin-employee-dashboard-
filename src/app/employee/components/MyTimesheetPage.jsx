import TimesheetSummaryCards from "./SummaryCards";
import Heading from "./Heading";
import TimesheetEntries from "./TimesheetEntries";

export default function MyTimesheetPage() {
  return (
    <div className="p-6 bg-gray-100">
      <Heading
        title="My Timesheet"
        subtitle="View and manage your timesheet entries"
      />
      <TimesheetSummaryCards />
      <TimesheetEntries />
    </div>
  );
}
