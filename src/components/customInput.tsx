"use client";
import React from 'react'
import useSWRMutation from 'swr/mutation'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Toaster } from "@/components/ui/toaster"
import Image from 'next/image'

const FormSchema = z.object({
    email: z.string()
        .trim()
        .email({ message: "Please enter a valid email address." }),
});

const subscribeEmail = async (url: string, { arg }: { arg: { email: string } }) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(arg),
    })
    return res.json()
}

export function EmailSubscriptionForm() {
    const { toast } = useToast()
    const { trigger, isMutating } = useSWRMutation('/api/EmailSubscribe', subscribeEmail)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: { email: "" },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const trimmedData = { ...data, email: data.email.trim() }
        const response = await trigger(trimmedData)

        toast({
            variant: response.error ? 'error' : 'subscribed',
            icon: (
                <Image
                    src={response.error ? "errorCircle.svg" : "checkCircle.svg"}
                    alt={response.error ? "Error" : "Check"}
                    width={20}
                    height={20}
                />
            ),
            title: (
                <h4 className={`text-start ${response.error ? 'text-[#ff9ea1]' : 'text-white'} text-sm font-normal`}>
                    {response.error ? 'Already Subscribed' : 'Email subscribed'}
                </h4>
            ),
            description: (
                <p className="text-xs font-normal text-[#888888]">
                    {response.error ? 'You can only subscribe once' : 'Thanks for subscribing to our newsletter.'}
                </p>
            ),
        })

        if (!response.error) form.reset()
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
                        className={`relative z-10 bg-[#062826] rounded-lg text-[#ecf3f3] border-[#183d3b] font-semibold hover:bg-[#05201e] transition-all duration-300 ease-in-out min-w-[100px] h-[40px] flex items-center justify-center ${isMutating ? 'bg-[#05201e] cursor-wait' : 'hover:bg-[#05201e]'
                            }`}
                        disabled={isMutating}
                    >
                        {isMutating ? (
                            <Image
                                src="/spinner.svg"
                                alt="Loading"
                                width={20}
                                height={20}
                                className="animate-spin"
                            />
                        ) : (
                            'Submit'
                        )}
                    </Button>
                </form>
            </Form>
            <Toaster />
        </>
    )
}