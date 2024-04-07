"use client"

import * as z from "zod"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { NewPasswordSchema } from "@/schemas"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/Form"
import { Alert, AlertDescription, Button, Card, CardDescription, CardHeader, CardTitle, Icon, Input } from "@/components"
import msx from "@/styles/module.module.scss"
import csx from "@/styles/component.module.scss"
import { newPassword } from "@/actions/new-password"
 
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
        <div className={msx["auth"]}>
            <div className={msx["auth-inner"]}>
                <Card variant="ghost" padding="0" radius="0" gap="600">
                    <CardHeader style={{"display": "flex", "flexDirection": "column", "gap": "8px"}}>                        
                        <CardTitle rank={2}>Enter a new password</CardTitle>
                        <CardDescription>Enter your new password below.</CardDescription>
                    </CardHeader>
                    {
                        (error) &&
                        <Alert mode="text" status="fail">
                            <AlertDescription>
                                <Icon name="alert-circle" size={20}/>
                                <span>{ error }</span>
                            </AlertDescription>
                        </Alert>
                    }

                    {
                        success &&
                        <Alert mode="text" status="success">
                            <AlertDescription>
                                <Icon name="check-circle" size={20}/>
                                <span>{success}</span>
                            </AlertDescription>
                        </Alert>
                    }

                    <Form {...form}>
                        <form className={csx["form"]} style={{"gap": "var(--gap-600, 24px)"}} onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField 
                                control={form.control} 
                                name="password" 
                                disabled={isPending}
                                render={({field}) => (
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
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}  
                            />
                            <Button variant="accent" status="default" mode="solid" size="M" type="submit">Reset password</Button>
                        </form>
                    </Form>
                </Card>
            </div>
        </div>
    )
}