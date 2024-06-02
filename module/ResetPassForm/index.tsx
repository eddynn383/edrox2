"use client"

import * as z from "zod"

import { CircleAlert, CircleCheck } from "lucide-react"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ResetSchema } from "@/schemas"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormRowDetails, FormRowFields, FormRows} from "@/components/Form"
import { Alert, AlertDescription, Button, Card, CardDescription, CardHeader, CardTitle, Icon, Input } from "@/components"
import { reset } from "@/actions/reset"
import msx from "@/styles/module.module.scss"
import formStyle from "@/components/Form/form.module.css"
import iconStyle from "@/components/Icon/icon.module.css"
 
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
        <div className={msx["auth"]}>
            <div className={msx["auth-inner"]}>
                <Card variant="ghost" padding="0" radius="0" gap="600">
                    <CardHeader style={{"display": "flex", "flexDirection": "column", "gap": "8px"}}>                        
                        <CardTitle rank={2}>Forgot your password?</CardTitle>
                        <CardDescription>Reset your password using the input below.</CardDescription>
                    </CardHeader>
                    {
                        (error) &&
                        <Alert mode="text" status="fail">
                            <AlertDescription>
                                <CircleAlert className={iconStyle.container} data-size="L" />
                                <span>{ error }</span>
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
                        <form id="reset-password-form" className={formStyle.container} style={{"gap": "var(--gap-600, 24px)"}} onSubmit={form.handleSubmit(onSubmit)}>
                            <FormRows>
                                <FormField 
                                    control={form.control} 
                                    name="email" 
                                    render={({field}) => (
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
                            <Button variant="accent" status="default" mode="solid" size="M" type="submit" disabled={isPending}>Reset password</Button>
                        </form>
                    </Form>
                </Card>
            </div>
        </div>
    )
}