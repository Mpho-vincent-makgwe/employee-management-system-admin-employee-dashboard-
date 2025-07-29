import CardTitle from "./CardTitle";
import Card from "./Card";

export default function Timesheet() {
  const timesheetData = [
    {
      name: 'Emmanuel Faremi',
      status: 'Present',
      inTime: '09:00 AM',
      outTime: '05:00 PM',
      hours: '8.0',
    },
    {
      name: 'Saheed Faremi',
      status: 'Late',
      inTime: '09:20 AM',
      outTime: '05:00 PM',
      hours: '8.0',
    },
    {
      name: 'Rukome Paul',
      status: 'Absent',
      inTime: null,
      outTime: null,
      hours: null,
    },
  ];

  const statusColors = {
    Present: 'bg-[#10B981] text-white',
    Late: 'bg-[#D1A039] text-white',
    Absent: 'bg-[#D11A2A] text-white',
  };

  return (
  <div className="flex flex-col gap-4 p-6 bg-white">
    <CardTitle level={5}>
        Yesterday's TimeSheet
    </CardTitle>
    {timesheetData.map((employee, idx) => (
      <Card key={idx} className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-black text-lg">{employee.name}</h3>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[employee.status]}`}
          >
            {employee.status}
          </span>
        </div>
        <div className="text-sm text-gray-700 space-y-1">
          <div><strong>In:</strong> {employee.inTime || '-'}</div>
          <div><strong>Out:</strong> {employee.outTime || '-'}</div>
          <div><strong>Hours:</strong> {employee.hours || '-'}</div>
        </div>
      </Card>
    ))}
  </div>
);

}
