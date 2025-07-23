import Image from "next/image";
import Link from "next/link";

export default function Logo( { size = 'md'})  {
    const dimensions = {
        sm: 24,
        md: 36,
        lg: 48,
        }
        return (
            <div>
                <Link href='/' className="flex items-center">
                <Image 
                src= '/images/etihuku_logo.png'
                alt="Etihuku Logo"
                width= {dimensions[size]}
                height={dimensions[size]}
                className="object-contain"
                />
                </Link>
            </div>
        )
}