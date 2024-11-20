"use client"


import Link from "next/link"
import { Button } from "./ui/button"
import { usePathname } from "next/navigation"
import { Underline } from "lucide-react"
import { ModeToggle } from "./ModeToggle"


const Links = [
    {
        name: "List",
        path: "/"
    },
    {
        name: "Add",
        path: "/add"
    },
]

const Navbar = () => {

    const pathname = usePathname()


    return (
            <nav className="w-full h-[70px] mx-auto flex items-center justify-center gap-6 py-5 px-10 shadow-md">
                {Links.map((item,index) => {
                    return (
                        <Link key={index} href={item.path}>
                            <Button variant={"link"} className={`${pathname === item.path && 'underline'} text-3xl `} >
                                {item.name}
                            </Button>
                        </Link>
                    )
                })}
                <ModeToggle />
            </nav>
    )
}

export default Navbar