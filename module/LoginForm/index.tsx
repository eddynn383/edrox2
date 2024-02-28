"use client"

import * as z from "zod"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginSchema } from "@/schemas"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/Form"
import { Social } from "../Social"
import { Alert, AlertDescription, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Icon, Input } from "@/components"
import { login } from "@/actions/login"
import msx from "@/styles/module.module.scss"
import csx from "@/styles/component.module.scss"

export const LoginForm = () => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
        ? "Email already in use with different provider!"
        : "";

    const [showTwoFactor, setShowTwoFactor] = useState(false)
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<any>();
    const [success, setSuccess] = useState<any>();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const emailState = form.getFieldState("email")
    const emailStatus = !emailState.invalid ? "default" : "fail";
    const passwordState = form.getFieldState("password")
    const passwordStatus = !passwordState.invalid ? "default" : "fail";

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            login(values, callbackUrl).then((data) => {
                console.log(data)
                if (data?.error) {
                    form.reset();
                    setError(data.error);
                }

                if (data?.success) {
                    form.reset();
                    setSuccess(data.success);
                }

                if (data?.twoFactor) {
                    setShowTwoFactor(true)
                }
            }).catch(() => setError("Something went wrong!"))
        })
    }
    return (
        <div className={msx["auth"]}>
            <div className={msx["auth_inner"]}>
                <Card effect="glass" size="2XL">
                    <CardHeader style={{ "display": "flex", "flexDirection": "column", "gap": "8px", "alignItems": "center" }}>
                        <CardTitle rank={1}>Welcome back!</CardTitle>
                        <CardDescription>Use your credentials to login into the app</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {
                            (error || urlError) &&
                            <Alert mode="text" status="fail">
                                <AlertDescription>
                                    <Icon name="alert-circle" size={20} />
                                    <span>{error || urlError}</span>
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
                                {
                                    showTwoFactor && (
                                        <FormField
                                            control={form.control}
                                            name="code"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="flex gap-4 justify-content-between">
                                                        <FormLabel>Code</FormLabel>
                                                        <FormMessage icon="alert-triangle" />
                                                    </div>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            shade="200"
                                                            placeholder="123456"
                                                            disabled={isPending}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    )
                                }
                                {
                                    !showTwoFactor && (
                                        <>
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
                                                                status={emailStatus}
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
                                                                status={passwordStatus}
                                                            />
                                                        </FormControl>
                                                        <Link href="forgot-password" className="link link--primary">Forgot password?</Link>
                                                    </FormItem>
                                                )}
                                            />
                                        </>
                                    )
                                }

                                <Button variant="accent" status="default" mode="solid" size="M" type="submit">Login</Button>
                            </form>
                        </Form>
                        <Social />
                        <p>Don&apos;t have an account yet? <Link href="register" className="link link--accent">Sign up</Link></p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}