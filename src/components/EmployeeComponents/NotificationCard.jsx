import { Bell, CalendarDays, Cake } from "lucide-react";

const statusStyles = {
  meeting: {
    icon: <Bell className="text-indigo-500 w-14 h-14" />,
    border: "border-indigo-100",
  },
  holiday: {
    icon: <CalendarDays className="text-green-500 w-14 h-14" />,
    border: "border-green-100",
  },
  birthday: {
    icon: <Cake className="text-amber-500 w-14 h-14" />,
    border: "border-amber-100",
  },
};

const NotificationCard = ({ status, title, message, timeAgo }) => {
  const styles = statusStyles[status];

  return (
    <div className="flex justify-between items-start w-full px-4 py-8 border-[0.6px] border-[#D0D5DD] rounded-[4px] bg-white gap-3">
      <div className="flex items-start gap-[12px]">
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
