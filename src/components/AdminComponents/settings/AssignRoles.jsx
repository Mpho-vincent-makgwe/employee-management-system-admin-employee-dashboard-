"use client";
import { useState } from "react";
import CustomButton from "@/components/ui/CustomButton";

export default function AssignRoles({ assign }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  });

  const roles = ["Admin", "Manager", "Editor", "Viewer"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    console.log("Cancel clicked");
  };

  const handleAssign = () => {
    console.log("Assigned Role:", formData);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md ">
      <h2 className="text-lg text-[#4F46E5] mb-6">Assign Roles</h2>

      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-[493px] px-4 py-2 border border-[#D0D5DD] rounded-sm focus:outline-none focus:ring-1 focus:ring-[#4F46E5]"
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-[493px] px-4 py-2 border border-[#D0D5DD] rounded-sm focus:outline-none focus:ring-1 focus:ring-[#4F46E5]"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-[493px] px-4 py-2 border border-[#D0D5DD] rounded-sm focus:outline-none focus:ring-1 focus:ring-[#4F46E5]"
            />
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Role Type
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-[493px] text-black px-4 py-2 border border-[#D0D5DD] rounded-sm focus:outline-none focus:ring-1 focus:ring-[#4F46E5]"
            >
              <option value="" disabled>
                Select a role
              </option>
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-6">
          <CustomButton
            type="button"
            onClick={handleAssign}
            text="Assign"
            variant="primary"
            size="medium"
            className="w-[212px] h-[50px]"
          />

          <CustomButton
            type="button"
            onClick={handleCancel}
            text="Cancel"
            variant="outline"
            size="medium"
            className="w-[212px] h-[50px] "
          />
        </div>
      </form>
    </div>
  );
}
