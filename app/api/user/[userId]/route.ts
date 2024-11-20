import db from "@/prisma/client";
import { AwardIcon } from "lucide-react";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(reqeust: NextRequest, { params }: { params: { userId: string } }) {

    const body = await reqeust.json()

    const user = await db.user.findUnique({
        where: {
            id: params.userId
        }
    })

    if (!user) {
        return NextResponse.json("user not founded", { status: 404 })
    }

    const updateUser = await db.user.update({
        where: {
            id: params.userId
        },
        data: {
            ...body
        }
    })

    return NextResponse.json(updateUser, { status: 201 })
}


export async function GET(reqeust: NextRequest, { params }: { params: { userId: string } }) {


    const user = await db.user.findUnique({
        where: {
            id: params.userId
        }
    })

    if (!user) {
        return NextResponse.json("user not founded", { status: 404 })
    }


    return NextResponse.json(user, { status: 201 })
}


export async function DELETE(reqeust: NextRequest,{ params }: { params: { userId: string } }){

    const user = await db.user.findUnique({
        where:{
            id: params.userId
        }
    })

    if (!user) {
        return NextResponse.json("user not founded", { status: 404 })
    }

    const deletedUser = await db.user.delete({
        where: {
            id: params.userId
        }
    })

    return NextResponse.json(deletedUser,{status : 201})

}