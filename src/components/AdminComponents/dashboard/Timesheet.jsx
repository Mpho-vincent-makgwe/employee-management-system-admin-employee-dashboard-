import CardTitle from "../CardTitle";
import Card from "../Card";

export default function Timesheet() {
  const timesheetData = [
    {
      name: "Emmanuel Faremi",
      initials: "EF",
      status: "Present",
      inTime: "09:00 AM",
      outTime: "05:00 PM",
      hours: "8.0",
    },
    {
      name: "Saheed Faremi",
      initials: "SF",
      status: "Late",
      inTime: "09:20 AM",
      outTime: "05:00 PM",
      hours: "8.0",
    },
    {
      name: "Rukome Paul",
      initials: "RP",
      status: "Absent",
      inTime: null,
      outTime: null,
      hours: null,
    },
  ];

  const statusColors = {
    Present: "bg-[#10B981] text-white",
    Late: "bg-[#D1A039] text-white",
    Absent: "bg-[#D11A2A] text-white",
  };

  return (
    <div className="p-6 space-y-4 bg-white">
      <CardTitle level={5}>Yesterday's TimeSheet</CardTitle>
      {timesheetData.map((employee, idx) => (
        <Card key={idx} backgroundColor="bg-[#D0D5DD]">
          <div className="flex justify-between items-center h-full p-4">
            <div className="flex items-center gap-5">
              <div className="w-[48px] h-[48px] flex items-center justify-center rounded-full bg-[#4F46E5] text-white font-medium">
                {employee.initials}
              </div>
              <div className="flex flex-col items-start gap-1">
                <h3 className="text-base text-gray-800">{employee.name}</h3>
                <div className="flex gap-4 text-sm text-[#2C2C2E]">
                  <p>In: {employee.inTime || "-"}</p>
                  <p>Out: {employee.outTime || "-"}</p>
                  <p>Hours: {employee.hours || "-"}</p>
                </div>
              </div>
            </div>

            <span
              className={`text-xs font-medium text-center bg-opacity-100 rounded-[8px] px-[10px] py-[10px] min-w-[79px] h-[25px] flex items-center justify-center ${
                statusColors[employee.status]
              }`}
            >
              {employee.status}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
}
