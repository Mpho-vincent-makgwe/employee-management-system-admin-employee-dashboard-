import { Bell, CalendarDays, Cake } from "lucide-react";
import { FaBell, FaCalendar } from "react-icons/fa";
import { MdCake } from "react-icons/md";

const statusStyles = {
  meeting: {
    icon: (
      <FaBell className="text-[#4F46E5] w-5 sm:w-6 md:w-[16px] h-5 sm:h-6 md:h-[16px] flex-shrink-0" />
    ),
  },
  holiday: {
    icon: (
      <FaCalendar className="text-[#10B981] w-5 sm:w-6 md:w-[16px] h-5 sm:h-6 md:h-[16px] flex-shrink-0" />
    ),
  },
  birthday: {
    icon: (
      <MdCake className="text-[#D1A039] w-5 sm:w-6 md:w-[16px] h-5 sm:h-6 md:h-[16px] flex-shrink-0" />
    ),
  },
};

const NotificationCard = ({ status, title, message, timeAgo }) => {
  const styles = statusStyles[status];

  return (
    <div className="flex justify-between items-start w-full px-4 py-8 border-[0.6px] border-[#D0D5DD] rounded-[4px] bg-white gap-3">
      <div className="flex gap-[12px]">
        {styles.icon}
        <div>
          <h4 className="w-full text-[14px] leading-[22px] font-semibold text-[#2C2C2E]">
            {title}
          </h4>
          <p className="w-full text-[12px] leading-[20px] font-normal text-[#2C2C2E]">
            {message}
          </p>
        </div>
      </div>
      <span className="text-[12px] text-gray-400 whitespace-nowrap">
        {timeAgo}
      </span>
    </div>
  );
};

export default NotificationCard;
