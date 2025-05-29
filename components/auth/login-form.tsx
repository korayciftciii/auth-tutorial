
"use client"
import { CardWrapper } from "@/components/auth/card-wrapper"
import { useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { LoginSchema } from "@/schemas/index"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"
import { login } from "@/actions/login"
import { useState, useTransition } from "react"
import Link from "next/link"
export const LoginForm = () => {
    const searchParams = useSearchParams();
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already in use with diffrent provider." : "";
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");


    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })
    const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");
        startTransition(async () => {
            await login(data).
                then((response) => {
                    setError(response?.error);
                    setSuccess(response?.success);
                })
                .catch(() => {
                    setError("An unexpected error occurred. Please try again later.");
                });
        })
    }
    return (
        <CardWrapper
            headerLabel="Welcome Back"
            backButtonLabel="Don't have an account?"
            backButtonHref="/auth/register"
            showSocial={true}
        >
            <Form {...form}>
                <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)} >
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
                                <Button
                                    size={"sm"}
                                    variant={"link"}
                                    asChild
                                    className="px-0 font-normal"
                                >
                                    <Link href={"/auth/reset"}>
                                        Forgot Password?
                                    </Link>
                                </Button>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                    <Button disabled={isPending} style={{ cursor: 'pointer' }} type="submit" className="w-full" size="lg">
                        Login
                    </Button>
                    <FormError message={error || urlError} />
                    <FormSuccess message={success} />
                </form>
            </Form>
        </CardWrapper >
    )
}