
import db from "@/prisma/client";
import Tabledata from "./_componrnts/Tabledata";
import { Pencil } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DeleteUser from "./_componrnts/DeleteUser";



export default async function Home() {

  const users = await db.user.findMany()

  return (
    <div className="mt-10 w-[75%] mx-auto flex flex-col items-center justify-center gap-5">
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
            {users.map((user, index) => {
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
    </div >
  );
}
