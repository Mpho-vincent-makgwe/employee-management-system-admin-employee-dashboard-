"use client"
import BirthdayTable from "@/components/EmployeeComponents/birthdays/BirthdayTable";
import Heading from "@/components/ui/Heading";


export default function Birthdays() {
  

  return (
    <main className="ml-[25px]">
      <Heading title="Upcoming Birthdays" subtitle="View employee birthdays" />
      
      <BirthdayTable />
    </main>
  );
}
