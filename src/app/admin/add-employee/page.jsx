import AddEmployeeForm from "@/components/AdminComponents/dashboard/AddNewEmployee";
export default function AddEmployee() {
  return (
    <div>
      <div className="space-y-4 pt-4 text-black">
        <h2 className="text-2xl font-semibold">Add New Employee</h2>
        <p className="text-sm ">
          Enter employee information to add them to the system
        </p>
      </div>
      <div className="p-6 pt-6">
        <AddEmployeeForm />
      </div>
    </div>
  );
}
