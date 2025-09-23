import SearchInput from "./SearchInput";
import FilterDropdown from "./FilterDropdown";

export default function EmployeeFilters({
  searchTerm,
  setSearchTerm,
  filters,
  setFilters,
  uniqueValues,
  filterKeys,
}) {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2 mb-4">
      <div className="pt-5">
        <SearchInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        {filterKeys.map((key) => (
          <FilterDropdown
            key={key}
            label={key.charAt(0).toUpperCase() + key.slice(1)}
            value={filters[key] || ""}
            options={uniqueValues[key]}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, [key]: e.target.value }))
            }
          />
        ))}
      </div>
    </div>
  );
}
