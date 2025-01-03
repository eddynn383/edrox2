"use client"

import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardTitle, CardDescription, Alert, AlertDescription, Icon, CardHeader, CardContent } from "@/components"
import { HashLoader } from "react-spinners"
import { tokenValidation } from "@/actions/validation"
import { AlertCircle, CircleCheck } from "lucide-react"
import iconStyle from "@/components/Icon/icon.module.css"
import module from "@/styles/module.module.css"

export const EmailValidationForm = () => {
    const [success, setSuccess] = useState<string>();
    const [error, setError] = useState<string>();
    const searchParams = useSearchParams()

    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
        if (success || error) return

        if (!token) {
            setError("Token is missing!");
            return;
        }

        tokenValidation(token).then((data) => {
            setSuccess(data.success);
            setError(data.error);
        }).catch(() => {
            setError("Something went wrong!");
        });
    }, [token, success, error]);

    useEffect(() => {
        onSubmit()
    }, [onSubmit])

    return (
        <div className={module.auth}>
            <div className={module.inner} >
                <Card variant="ghost" padding="0" radius="0" gap="600" mode="solid">
                    <CardHeader style={{ "display": "flex", "flexDirection": "column", "gap": "8px" }}>
                        <CardTitle rank={2}>Email Validation</CardTitle>
                        <CardDescription>Wait until your email is validated!</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {
                            !success && error && (
                                <Alert mode="text" status="fail">
                                    <AlertDescription>
                                        <AlertCircle className={iconStyle.container} data-size="L" />
                                        <span>{error}</span>
                                    </AlertDescription>
                                </Alert>
                            )
                        }
                        {
                            !error && success && (
                                <Alert mode="text" status="success">
                                    <AlertDescription>
                                        <CircleCheck className={iconStyle.container} data-size="L" />
                                        <span>{success}</span>
                                    </AlertDescription>
                                </Alert>
                            )
                        }
                        {
                            !success && !error && (
                                <HashLoader color="#fff" />
                            )
                        }
                        {
                            success && !error && (
                                <p>Go back to <Link href="login" className="link link--accent">Sign In</Link></p>
                            )
                        }
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}