import { FaSearch } from "react-icons/fa";

export default function SearchInput({ value, onChange }) {
  return (
    <div className="relative w-[760px] h-[50px]">
      <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
      <input
        type="text"
        className="w-full h-full pl-10 pr-3 py-3 bg-white border border-gray-300 rounded-[4px] text-sm placeholder-gray-500 "
        placeholder="Search employees"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
