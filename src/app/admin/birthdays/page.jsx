import BirthdayTable from "@/components//BirthdayTable";
import Heading from "@/components/Heading";
import SearchBar from "@/components/SearchBar";

export default function Birthdays() {
  return (
    <>
      <Heading title="Upcoming Birthdays" subtitle="View employee birthdays" />
      <SearchBar />
      <BirthdayTable />
    </>
  );
}
