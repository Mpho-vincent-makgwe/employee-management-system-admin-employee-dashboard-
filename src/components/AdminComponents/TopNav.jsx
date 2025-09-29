"use client";
import DropdownMenu from "../ui/DropdownMenu";
import SearchBar from "../ui/SearchBar";

export default function TopNav() {
  const handleSearch = (query) => {};

  return (
    <header className=" z-40 flex justify-between items-center px-8 py-4 bg-white shadow">
      <SearchBar onSearch={handleSearch} />

      <DropdownMenu
        trigger={
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="relative w-10 h-10">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-[#4f46e5] font-semibold text-lg">
                R
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#4f46e5] rounded-full border border-white" />
            </div>

            <div className="flex flex-col items-start">
              <span className="text-sm font-medium text-[#3a3a3c]">
                Rukome Paul
              </span>
              <span className="text-xs text-gray-500">Admin</span>
            </div>

            <i className="ri-arrow-down-s-line text-[#4F46E5] font-bold text-xl"></i>
          </div>
        }
        items={[
          { label: "Settings", href: "/settings" },
          { label: "Logout", href: "#" },
        ]}
      />
    </header>
  );
}
