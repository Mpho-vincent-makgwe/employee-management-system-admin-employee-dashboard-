import Table from "../Table";
import { roles } from "@/data/adminData/roles";

const columns = [
   { key: "roleName", title: "Role Name" },
  { key: "description", title: "Description" },
  { key: "noOfMembers", title: "No of Members" },
  { key: "action", title: "Action" }  
]

export default function Roles() {
    return (
        <div className="p-4">
            {/* <Table
           columns={columns}
           data={roles}
          viewMoreLink={{ href: "/employees", text: "View All Employees" }}
            /> */}
        </div>
    )
}