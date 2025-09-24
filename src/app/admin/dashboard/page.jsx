import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import OverViewCards from "@/components/AdminComponents/dashboard/OverViewCards";
import BarChart from "@/components/AdminComponents/dashboard/BarChart";
import PieChart from "@/components/AdminComponents/dashboard/PieChart";
import Timesheet from "@/components/AdminComponents/dashboard/Timesheet";
import CustomButton from "@/components/ui/CustomButton";
import Button from "@/components/ui/Button";

export default function Dashboard() {
  return (
    <div className="px-6 py-5 overflow-x-hidden overflow-y-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 w-full gap-3 text-black">
        <div className="space-y-2">
          <h2 className="text-2xl">Dashboard Overview</h2>
          <p className="text-sm">
            Welcome back! Here's what's happening with your team today.
          </p>
        </div>

        <Link href="/admin/add-employee">
          <CustomButton
            text="Add New Employee"
            icon={<FiPlus className="text-xl text-white" />}
            variant="primary"
            size="medium"
          />
        </Link>
      </div>
      <div className="mb-6">
        <OverViewCards />
      </div>
      <div className="flex flex-wrap xl:flex-nowrap gap-6">
        <div className="flex-[0_0_70%]">
          <BarChart />
        </div>
        <div className="flex-[0_0_30%] pr-20">
          <PieChart />
        </div>
      </div>

      <div className="mt-6">
        <Timesheet />
      </div>
    </div>
  );
}
