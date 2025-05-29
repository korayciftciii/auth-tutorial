
"use client"
import { CardWrapper } from "@/components/auth/card-wrapper"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { NewPasswordSchema } from "@/schemas/index"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"
import { useState, useTransition } from "react"
import { newPassword } from "@/actions/new-password"
import { useSearchParams } from "next/navigation"
export const NewPasswordForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");


    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
        }
    })
    const onSubmit = async (data: z.infer<typeof NewPasswordSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            newPassword(data, token)
                .then((data) => {
                    setError(data?.error);
                    setSuccess(data?.success)
                })
        })
    }
    return (
        <CardWrapper
            headerLabel="Enter a new password?"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
        >
            <Form {...form}>
                <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)} >
                    <div className="space-y-4">
                        <FormField control={form.control} name="password" render={({ field }) => (
                            <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="******" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                    <Button disabled={isPending} style={{ cursor: 'pointer' }} type="submit" className="w-full" size="lg">
                        Reset Password
                    </Button>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                </form>
            </Form>
        </CardWrapper >
    )
}