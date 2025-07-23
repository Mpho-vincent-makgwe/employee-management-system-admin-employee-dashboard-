import TimesheetSummaryCards from "../components/SummaryCards";
import Heading from "../components/Heading";
import TimesheetEntries from "../components/TimesheetEntries";

export default function MyTimesheet() {
  return (
    <main>
      <Heading
        title="My Timesheet"
        subtitle="Track your working hours and time entries."
      />
      <TimesheetSummaryCards />
      <TimesheetEntries />
    </main>
  );
}
