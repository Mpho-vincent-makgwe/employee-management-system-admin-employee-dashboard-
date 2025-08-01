import ProfileTable from "@/components/ProfileTable";
import { employeeData } from "@/data/adminData/employeeData";
import { notFound } from "next/navigation";

export default function EmployeeProfilePage({ params }) {
  const employee = employeeData.find(emp => emp.id.toString() === params.id);
  
  if (!employee) {
    return notFound();
  }

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <ProfileTable
            profilePicture={{
              image: employee.profilePicture,
              changeText: "Change Picture"
            }}
            personalDetails={employee.personalDetails}
            jobDetails={employee.jobDetails}
            editable={false}
          />
        </div>
  
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return employeeData.map(employee => ({
    id: employee.id.toString()
  }));
}