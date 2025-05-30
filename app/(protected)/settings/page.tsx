"use client"
import *  as z from "zod"
import { settings } from "@/actions/settings"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useState, useTransition } from "react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, useFormField } from "@/components/ui/form"
import { SettingsSchema } from "@/schemas"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { Input } from "@/components/ui/input"
import { useCurrentUser } from "@/hooks/use-current-user"

export default function page() {
    const user = useCurrentUser();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
        defaultValues: {
            name: user?.name || "3",
        }
    })

    const handleOnSubmit = (values: z.infer<typeof SettingsSchema>) => {
        startTransition(() => {
            settings(values)
                .then((response) => {
                    if (response.error) {
                        setError(response.error);
                        toast.error(error);
                    }
                    if (response.success) {
                        setSuccess(response.success);
                        toast.success("Settings Updated");
                    }
                })
                .catch(() => {
                    setError("Something went wrong please try again later!!")
                })
        })
    }
    return (
        <Card className="w-[600px] ">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    Settings
                </p>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="space-y-6" onSubmit={form.handleSubmit(handleOnSubmit)} >
                        <div className="space-y-4">
                            <FormField control={form.control} name="name" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Update User Name</FormLabel>
                                    <FormControl>
                                        <Input type="text"  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>
                        <Button disabled={isPending} style={{ cursor: 'pointer' }} type="submit" className="w-full" size="lg">
                            Update
                        </Button>
                        <FormError message={error} />
                        <FormSuccess message={success} />
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
