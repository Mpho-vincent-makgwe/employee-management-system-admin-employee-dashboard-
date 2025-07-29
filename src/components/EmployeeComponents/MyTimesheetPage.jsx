import TimesheetSummaryCards from "./SummaryCards";
import Heading from "../Heading";
import TimesheetEntries from "./TimesheetEntries";

export default function MyTimesheetPage() {
  return (
    <div className="px-6 py-5 bg-gray-100">
      <Heading
        title="My Timesheet"
        subtitle="View and manage your timesheet entries"
      />
      <TimesheetSummaryCards />
      <TimesheetEntries />
    </div>
  );
}
