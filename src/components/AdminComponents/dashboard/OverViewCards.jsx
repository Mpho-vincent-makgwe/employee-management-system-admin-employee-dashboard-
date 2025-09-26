"use client";

import { FiUsers, FiCheckCircle, FiMinusCircle, FiClock } from "react-icons/fi";
import SummaryCard from "@/components/ui/SummaryCard";

export default function OverViewCards() {
  const overview = [
    {
      label: "Total Employees",
      value: 35,
      icon: <FiUsers className="text-white text-xl" />, // icon size adjusted
    },
    {
      label: "Present Today",
      value: 16,
      icon: <FiCheckCircle className="text-white text-xl" />,
    },
    {
      label: "On Leave",
      value: 16,
      icon: <FiMinusCircle className="text-white text-xl" />,
    },
    {
      label: "Hours Logged This Week",
      value: "1,600",
      icon: <FiClock className="text-white text-xl" />,
    },
  ];

  return (
    <div className="flex flex-col xl:flex-row items-center w-full gap-[18px]">
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
