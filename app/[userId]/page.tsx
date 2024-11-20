import db from '@/prisma/client'
import React from 'react'
import FormEdit from './_components/FormEdit'

const page = async ({ params }: { params: { userId: string } }) => {

    const user = await db.user.findUnique({
        where:{
            id: params.userId
        }
    })

    console.log(params.userId)


    return (
        <div className="w-[80%] flex items-center justify-center mx-auto py-16 capitalize">
            <FormEdit intialdata={user}/>
        </div>
    )
}

export default page