export default function Heading({
  title,
  subtitle,
  className = "",
  position = false,
}) {
  return (
    <div
      className={`w-full h-full mt-2 mb-4 bg-gray-100 ${
        position ? "" : ""
      } ${className}`}
    >
      <h1 className="text-[20px] leading-[30px] font-medium text-[#2C2C2E]">
        {title}
      </h1>
      <p className="text-sm leading-[22px] font-normal text-[#3A3A3C]">
        {subtitle}
      </p>
    </div>
  );
}
