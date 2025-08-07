import Card from "@/components/AdminComponents/Card";
import CardTitle from "@/components/AdminComponents/CardTitle";

import {FiBell, FiCalendar, FiXCircle, FiClock} from "react-icons/fi"; 
import { FaCheckCircle, FaBirthdayCake } from "react-icons/fa"; 

const notificationData = [
  {
    id: 1,
    title: "New Employee Added",
    message: "Rukome Paul was added to the system as a Graphic Designer in the Marketing department.",
    time: "2 hours ago",
    icon: <FiBell className="text-[#4F46E5]" />,
  },
  {
    id: 2,
    title: "Late Clock-In Alert",
    message: "Saheed Faremi clocked in 25 minutes late today.",
    time: "2 hours ago",
    icon: <FiClock className="text-[#10B981]" />,
  },
  {
    id: 3,
    title: "Upcoming Birthday's",
    message: "Emmanuel Faremi birthday is in 2 days (July 7). Consider sending a greeting!",
    time: "2 hours ago",
    icon: <FaBirthdayCake className="text-[#D1A039]" />,
  },
  {
     id: 4,
    title: "New Employee Added",
    message: "Rukome Paul was added to the system as a Graphic Designer in the Marketing department.",
    time: "2 hours ago",
    icon: <FiBell className="text-[#4F46E5]" />,
  },
  {
   id: 5,
    title: "Late Clock-In Alert",
    message: "Saheed Faremi clocked in 25 minutes late today.",
    time: "2 hours ago",
    icon: <FiClock className="text-[#10B981]" />,
  },
  {
    id: 6,
    title: "Upcoming Birthday's",
    message: "Emmanuel Faremi birthday is in 2 days (July 7). Consider sending a greeting!",
    time: "2 hours ago",
    icon: <FaBirthdayCake className="text-[#D1A039]" />,
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
            className="flex flex-col sm:flex-row items-center justify-between gap-3 border border-[#D9D9D90D] p-4 rounded-md h-auto min-h-[130px]"
            backgroundColor="[#D0D5DD]"
          >
            <div className="flex items-start gap-3 w-full sm:w-auto">
              <div className="bg-opacity-10 rounded-full p-2 flex items-center justify-center">
                {item.icon}
              </div>
              <div className="space-y-2 w-full">
                <CardTitle level={5} className="text-base text-[#2c2c2e]">
                  {item.title}
                </CardTitle>
                <p className="text-sm text-[#3A3A3C]">{item.message}</p>
              </div>
            </div>

            <div className="text-xs text-gray-500 sm:text-right mt-2 sm:mt-0 sm:self-center sm:ml-auto">
              {item.time}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
