"use client"

import * as z from "zod"

import Link from "next/link"
import { CircleAlert, CircleCheck, Eye, EyeOff, Lock, Mail, RectangleEllipsis } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useEffect, useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginSchema } from "@/schemas"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormRowDetails, FormRowFields, FormRows } from "@/components/Form"
import { Social } from "../Social"
import { Alert, AlertDescription, Anchor, Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Icon, Input } from "@/components"
import { login } from "@/actions/login"
import msx from "@/styles/module.module.scss"
import csx from "@/styles/component.module.scss"
import module from "@/styles/module.module.css"
import formStyle from "@/components/Form/form.module.css"
import iconStyle from "@/components/Icon/icon.module.css"
import { Spinner } from "@/components/Spinner"

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

    const [passType, setPassType] = useState("password");

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
                // console.log(data)
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
        <div className={module.auth}>
            <div className={module.inner}>
                <Card mode="solid" variant="ghost" padding="0" radius="0" gap="600" style={{ "width": "100%" }}>
                    <CardHeader style={{ "display": "flex", "flexDirection": "column", "gap": "8px" }}>
                        <CardTitle rank={2}>Welcome back!</CardTitle>
                        <CardDescription>Don&apos;t have an account yet? <Anchor url="register" mode="text" variant="accent" content="text">Sign up</Anchor></CardDescription>
                    </CardHeader>
                    <CardContent>
                        {
                            (error || urlError) &&
                            <Alert mode="text" status="fail">
                                <AlertDescription>
                                    <CircleAlert className={iconStyle.container} data-size="L" />
                                    <span>{error || urlError}</span>
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
                            <form id="login-form" className={formStyle.container} onSubmit={form.handleSubmit(onSubmit)}>
                                <FormRows>
                                    {
                                        showTwoFactor && (
                                            <FormField
                                                control={form.control}
                                                name="code"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormRowDetails>
                                                            <FormLabel>Code</FormLabel>
                                                            <FormMessage />
                                                        </FormRowDetails>
                                                        <FormRowFields>
                                                            <FormControl>
                                                                <Input
                                                                    {...field}
                                                                    mode="outline"
                                                                    placeholder="123456"
                                                                    disabled={isPending}
                                                                    iconBefore={<RectangleEllipsis />}
                                                                />
                                                            </FormControl>
                                                        </FormRowFields>
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
                                                                        status={emailStatus}
                                                                        iconBefore={<Mail className={iconStyle.container} data-size="M" />}
                                                                    />
                                                                </FormControl>
                                                            </FormRowFields>
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="password"
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
                                                                        type={passType}
                                                                        disabled={isPending}
                                                                        status={passwordStatus}
                                                                        iconBefore={<Lock className={iconStyle.container} data-size="M" />}
                                                                        iconAfter={
                                                                            <Button type="button" mode="text" onClick={() => setPassType(passType === "password" ? "text" : "password")}>
                                                                                {passType === "password" && <EyeOff className={iconStyle.container} data-size="M" />}
                                                                                {passType === "text" && <Eye className={iconStyle.container} data-size="M" />}
                                                                            </Button>
                                                                        }
                                                                    />
                                                                </FormControl>
                                                            </FormRowFields>
                                                            <Link href="forgot-password" className="link link--primary">Forgot password?</Link>
                                                        </FormItem>
                                                    )}
                                                />
                                            </>
                                        )
                                    }
                                </FormRows>
                                <Button variant="accent" status="default" mode="solid" size="M" type="submit" style={{ "minWidth": "100px" }}>{isPending ? <Spinner /> : "Sign In"}</Button>
                            </form>
                        </Form>
                    </CardContent>
                    <CardFooter>
                        <Social />
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}