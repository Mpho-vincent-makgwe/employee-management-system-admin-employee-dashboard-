import Table from "../Table";
import { roles } from "@/data/adminData/roles";

const columns = [
  { key: "roleName", title: "Role Name" },
  { key: "description", title: "Description" },
  { key: "noOfMembers", title: "No of Members" },
  { key: "action", title: "Action" },
];

const data = roles.map((role) => ({
  roleName: role.name,
  description: role.description,
  noOfMembers: role.members,
  action: role.action,
}));

export default function Roles() {
  return (
    <div className="p-4">
      <h1 className="text-lg font-semibold mb-4">Roles</h1>
      {/* <Table
        columns={columns}
        data={data}
      
      /> */}
    </div>
  );
}
