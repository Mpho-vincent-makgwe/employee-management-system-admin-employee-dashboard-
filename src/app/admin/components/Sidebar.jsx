import Logo from "./Logo";
import NavLink from "./NavLink";
import {
  Home, Users, Clock, Banknote, Cake, Setting, LogOut,
  Settings} from 'lucide-react';


export default function Sidebar() {
    return (
        <aside className="min-h-screen fixed z-50 lg:static w-64 bg-white border border-[#D0D5DD] border-t-0 text-black text-medium flex-col p-6">
            <div>
                <Logo size="lg" />
            </div>

            <nav className="flex flex-col gap-[15px]">
        <NavLink href='/' Icon={Home} label="Dashboard"/>
        <NavLink href='/employeedirectory' Icon={Users} label="Employee Directory"/>
        <NavLink href='/timesheet' Icon={Clock}label="Timesheet"/>
        <NavLink href='/payroll'  Icon={Banknote} label="Payroll"/>
        <NavLink href='/birthday' Icon={Cake}label="Birthday"/>
        <NavLink href='/settings' Icon={Settings} label="Dashboard"/>
        <NavLink href='/'
        Icon={LogOut} label="Logout"/>
            </nav>
        </aside>
    )
}