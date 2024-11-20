import db from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(reqeust: NextRequest){

    const body = await reqeust.json()

    const newUser = await db.user.create({
        data: {
            ...body
        }
    })

    return NextResponse.json(newUser,{status: 201})
}

export async function GET(){
    const Users = await db.user.findMany()

    return NextResponse.json(Users,{status: 201})
}