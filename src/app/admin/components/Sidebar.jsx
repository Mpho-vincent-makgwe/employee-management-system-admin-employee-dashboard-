"use client";


import Link from "next/link";
import Image from "next/image";
import { FaHome, FaUsers, FaClock, FaFileInvoiceDollar, FaBirthdayCake, FaCog, FaSignOutAlt } from 'react-icons/fa';


export default function Sidebar() {
  const pathname = window.location.pathname;

  const navItems = [
  { href: "/", label: "Dashboard", icon: <FaHome size={18} /> },
  { href: "/employeedirectory", label: "Employee Directory", icon: <FaUsers size={18} /> },
  { href: "/timesheet", label: "Timesheet", icon: <FaClock size={18} /> },
  { href: "/payroll", label: "Payroll", icon: <FaFileInvoiceDollar size={18} /> },
  { href: "/birthday", label: "Birthday", icon: <FaBirthdayCake size={18} /> },
  { href: "/settings", label: "Settings", icon: <FaCog size={18} /> },
  { href: "/logout", label: "Logout", icon: <FaSignOutAlt size={18} /> },
];


  return (
    <aside className="min-h-screen fixed z-50 lg:static w-64 bg-white border border-[#D0D5DD] border-t-0 text-black text-medium flex-col p-6">
      <div className="mb-6">
        <Link href="/" className=" flex items-center ">
          <Image
            src="/etihuku_logo.png"
            alt="etihuku logo"
            width={200}
            height={50}
            className="object-contain items-center"
          />
        </Link>
        
      </div>
      <nav className="flex flex-col gap-[15px]">
        {navItems.map(({ href, label, icon }) => (
          <Link
            key={href}
            href={href}
            className={`group flex items-center gap-3 p-2 rounded ${
              pathname === href
                ? "bg-[#4F46E5] text-white"
                : "hover:bg-[#4F46E5] hover:text-white"
            }`}
          >
            <span className={`${pathname === href ? 'text-white' : 'text-[#4F46E5]'} group-hover:text-white`}>
  {icon}
</span>

            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
