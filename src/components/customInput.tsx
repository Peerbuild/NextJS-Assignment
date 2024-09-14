"use client"

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Toaster } from "@/components/ui/toaster"
import Image from 'next/image'

const FormSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
})

export function EmailSubscriptionForm() {
    const { toast } = useToast()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema), 
        defaultValues: {
            email: "",
        },
    })
   
     
    
    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            variant: 'subscribed',
            icon: (
                <Image
                    src="/checkcircle.svg"
                    alt="Check"
                    width={20}  
                    height={20}
                />
            ),  
            title: (
                <h4 className="text-start text-white text-sm font-normal">
                    Email subscribed
                </h4>
            ),
            description: (
                <p className=" text-xs font-normal text-[#888888]">
                    Thanks for subscribing to our newsletter.
                </p>
            ),
        })
    }

 
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full max-w-sm items-center space-x-2">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="flex-grow">
                                <FormControl>
                                    <Input
                                        placeholder="Email"
                                        {...field}
                                        className="bg-transparent border-[#2e2e2e] text-[#ecf3f3] placeholder-[#ecf3f3]/50 focus:ring-2 focus:ring-[#3E7673]"
                                    />
                                </FormControl>
                                <FormMessage className="absolute text-xs mt-1 text-red-500" />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        className="relative z-10 bg-[#062826] rounded-lg text-[#ecf3f3] border-[#183d3b] font-semibold hover:bg-[#05201e] transition duration-300 ease-in-out"
                    >
                        Submit
                    </Button>

                </form>
            </Form>
            <Toaster />
        </>
    )
}