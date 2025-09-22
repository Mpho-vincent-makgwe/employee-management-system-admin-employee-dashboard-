import Heading from "@/components/ui/Heading";
import SearchBar from "@/components/SearchBar";
import MyAttendanceTable from "@/components/EmployeeComponents/MyAttendanceTable";
import AttendanceSummaryCard from "@/components/EmployeeComponents/AttendanceSummaryCards";
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
