"use client"

import * as z from "zod"

import { ChevronLeft, CircleAlert, CircleCheck } from "lucide-react"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ResetSchema } from "@/schemas"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormRowDetails, FormRowFields, FormRows } from "@/components/Form"
import { Alert, AlertDescription, Anchor, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input } from "@/components"
import { reset } from "@/actions/reset"
import module from "@/styles/module.module.css"
import formStyle from "@/components/Form/form.module.css"
import iconStyle from "@/components/Icon/icon.module.css"
import { Spinner } from "@/components/Spinner"

export const ResetPassForm = () => {

    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: ""
        }
    });

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
        setError("");
        setSuccess("");

        // console.log(values)
        startTransition(() => {
            reset(values).then((data) => {
                setError(data?.error);
                setSuccess(data?.success);
            })
        })
    }
    return (
        <div className={module.auth}>
            <div className={module.inner}>
                <Anchor url="/auth/login" mode="outline" variant="primary" content="icon-text" size="S"><ChevronLeft /> Back</Anchor>
                <Card variant="ghost" padding="0" radius="0" gap="600">
                    <CardHeader style={{ "display": "flex", "flexDirection": "column", "gap": "8px" }}>
                        <CardTitle rank={2}>Forgot your password?</CardTitle>
                        <CardDescription>Add your email address below to request a password reset</CardDescription>
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
                            <form id="reset-password-form" className={formStyle.container} style={{ "gap": "var(--gap-600, 24px)" }} onSubmit={form.handleSubmit(onSubmit)}>
                                <FormRows>
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormRowDetails>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormMessage />
                                                </FormRowDetails>
                                                <FormRowFields>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            mode="outline"
                                                            placeholder="john.doe@example.com"
                                                            type="email"
                                                            disabled={isPending}
                                                        />
                                                    </FormControl>
                                                </FormRowFields>
                                            </FormItem>
                                        )}
                                    />
                                </FormRows>
                                <Button variant="accent" status="default" mode="solid" size="M" type="submit" disabled={isPending}>{isPending ? <Spinner /> : "Reset password"}</Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}