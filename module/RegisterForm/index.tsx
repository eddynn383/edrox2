"use client"

import * as z from "zod"

import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { RegisterSchema } from "@/schemas"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/Form"
import { Social } from "../Social"
import { Alert, AlertDescription, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Icon, Input } from "@/components"
import msx from "@/styles/module.module.scss"
import csx from "@/styles/component.module.scss"
import { register } from "@/actions/register"
import Link from "next/link"

export const RegisterForm = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });
    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("")

        startTransition(() => {
            register(values).then((data) => {
                setError(data.error)
                setSuccess(data.success)
            })
        })
    }
    return (
        <div className={msx["auth"]}>
            <div className={msx["auth_inner"]}>
                <Card effect="glass" size="2XL">
                    <CardHeader style={{ "display": "flex", "flexDirection": "column", "gap": "8px", "alignItems": "center" }}>
                        <CardTitle rank={1}>Welcome!</CardTitle>
                        <CardDescription>Create an account to get started</CardDescription>
                    </CardHeader>
                    <CardContent>

                        {
                            error &&
                            <Alert mode="text" status="fail">
                                <AlertDescription>
                                    <Icon name="alert-circle" size={20} />
                                    <span>{error}</span>
                                </AlertDescription>
                            </Alert>
                        }
                        {
                            success &&
                            <Alert mode="text" status="success">
                                <AlertDescription>
                                    <Icon name="check-circle" size={20} />
                                    <span>{success}</span>
                                </AlertDescription>
                            </Alert>
                        }

                        <Form {...form}>
                            <form className={csx["form"]} onSubmit={form.handleSubmit(onSubmit)}>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex gap-4 justify-content-between">
                                                <FormLabel>Name</FormLabel>
                                                <FormMessage icon="alert-triangle" />
                                            </div>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    shade="200"
                                                    placeholder="John Doe"
                                                    type="text"
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex gap-4 justify-content-between">
                                                <FormLabel>Email</FormLabel>
                                                <FormMessage icon="alert-triangle" />
                                            </div>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    shade="200"
                                                    placeholder="john.doe@example.com"
                                                    type="email"
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex gap-4 justify-content-between">
                                                <FormLabel>Password</FormLabel>
                                                <FormMessage icon="alert-triangle" />
                                            </div>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    shade="200"
                                                    placeholder="********"
                                                    type="password"
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <Button variant="accent" status="default" mode="solid" size="M" type="submit">Create an account</Button>
                            </form>
                        </Form>
                        <Social />
                        <p>Have already an account? <Link href="login" className="link link--accent">Sign In</Link></p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}