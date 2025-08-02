import ProfileTable from "@/components/ProfileTable";
import { employeeData } from "@/data/adminData/employeeData";
import { notFound } from "next/navigation";

export default async function EmployeeProfilePage({ params }) {
  // Since we're using generateStaticParams, params will be available immediately
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
        
        <div className="mt-6 flex justify-start">
        <button 
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
            Delete User
        </button>
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