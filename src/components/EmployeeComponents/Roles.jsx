"use client";
import { roles } from "@/data/adminData/roles";

const columns = [
  { key: "no", title: "No" },
  { key: "roleName", title: "Role Name" },
  { key: "description", title: "Description" },
  { key: "noOfMembers", title: "No of Members" },
];

export default function Roles() {
  return (
    <div className="p-4">
      <h1 className="text-lg text-black font-semibold mb-4">Roles</h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
        <table className="min-w-full text-sm text-gray-700">
          <thead>
            <tr className="border-b border-[#D0D5DD]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className=" px-4 py-6 text-left font-medium text-gray-600"
                >
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {roles.map((role, idx) => (
              <tr
                key={idx}
                className="border-b border-[#D0D5DD] hover:bg-gray-50 transition "
              >
                <td className="px-4 py-6">{role.id}</td>
                <td className="px-4 py-6">{role.name}</td>
                <td className="px-4 py-6">{role.description}</td>
                <td className="px-4 py-6">{role.members}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex justify-start"></div>
    </div>
  );
}
