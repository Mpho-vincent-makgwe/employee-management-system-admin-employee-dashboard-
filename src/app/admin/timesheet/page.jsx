import TimesheetCards from "@/components/AdminComponents/TimesheetCards"
import TimesheetTracking from "@/components/AdminComponents/TimeSheetTracking"

export default function Timesheet() {
    return(
        <div>
            
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Timesheet Tracking</h1>
        <p className="text-sm text-gray-600">
          Attendance and working hours on the 4th of July, 2025
        </p>
      </div>
        <TimesheetCards/>
        <TimesheetTracking />
        </div>

    )
}