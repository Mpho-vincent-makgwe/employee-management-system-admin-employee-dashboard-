import Table from "@/components/ui/Table";
import birthdayData from "@/data/employeeData/birthdayData";
import EmployeeFilters from "@/components/ui/EmployeeFilters";
import { Filters } from "@/hooks/Filters";

const columns = [
  { key: "name", title: "Name" },
  { key: "dob", title: "D.O.B" },
  { key: "role", title: "Role" },
  { key: "employmentType", title: "Employment Type" },
  { key: "dateJoined", title: "Date Joined" },
  { key: "dayOfWeek", title: "Day of the week" },
];

export default function BirthdayTable() {
  const {
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    uniqueValues,
    filteredData,
  } = Filters(birthdayData, columns);

  return (
    <div className="mr-4">
      <EmployeeFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filters={filters}
        setFilters={setFilters}
        uniqueValues={uniqueValues}
        filterKeys={["role", "employmentType"]}
      />

      {/* Table component */}
      <Table
        columns={columns}
        data={filteredData.map((employee) => ({
          ...employee,
          action: { text: "View" },
        }))}
        limit={5}
        enablePagination={true}
        stripedRows={true}
        sortable={true}
      />
    </div>
  );
}
