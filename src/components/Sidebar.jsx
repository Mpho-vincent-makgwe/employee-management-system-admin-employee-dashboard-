"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import EtiLogo from "./Logo";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { BsGridFill, BsCalendarEvent } from "react-icons/bs";
import {
  FaUserFriends,
  FaClock,
  FaFileInvoiceDollar,
  FaBirthdayCake,
  FaCalendar,
} from "react-icons/fa";

// Employee sidebar menu
const employeeMenu = [
  { label: "Dashboard", icon: <BsGridFill />, href: "/employee/dasboard" },
  {
    label: "Employee Directory",
    icon: <FaUserFriends />,
    href: "/employee/employee-directory",
  },
  { label: "My Timesheet", icon: <FaClock />, href: "/employee/my-timesheet" },
  {
    label: "My Attendance",
    icon: <FaCalendar />,
    href: "/employee/my-attendance",
  },
  { label: "Birthdays", icon: <FaBirthdayCake />, href: "/employee/birthdays" },
  { label: "Setting", icon: <FiSettings />, href: "/employee/setting" },
  { label: "Logout", icon: <FiLogOut />, href: "/auth/logout" },
];

// Admin sidebar menu
const adminMenu = [
  { label: "Dashboard", icon: <BsGridFill />, href: "/admin/dashboard" },
  {
    label: "Employee Directory",
    icon: <FaUserFriends />,
    href: "/admin/employee-directory",
  },
  { label: "Timesheet", icon: <FaClock />, href: "/admin/timesheet" },
  { label: "Payroll", icon: <FaFileInvoiceDollar />, href: "/admin/payroll" },
  { label: "Birthday", icon: <FaBirthdayCake />, href: "/admin/birthdays" },
  { label: "Setting", icon: <FiSettings />, href: "/admin/settings" },
  { label: "Logout", icon: <FiLogOut />, href: "/auth/logout" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine user type
  const isEmployee = pathname.startsWith("/employee");
  const isAdmin = pathname.startsWith("/admin");

  const menu = isEmployee ? employeeMenu : isAdmin ? adminMenu : [];

  if (!isEmployee && !isAdmin) return null; // Hide sidebar on other routes

  // ✅ Mobile view
  if (isTablet) {
    return (
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <nav className="p-2">
          <ul className="flex justify-around">
            {menu.slice(0, 5).map((item, idx) => {
              const isActive = pathname === item.href;
              return (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className={`flex items-center justify-center p-3 rounded-full text-lg transition-colors ${
                      isActive
                        ? "bg-indigo-100 text-indigo-600"
                        : "text-indigo-600 hover:bg-indigo-50"
                    }`}
                    title={item.label}
                  >
                    {item.icon}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    );
  }

  // ✅ Desktop view (matches image layout)
  return (
    <aside className="hidden lg:block w-64 bg-white h-screen fixed left-0 top-0 z-20 shadow-md">
      <div className="flex items-center h-24 justify-center">
        <EtiLogo className="h-10 w-auto" />
      </div>
      <nav className="px-4">
        <ul className="space-y-6">
          {menu.map((item, idx) => {
            const isActive = pathname === item.href;
            return (
              <li key={idx}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-[#4F46E5] text-white shadow"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span
                    className={`text-lg ${
                      isActive ? "text-white" : "text-[#4F46E5]"
                    }`}
                  >
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
