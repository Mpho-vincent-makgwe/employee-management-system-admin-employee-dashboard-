import { FiChevronDown } from "react-icons/fi";

export default function FilterDropdown({ label, value, options, onChange }) {
  return (
    <div className="flex flex-col gap-1 w-[193px] pb-1">
      <span className="text-sm text-black">{label}</span>
      <div className="relative w-full h-[50px]">
        <select
          className="appearance-none w-full h-full px-3 pr-10 py-3 bg-white border border-gray-300 rounded-[4px] text-sm text-black "
          value={value}
          onChange={onChange}
        >
          <option value="">All {label}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black pointer-events-none" />
      </div>
    </div>
  );
}
