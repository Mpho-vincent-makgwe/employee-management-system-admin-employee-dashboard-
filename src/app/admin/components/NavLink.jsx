'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function NavLink ( {onClickHandler, href, Icon, label}) {
    const pathname = usePathname()
    const isActive = pathname === href

    return (
        <Link 
        href= {href}
        onClick={onClickHandler}
        className={`group flex items-center gap-3 p-2 rounded ${isActive? "bg-[#4F46E5] text-white" : "hover:bg-[#4F46E5] hover:text-white"}`}>
        <Icon
        size={18}
        className={`${isActive ? 'text-white' : 'text-[#4F46E5]'} group-hover:text-white`}
      />
      {label}
        </Link>

    )
}