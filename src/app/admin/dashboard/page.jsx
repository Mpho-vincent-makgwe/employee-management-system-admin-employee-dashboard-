import Link from "next/link"
import { FiPlus } from "react-icons/fi"


export default function Dashboard() {
    return (
        <div className="px-6 py-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 w-full gap-3">
    <div className="space-y-2">
      <h2 className="text-2xl font-semibold">Dashboard Overview</h2>
      <p className="text-sm">Welcome back! Here's what's happening with your team today.</p>
    </div>

    <Link href="/policies/addpolicy">
      <button className="flex items-center gap-2 px-6 py-2 bg-[#4F46E5] text-white text-sm rounded-sm hover:bg-[#4338ca] transition">
        <FiPlus className="text-xl text-white" />
        Add New Employee
      </button>
    </Link>
  </div>
        </div>
    )
}