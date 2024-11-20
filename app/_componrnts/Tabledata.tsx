"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import DeleteUser from "./DeleteUser";
import { Pencil, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { user } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";


interface Props {
    users: user[]
}

const Tabledata = ({ users }: Props) => {


    const [user, setUser] = useState(users)
    const FilterInput = useRef<HTMLInputElement>(null);


    const handleInput = () => {

        if (FilterInput !== undefined && FilterInput.current !== null) {
            const FilterInputValue = FilterInput.current.value.trim()
            if (FilterInputValue !== '') {

                let usersTemp = users.filter((item, index) => {
                    return item.nom.startsWith(FilterInputValue)
                })
                setUser(usersTemp)
            }
            else {
                setUser(users)
            }
        }
    }


    return (
        <>
            <div className="w-full flex justify-start items-center gap-4">
                <Search className="w-8 h-8" />
                <Input placeholder="filter..." className="w-[30%]" ref={FilterInput} onChange={handleInput} />
            </div>
            <Table>
                <TableHeader>
                    <TableRow className="capitalize">
                        <TableHead className="w-[100px]">#Id</TableHead>
                        <TableHead>nom</TableHead>
                        <TableHead>prenom</TableHead>
                        <TableHead>pays</TableHead>
                        <TableHead>Update/Supprimer</TableHead>
                    </TableRow>
                </TableHeader>
                {users.length === 0 ? <h1>users est vide</h1> :
                    <TableBody>
                        {user.map((user, index) => {
                            return <TableRow key={index}>
                                <TableCell>{user.id.toString().slice(4, 7)}</TableCell>
                                <TableCell>{user.nom}</TableCell>
                                <TableCell>{user.prenom}</TableCell>
                                <TableCell>{user.pays}</TableCell>
                                <TableCell>
                                    <div className="flex gap-4 ">
                                        <Link href={`/${user.id}`} >
                                            <Button >
                                                <Pencil />
                                            </Button>
                                        </Link>
                                        <DeleteUser intialdata={user} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                }
            </Table>
        </>

    )
}

export default Tabledata