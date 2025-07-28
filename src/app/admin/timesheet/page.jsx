// "use client";

// import Table from "@/components/Table";
// import { timesheetData } from "@/data/adminData/timesheetData";

// const columns = [
//   { key: "date", title: "Date" },
//   { key: "status", title: "Status" },
//   { 
//     key: "clockIn", 
//     title: "Clock In",
//     render: (row) => <div className="text-center">{row.clockIn}</div>
//   },
//   { 
//     key: "clockOut", 
//     title: "Clock Out",
//     render: (row) => <div className="text-center">{row.clockOut}</div>
//   }
// ];

// const statusColorMap = {
//   Present: "text-green-500",
//   Late: "text-yellow-500",
//   Absent: "text-red-500"
// };

// export default function MyTimesheet() {
//   return (
//     <div className="p-4">
//       <Table
//         title="My Timesheet"
//         subtitle="Your latest attendance log"
//         columns={columns}
//         data={timesheetData}
//         statusColorMap={statusColorMap}
//         limit={5}
//         enablePagination={true}
//         stripedRows={true}
//       />
//     </div>
//   );
// }