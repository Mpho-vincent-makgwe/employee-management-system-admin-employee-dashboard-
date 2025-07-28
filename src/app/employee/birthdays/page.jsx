import BirthdayTable from "@/components/EmployeeComponents/BirthdayTable";
import Heading from "@/components/EmployeeComponents/Heading";
import SearchBar from "@/components/EmployeeComponents/SearchBar";
import { Import } from "lucide-react";

export default function Birthdays() {
  return (
    <>
      <Heading title="Upcoming Birthdays" subtitle="View employee birthdays" />
      <SearchBar />
      <BirthdayTable />
    </>
  );
}
