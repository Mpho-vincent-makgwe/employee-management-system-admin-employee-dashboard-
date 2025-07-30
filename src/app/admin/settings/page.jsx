import CompanyInfo from "@/components/AdminComponents/CompanyInfo"
import Profile from "@/components/AdminComponents/Profile"
import ForgotPassword from "@/components/AdminComponents/ForgotPassword"
export default function Settings() {
    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 w-full">
  <div className="space-y-2">
    <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
    <p className="text-sm">Manage your personal information and account settings.</p>
  </div>

</div>
<Profile/>
<CompanyInfo/>
<ForgotPassword/>
        </div>
    )
}