import Card from "../../ui/Card";
import { FiUsers, FiCheckCircle, FiMinusCircle, FiClock } from "react-icons/fi";

export default function OverViewCards() {
  const overview = [
    {
      label: "Total Employees",
      value: 35,
      icon: <FiUsers className="text-white text-2xl" />,
    },
    {
      label: "Present Today",
      value: 16,
      icon: <FiCheckCircle className="text-white text-2xl" />,
    },
    {
      label: "On Leave",
      value: 16,
      icon: <FiMinusCircle className="text-white text-2xl" />,
    },
    {
      label: "Hours Logged This Week",
      value: "1,600",
      icon: <FiClock className="text-white text-2xl" />,
    },
  ];

  return (
    <div className="flex flex-col  xl:flex-row items-center w-full gap-[18px]">
      {overview.map((item, index) => (
        <Card
          key={index}
          className="h-[130px] w-full xl:max-w-none"
          //   border="0.6px solid  "
          yy
        >
          <div className="flex items-center h-full gap-5 w-full text-black">
            <div className="w-[48px] h-[48px] flex items-center justify-center rounded-full bg-[#4F46E5]">
              {item.icon}
            </div>
            <div className="flex flex-col items-start">
              <p className="text-sm font-small">{item.label}</p>
              <p className="text-xl font-bold mt-1">{item.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
