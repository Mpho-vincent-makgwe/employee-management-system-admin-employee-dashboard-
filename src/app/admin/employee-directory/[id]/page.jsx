"use client";

import { useState } from "react";
import { employeeData } from "@/data/adminData/employeeData";
import DetailField from "@/components/AdminComponents/DetailField";
import CustomButton from "@/components/Buttons/CustomButton";
import NotificationModal from "@/components/AdminComponents/NotificationModal";
import { FaTrashAlt } from "react-icons/fa";

export default function EmployeeProfilePage() {
  const [showDelete, setShowDelete] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleDeleteClick = (user) => {
    console.log("delete clicked!");
    setSelectedUser(user);
    setShowDelete(true);
  };

  const onConfirm = () => {
    console.log(`User deleted: ${selectedUser.name}`);
    setShowDelete(false);
    setSelectedUser(null);
  };

  const onCancel = () => {
    setShowDelete(false);
    setSelectedUser(null);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 w-full"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white rounded-lg p-6">
        <div className="col-span-1 flex flex-col items-center">
          <img
            src={
              employeeData.profilePicture ||
              "https://placehold.co/140x140/cccccc/333333?text=employeeData"
            }
            alt={`${employeeData.firstName} ${employeeData.lastName}`}
            className="w-40 h-40 rounded-full object-cover border-4 border-indigo-200 mb-4"
          />
          <button className=" text-sm font-medium text-black">
            Change Picture
          </button>
        </div>

        <div className="col-span-1 md:col-span-2 pl-5 border-l border-gray-100">
          <h2 className="text-lg font-semibold text-indigo-600 mb-4">
            Personal Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-7">
            <DetailField label="First Name" value={employeeData.firstName} />
            <DetailField label="Last Name" value={employeeData.lastName} />
            <DetailField label="Gender" value={employeeData.gender} />
            <DetailField label="DOB" value={employeeData.dob} />
            <DetailField
              label="Marital Status"
              value={employeeData.maritalStatus}
            />
            <DetailField label="Nationality" value={employeeData.nationality} />
            <DetailField label="Email Address" value={employeeData.email} />
            <DetailField
              label="Home Address"
              value={employeeData.homeAddress}
            />
            <DetailField
              label="Contact Number"
              value={employeeData.contactNumber}
            />
            <DetailField
              label="Emergency Number"
              value={employeeData.emergencyNumber}
            />
          </div>

          <h2 className="text-lg font-semibold text-indigo-600 mb-4">
            Job Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DetailField label="Employee ID" value={employeeData.employeeId} />
            <DetailField label="Manager" value={employeeData.manager} />
            <DetailField
              label="Employment Type"
              value={employeeData.employmentType}
            />
            <DetailField
              label="Date of Joining"
              value={employeeData.dateOfJoining}
            />
            <DetailField label="Work Email" value={employeeData.workEmail} />
            <DetailField
              label="Work Location"
              value={employeeData.workLocation}
            />
          </div>
          <CustomButton
            text="Delete User"
            variant="danger"
            size="medium"
            type="button"
            className="w-1/2  mt-8"
            onClick={() => handleDeleteClick()}
          />
        </div>
      </div>
      {selectedUser && (
        <NotificationModal
          show={showDelete}
          close={onCancel}
          icon={<FaTrashAlt className="w-6 h-6 text-white" />}
          message={'Are you sure you want to delete this user?'}
          confirmText="Yes, Delete"
          cancelText="No, Cancel"
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      )}
    </div>
  );
}
