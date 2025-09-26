import { FaBell, FaCalendar } from "react-icons/fa";
import { MdCake } from "react-icons/md";
import Card from "@/components/ui/Card";

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
 <Card
      padding="32px 16px"
      border="0.6px solid #D0D5DD"
      className="flex justify-between items-start gap-3"
    >
      <div className="flex gap-[12px]">
        {styles.icon}
        <div>
          <h4 className="text-[14px] leading-[22px] font-semibold text-[#2C2C2E]">
            {title}
          </h4>
          <p className="text-[12px] leading-[20px] font-normal text-[#2C2C2E]">
            {message}
          </p>
        </div>
      </div>
      <span className="text-[12px] text-gray-400 whitespace-nowrap">
        {timeAgo}
      </span>
    </Card>
  );
};

export default NotificationCard;
