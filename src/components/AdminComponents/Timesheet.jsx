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
      <CardTitle level={5}>Yesterday's TimeSheet</CardTitle>
      {timesheetData.map((employee, idx) => (
        <Card key={idx} className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#4F46E5] rounded-full flex items-center justify-center text-white text-lg">
              EF
            </div>
            <h3 className="text-black text-lg">{employee.name}</h3>
          </div>
       <div className="flex items-start justify-between text-sm text-gray-700">
  <div className="ml-[52px] flex gap-4 items-center">
    <p>In: {employee.inTime || '-'}</p>
    <p>Out: {employee.outTime || '-'}</p>
    <p>Hours: {employee.hours || '-'}</p>
  </div>
  <span
    className={`px-2 py-1 rounded-[8px] font-medium text-xs text-center min-w-[80px] ${statusColors[employee.status]}`}
  >
    {employee.status}
  </span>
</div>



        </Card>
      ))}
    </div>
  );
}
