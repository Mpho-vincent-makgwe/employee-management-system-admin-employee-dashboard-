import Card from "../../ui/Card";
import { FiUsers } from "react-icons/fi";
import SummaryCard from "@/components/ui/SummaryCard";

export default function TimesheetCards() {
  const overview = [
    {
      label: "Total Employees",
      value: 35,
      icon: <FiUsers className="text-white text-2xl" />,
    },
    {
      label: "Employee Present",
      value: 20,
      icon: <FiUsers className="text-white text-2xl" />,
    },
    {
      label: "Employee Absent",
      value: 10,
      icon: <FiUsers className="text-white text-2xl" />,
    },
    {
      label: "Employee on Leave",
      value: "5",
      icon: <FiUsers className="text-white text-2xl" />,
    },
  ];

  return (
    <div className="flex flex-col  xl:flex-row items-center w-full gap-[18px]">
      {overview.map((item, index) => (
        <SummaryCard
          key={index}
          icon={item.icon}
          label={item.label}
          value={item.value}
        />
      ))}
    </div>
  );
}
