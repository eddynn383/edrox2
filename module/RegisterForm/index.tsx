"use client"

import * as z from "zod"

import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { RegisterSchema } from "@/schemas"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/Form"
import { Social } from "../Social"
import { Alert, AlertDescription, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Icon, Input, Label, RadioGroup, RadioGroupItem } from "@/components"
import msx from "@/styles/module.module.scss"
import csx from "@/styles/component.module.scss"
import { register } from "@/actions/register"
import Link from "next/link"
import { Loader2Icon } from "lucide-react"

export const RegisterForm = () => {
    const [isPending, startTransition] = useTransition();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

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
        setLoading(true)
        console.log("values:: ", values)
        startTransition(() => {
            register(values).then((data) => {
                setError(data.error)
                setSuccess(data.success)
            })
        })
        setLoading(false)
    }
    return (
        <div className={msx["auth"]}>
            <div className={msx["auth-inner"]}>
                <Card variant="ghost" padding="0" radius="0" gap="600">
                    <CardHeader style={{ "display": "flex", "flexDirection": "column", "gap": "8px" }}>
                        <CardTitle rank={1}>Welcome!</CardTitle>
                        <CardDescription>Have already an account? <Link href="login" className="link link--accent">Sign In</Link></CardDescription>
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
                            <form className={csx["form"]} style={{"gap": "var(--gap-600, 24px)"}} onSubmit={form.handleSubmit(onSubmit)}>
                                <FormField
                                    control={form.control}
                                    name="role"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex gap-4 justify-content-between">
                                                <FormLabel className="sr-only">Role</FormLabel>
                                                <FormMessage icon="alert-triangle" />
                                            </div>
                                            <FormControl>
                                                <RadioGroup orientation="horizontal" onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormItem className={csx["form-row--radiobox"]} data-selected={field.value === "LEARNER"}>
                                                        <FormControl>
                                                            <RadioGroupItem value="LEARNER" mode="outline" shade="200"/>
                                                        </FormControl>
                                                        <FormLabel>Learner</FormLabel>
                                                    </FormItem>
                                                    <FormItem className={csx["form-row--radiobox"]} data-selected={field.value === "TUTOR"}>
                                                        <FormControl>
                                                            <RadioGroupItem value="TUTOR" mode="outline" shade="200"/>
                                                        </FormControl>
                                                        <FormLabel>Tutor</FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex gap-4 justify-content-between">
                                                <FormLabel>Full name</FormLabel>
                                                <FormMessage icon="alert-triangle" />
                                            </div>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    mode="outline"
                                                    placeholder="John Doe"
                                                    type="text"
                                                    disabled={isPending}
                                                    status={nameStatus}
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
                                                    mode="outline"
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
                                                    mode="outline"
                                                    placeholder="••••••••"
                                                    type="password"
                                                    disabled={isPending}
                                                    status={passwordStatus}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <Button variant="accent" status="default" mode="solid" size="M" type="submit">
                                    {loading && <Loader2Icon className="loading-spinner"/>} 
                                    Create an account
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}