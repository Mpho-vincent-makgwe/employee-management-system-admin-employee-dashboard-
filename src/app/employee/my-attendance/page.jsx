import Heading from "@/components/ui/Heading";
import MyAttendanceTable from "@/components/EmployeeComponents/my-attendance/MyAttendanceTable";
import AttendanceSummaryCard from "@/components/EmployeeComponents/my-attendance/AttendanceSummaryCards";
export default function EmployeeDirectory() {
  return (
    <main className="ml-[25px]">
      <Heading
        title="My Attendance"
        subtitle="Track your attendance records and punctuality."
      />
      <AttendanceSummaryCard />
      <MyAttendanceTable />
    </main>
  );
}
