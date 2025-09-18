import SearchInput from "./SearchInput";
import FilterDropdown from "./FilterDropdown";

export default function EmployeeFilters({
  searchTerm,
  setSearchTerm,
  roleFilter,
  setRoleFilter,
  statusFilter,
  setStatusFilter,
  uniqueRoles,
  uniqueStatuses,
}) {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2 mb-4">
      <div className="pt-5
      ">
        <SearchInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <FilterDropdown
          label="Role"
          value={roleFilter}
          options={uniqueRoles}
          onChange={(e) => setRoleFilter(e.target.value)}
        />
        <FilterDropdown
          label="Status"
          value={statusFilter}
          options={uniqueStatuses}
          onChange={(e) => setStatusFilter(e.target.value)}
        />
      </div>
    </div>
  );
}
