"use client"

import { Button } from '@/components/ui/button'
import { user } from '@prisma/client'
import axios from 'axios'
import { Loader, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

import React, { useState } from 'react'
import { toast } from 'sonner'

interface Props {
    intialdata: user
}

const DeleteUser = ({intialdata}: Props) => {

    const [isDeleting,setIsdeleting] = useState(false)

    const router = useRouter()

    const deleteUser = async () => {
        try {
            setIsdeleting(true)
            toast("user is deleting...")
            const response = await axios.delete(`api/user/${intialdata.id}`)

            if (response.status === 201) {
                toast("user is deleted");
                router.refresh()
            }
        } catch (error) {
            toast("Something is worng");
        } finally {
            setIsdeleting(false)
        }
    }

    return (
        <Button className='flex items-center justify-center bg-red-500' onClick={deleteUser}>
            {isDeleting ? <Loader className='w-5 h-5 animate-spin' /> : <Trash2 className='w-5 h-5' /> }
        </Button>
    )
}

export default DeleteUser