"use client"

import * as z from "zod"

import { ChevronLeft, CircleAlert, CircleCheck } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { NewPasswordSchema } from "@/schemas"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormRowDetails, FormRowFields, FormRows } from "@/components/Form"
import { Alert, AlertDescription, Link, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Icon, Input } from "@/components"
import { newPassword } from "@/actions/new-password"
import formStyle from "@/components/Form/form.module.css"
import iconStyle from "@/components/Icon/icon.module.css"
import module from "@/styles/module.module.css"
import { Spinner } from "@/components/Spinner"

export const NewPasswordForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: ""
        }
    });
    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            newPassword(values, token)
                .then((data) => {
                    setError(data?.error);
                    setSuccess(data?.success);
                })
        })
    }
    return (
        <div className={module.auth}>
            <Link href="/auth/login" mode="text" size="S"><ChevronLeft /> Back</Link>
            <div className={module.inner}>
                <Card variant="ghost" padding="0" radius="0" gap="600" mode="solid">
                    <CardHeader style={{ "display": "flex", "flexDirection": "column", "gap": "8px" }}>
                        <CardTitle rank={2}>Enter a new password</CardTitle>
                        <CardDescription>Add your new password in the field below</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {
                            (error) &&
                            <Alert mode="text" status="fail">
                                <AlertDescription>
                                    <CircleAlert className={iconStyle.container} data-size="L" />
                                    <span>{error}</span>
                                </AlertDescription>
                            </Alert>
                        }

                        {
                            success &&
                            <Alert mode="text" status="success">
                                <AlertDescription>
                                    <CircleCheck className={iconStyle.container} data-size="L" />
                                    <span>{success}</span>
                                </AlertDescription>
                            </Alert>
                        }

                        <Form {...form}>
                            <form id="new-password-form" className={formStyle.container} style={{ "gap": "var(--gap-600, 24px)" }} onSubmit={form.handleSubmit(onSubmit)}>
                                <FormRows>
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        disabled={isPending}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormRowDetails>
                                                    <FormLabel>Password</FormLabel>
                                                    <FormMessage />
                                                </FormRowDetails>
                                                <FormRowFields>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            mode="outline"
                                                            placeholder="••••••••"
                                                            type="password"
                                                        />
                                                    </FormControl>
                                                </FormRowFields>
                                            </FormItem>
                                        )}
                                    />
                                </FormRows>
                                <Button variant="accent" status="default" mode="solid" size="M" type="submit">{isPending ? <Spinner /> : "Reset password"}</Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}