"use client";

const SummaryCard = ({ icon, label, value }) => {
  return (
    <div className="w-full h-[124px] p-4 border-[0.4px] border-[#D0D5DD] rounded-[8px] bg-white flex flex-col sm:flex-row items-center gap-[10px]">
      {/* Icon */}
      <div className="w-[40px] h-[40px] bg-[#4F46E5] rounded-full flex items-center justify-center">
        {icon}
      </div>

      {/* Text Block */}
      <div className="text-center sm:text-left">
        <div className="text-[12px] font-normal leading-[16px] text-gray-600 w-full h-[16px] mb-1">
          {label}
        </div>
        <div className="w-[110px] h-[24px] text-[20px] font-semibold leading-[32px] text-[#3A3A3C]">
          {value}
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
