import BirthdayTable from "@/components/BirthdayTable";
import Heading from "@/components/Heading";
import SearchBar from "@/components/SearchBar";
import { Import } from "lucide-react";

export default function Birthdays() {
  return (
    <main className="px-6 py-5">
      <Heading title="Upcoming Birthdays" subtitle="View employee birthdays" />
      {/* <SearchBar /> */}
      <BirthdayTable />
    </main>
  );
}
