import Heading from "@/components/Heading";
import SearchBar from "@/components/SearchBar";
import MyAttendanceTable from "@/components/EmployeeComponents/MyAttendanceTable";

export default function EmployeeDirectory() {
  return (
    <main className="px-6 py-5">
      <Heading
        title="My Attendance"
        subtitle="Track your attendance records and punctuality."
      />
      <MyAttendanceTable />
    </main>
  );
}
