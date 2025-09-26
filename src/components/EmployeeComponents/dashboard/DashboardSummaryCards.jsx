"use client";

import { HiUsers } from "react-icons/hi";
import { BsClockFill } from "react-icons/bs";
import { MdCake } from "react-icons/md";
import users from "@/data/users.json";
import { useUser } from "@/context/UserContext";
import SummaryCard from "@/components/ui/SummaryCard";

const DashboardSummaryCards = () => {
  const { user, loading } = useUser();

  const totalEmployees = users.filter((u) => u.role === "Employee").length;

  const hoursThisWeek = Number(user?.hoursWorkedThisWeek ?? 0);
  const checkedInStatus = user?.isCheckedIn ? "Checked In" : "Not Checked In";
  const birthday = user?.profile?.personal?.birthday || "Not set";

  if (loading) return null;

  const items = [
    {
      label: "Total Employees",
      value: totalEmployees,
      icon: <HiUsers className="w-[14px] h-[14px] text-white" />,
    },
    {
      label: "Hours This Week",
      value: `${hoursThisWeek} hrs`,
      icon: <BsClockFill className="w-[14px] h-[14px] text-white" />,
    },
    {
      label: "Today’s Status",
      value: checkedInStatus,
      icon: <BsClockFill className="w-[14px] h-[14px] text-white" />,
    },
    {
      label: "My Birthday",
      value: birthday,
      icon: <MdCake className="w-[14px] h-[14px] text-white" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((item, i) => (
        <SummaryCard
          key={i}
          icon={item.icon}
          label={item.label}
          value={item.value}
        />
      ))}
    </div>
  );
};

export default DashboardSummaryCards;
