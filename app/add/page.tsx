"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { usePathname, useRouter } from "next/navigation"
import axios from 'axios'
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { z } from "zod"
import { useState } from "react"
import { Loader } from "lucide-react"

const formSchema = z.object({
    nom: z.string().min(2, {
        message: "nom is required "
    }).max(20),
    prenom: z.string().min(2, {
        message: "prenom is required "
    }).max(20),
    pays: z.string().min(2, {
        message: "pays is required "
    }).max(20),
})

const pagAdd =  () => {

    const [isSubmitting,setIsSubmitting] = useState(false)

    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {

        try {
            toast("user is created...")
            setIsSubmitting(true)
            const response = await axios.post("/api/user",{
                ...values
            })

            if(response.status === 201){
                
                toast("user is creatsed");
                router.push("/")
                router.refresh()
            }
        } catch (error) {
            toast("Something is worng");
        }finally {
            setIsSubmitting(false)
        }
    }



return (
    <div className="w-[80%] flex items-center justify-center mx-auto py-16 capitalize">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="nom"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>nom</FormLabel>
                            <FormControl>
                                <Input size={100} placeholder="nom" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="prenom"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>prenom</FormLabel>
                            <FormControl>
                                <Input placeholder="prenom" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="pays"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>pays</FormLabel>
                            <FormControl>
                                <Input placeholder="pays" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={isSubmitting} size={"lg"} className="w-full" type="submit">
                    Create
                    {isSubmitting && <Loader className="w-5 h-5 mr-2 animate-spin" />}
                </Button>
            </form>
        </Form>
    </div>
)
}
export default pagAdd