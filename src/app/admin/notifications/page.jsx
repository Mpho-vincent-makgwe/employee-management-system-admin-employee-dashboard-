import Card from "@/components/AdminComponents/Card";
import CardTitle from "@/components/AdminComponents/CardTitle";

import {FiBell, FiCalendar, FiXCircle} from "react-icons/fi"; 
import { FaCheckCircle } from "react-icons/fa"; 

const notificationData = [
  {
    id: 1,
    title: "New Leave Request",
    message: "John Smith has submitted a new annual leave request",
    time: "2 hours ago",
    icon: <FiBell className="text-[#4F46E5]" />,
  },
  {
    id: 2,
    title: "Leave Request Approved",
    message: "Sarah Johnson's sick leave request has been approved",
    time: "2 hours ago",
    icon: <FaCheckCircle className="text-[#10B981]" />,
  },
  {
    id: 3,
    title: "Leave Request Approved",
    message: "Sarah Johnson's sick leave request has been approved",
    time: "2 hours ago",
    icon: <FaCheckCircle className="text-[#10B981]" />,
  },
  {
    id: 4,
    title: "Upcoming Leave Reminder",
    message: "Mike Davis's leave starts tomorrow (March 15, 2024)",
    time: "1 day ago",
    icon: <FiCalendar className="text-[#F59E0B]" />,
  },
  {
    id: 5,
    title: "New Leave Request",
    message: "John Smith has submitted a new annual leave request",
    time: "2 hours ago",
    icon: <FiBell className="text-[#4F46E5]" />,
  },
  {
    id: 6,
    title: "Leave Request Rejected",
    message: "Emily Brown's personal leave request has been rejected",
    time: "1 day ago",
    icon: <FiXCircle className="text-[#D11A2A]" />,
  },
];


export default function Notifications() {
  return (
    <div className="bg-white p-4">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-black">Notifications</h2>
        <p className="text-sm text-black">
          Stay updated with leave management activities
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 mt-6">
        {notificationData.map((item) => (
          <Card
            key={item.id}
            className="flex flex-col sm:flex-row items-start justify-between gap-3 border border-[#d0d5dd] p-4 rounded-md h-auto min-h-[130px]"
            backgroundColor="[#D0D5DD]"
          >
            <div className="flex items-start gap-3 w-full sm:w-auto">
              <div className="bg-opacity-10 rounded-full p-2 flex items-center justify-center">
                <i className={`${item.icon} text-xl text-[#4F46E5]`} />
              </div>
              <div className="space-y-2 w-full">
                <CardTitle level={5} className="text-base text-[#2c2c2e]">
                  {item.title}
                </CardTitle>
                <p className="text-sm text-[#2c2c2e]">{item.message}</p>
              </div>
            </div>

            <div className="text-xs text-gray-500 sm:text-right mt-2 sm:mt-0 sm:self-start sm:ml-auto">
              {item.time}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
