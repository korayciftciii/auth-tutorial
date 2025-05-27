
"use client"
import { CardWrapper } from "@/components/auth/card-wrapper"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { RegisterSchema } from "@/schemas/index"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"
import { useState, useTransition } from "react"
import { register } from "@/actions/register"
export const RegisterForm = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");


    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: '',
            password: '',
            name: '',
            surname: ''
        }
    })
    const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");
        startTransition(async () => {
            await register(data).
                then((response) => {
                    setError(response.error || "");
                    setSuccess(response.success || "Registration successful!");
                })
                .catch((err) => {
                    setError("An unexpected error occurred. Please try again later.");
                });
        })
    }
    return (
        <CardWrapper
            headerLabel="Create an Account"
            backButtonLabel="Already have an account?"
            backButtonHref="/auth/login"
            showSocial={true}
        >
            <Form {...form}>
                <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)} >
                    <div className=" flex gap-4 items-center">
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="surname" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Surname</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                    <div className="space-y-4">
                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="john.doe@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                    <div className="space-y-4">
                        <FormField control={form.control} name="password" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="******" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                    <Button disabled={isPending} style={{ cursor: 'pointer' }} type="submit" className="w-full" size="lg">
                        Create an Account
                    </Button>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                </form>
            </Form>
        </CardWrapper >
    )
}