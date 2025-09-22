import BirthdayTable from "@/components/EmployeeComponents/BirthdayTable";
import Heading from "@/components/ui/Heading";
import SearchBar from "@/components/SearchBar";
import { Import } from "lucide-react";

export default function Birthdays() {
  return (
    <main className="ml-[25px]">
      <Heading title="Upcoming Birthdays" subtitle="View employee birthdays" />
      {/* <SearchBar /> */}
      <BirthdayTable />
    </main>
  );
}
