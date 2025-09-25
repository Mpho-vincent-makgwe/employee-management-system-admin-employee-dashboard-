import AddEmployeeForm from "@/components/AdminComponents/dashboard/AddNewEmployee";
import Heading from "@/components/ui/Heading";
export default function AddEmployee() {
  return (
    <div>
      <div className="space-y-4 pt-4 text-black">
        <Heading
          title="Add New Employee"
          subtitle="Enter employee information to add them to the system"
        />
      </div>
      <div className="p-6 pt-6">
        <AddEmployeeForm />
      </div>
    </div>
  );
}
