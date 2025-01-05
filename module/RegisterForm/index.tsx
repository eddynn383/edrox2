"use client"

import * as z from "zod"

import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { RegisterSchema } from "@/schemas"
import { CircleAlert, CircleCheck, Eye, EyeOff, Loader2Icon, Lock, Mail, User } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormRowDetails, FormRowFields, FormRows } from "@/components/Form"
import { Social } from "../Social"
import { Alert, AlertDescription, Link, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Icon, Input, Label, RadioGroup, RadioGroupItem } from "@/components"
import { register } from "@/actions/register"
import module from "@/styles/module.module.css"
import formStyle from "@/components/Form/form.module.css"
import iconStyle from "@/components/Icon/icon.module.css"
import { Spinner } from "@/components/Spinner"


export const RegisterForm = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const [passType, setPassType] = useState("password");

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            role: "LEARNER",
            name: "",
            email: "",
            password: ""
        }
    });


    const nameState = form.getFieldState("name")
    const nameStatus = !nameState.invalid ? "default" : "fail";
    const emailState = form.getFieldState("email")
    const emailStatus = !emailState.invalid ? "default" : "fail";
    const passwordState = form.getFieldState("password")
    const passwordStatus = !passwordState.invalid ? "default" : "fail";

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("")
        // console.log("values:: ", values)
        startTransition(() => {
            register(values).then((data) => {
                setError(data.error)
                setSuccess(data.success)
            })
        })
    }
    return (
        <div className={module.auth}>
            <div className={module.inner}>
                <Card variant="ghost" padding="0" radius="0" gap="600" style={{ "width": "100%" }} mode="solid">
                    <CardHeader style={{ "display": "flex", "flexDirection": "column", "gap": "8px" }}>
                        <CardTitle rank={1}>Welcome!</CardTitle>
                        <CardDescription>Have already an account? <Link href="login" mode="text">Sign in</Link></CardDescription>
                    </CardHeader>
                    <CardContent>
                        {
                            error &&
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
                            <form id="register-form" className={formStyle.container} onSubmit={form.handleSubmit(onSubmit)}>
                                <FormRows>
                                    <FormField
                                        control={form.control}
                                        name="role"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormRowDetails>
                                                    <FormLabel className="sr-only">Role</FormLabel>
                                                    <FormMessage />
                                                </FormRowDetails>
                                                <FormRowFields>
                                                    <FormControl>
                                                        <RadioGroup orientation="horizontal" onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormItem className={formStyle["row-radiobox"]} data-selected={field.value === "LEARNER"}>
                                                                <FormControl>
                                                                    <RadioGroupItem value="LEARNER" mode="outline" shade="200" />
                                                                </FormControl>
                                                                <FormLabel>Learner</FormLabel>
                                                            </FormItem>
                                                            <FormItem className={formStyle["row-radiobox"]} data-selected={field.value === "TUTOR"}>
                                                                <FormControl>
                                                                    <RadioGroupItem value="TUTOR" mode="outline" shade="200" />
                                                                </FormControl>
                                                                <FormLabel>Tutor</FormLabel>
                                                            </FormItem>
                                                        </RadioGroup>
                                                    </FormControl>
                                                </FormRowFields>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormRowDetails>
                                                    <FormLabel>Full name</FormLabel>
                                                    <FormMessage />
                                                </FormRowDetails>
                                                <FormRowFields>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            mode="outline"
                                                            placeholder="John Doe"
                                                            type="text"
                                                            disabled={isPending}
                                                            status={nameStatus}
                                                            iconBefore={<User className={iconStyle.container} data-size="M" />}
                                                        />
                                                    </FormControl>
                                                </FormRowFields>
                                            </FormItem>
                                        )}
                                    />
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
                                            </FormItem>
                                        )}
                                    />
                                </FormRows>
                                <Button variant="accent" status="default" mode="solid" size="M" type="submit">{isPending ? <Spinner /> : "Create an account"}</Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}