// 'use client'
// import { useState } from "react"
// import Link from "next/link"

// export default function DropdownMenu ({
//     trigger,
//   items = [],
//   position = "right",
//   width = 48,
// }) {
//     const [open, setOpen] = useState(false)

//     return (
//         <div className="relative ">
//             <div 
//             onClick={() => setOpen(!open)}
//             className="cursor-pointer flex items-start gap-2 ">{trigger}</div>
//             {open && (
//                 <div className={`absolute mt-2 ${position}-0 ${width} bg-white   rounded shadow z-50 items-start w-30`}>
//                     {items.map((item, index) => (
//                         <Link
//                         key={index}
//                         href={item.href}
//                          className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
//                          onClick={() => setOpen(false)}>
//                             {item.label}
//                          </Link>
//                     ))}
//                 </div>
//             )}
//         </div>
//     )
// }