"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { employeeData } from "@/data/adminData/employeeData";
import DetailField from "@/components/AdminComponents/DetailField";
import CustomButton from "@/components/ui/CustomButton";
import NotificationModal from "@/components/AdminComponents/NotificationModal";
import { FaTrashAlt } from "react-icons/fa";

export default function EmployeeProfilePage() {
  const { id } = useParams();
  const employee = employeeData.find((emp) => emp.id.toString() === id);

  const [showDelete, setShowDelete] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  if (!employee) {
    return <div className="p-6 text-red-500">Employee not found.</div>;
  }

  const handleDeleteClick = () => {
    console.log("delete clicked!");
    setSelectedEmployee(employee);
    setShowDelete(true);
  };

  const onConfirm = () => {
    console.log(`User deleted: ${selectedEmployee.name}`);
    setShowDelete(false);
    setSelectedEmployee(null);
  };

  const onCancel = () => {
    setShowDelete(false);
    setSelectedEmployee(null);
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white rounded-lg p-6">
        <div className="col-span-1 flex flex-col items-center">
          <img
            src={
              employee.profilePicture ||
              "https://placehold.co/140x140/cccccc/333333?text=employee"
            }
            alt={employee.name}
            className="w-40 h-40 rounded-full object-cover border-4 border-indigo-200 mb-4"
          />
          <button className="text-sm font-medium text-black">
            Change Picture
          </button>
        </div>

        <div className="col-span-1 md:col-span-2 pl-5 border-l border-gray-100">
          <h2 className="text-lg font-semibold text-indigo-600 mb-4">
            Personal Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-7">
            {employee.personalDetails.map((field, index) => (
              <DetailField
                key={index}
                label={field.label}
                value={field.value}
              />
            ))}
          </div>

          <h2 className="text-lg font-semibold text-indigo-600 mb-4">
            Job Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {employee.jobDetails.map((field, index) => (
              <DetailField
                key={index}
                label={field.label}
                value={field.value}
              />
            ))}
          </div>

          <CustomButton
            text="Delete User"
            variant="danger"
            size="medium"
            type="button"
            className="w-1/2 mt-8"
            onClick={handleDeleteClick}
          />
        </div>
      </div>

      {selectedEmployee && (
        <NotificationModal
          show={showDelete}
          close={onCancel}
          icon={<FaTrashAlt className="w-6 h-6 text-white" />}
          message={`Are you sure you want to delete ${selectedEmployee.name}?`}
          confirmText="Yes, Delete"
          cancelText="No, Cancel"
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      )}
    </div>
  );
}
