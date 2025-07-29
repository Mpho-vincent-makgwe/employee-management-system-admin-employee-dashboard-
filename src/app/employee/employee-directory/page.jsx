import Heading from "@/components/Heading";
import SearchBar from "@/components/SearchBar";
import DirectoryTable from "@/components/EmployeeComponents/DirectoryTable";

export default function EmployeeDirectory() {
  return (
    <div className="px-6 py-5">
      <Heading
        title="Employee Directory"
        subtitle="View all employee information"
      />
      <DirectoryTable />
    </div>
  );
}
