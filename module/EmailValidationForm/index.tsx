"use client"

import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardTitle, CardDescription, Alert, AlertDescription, Icon } from "@/components"
import { HashLoader } from "react-spinners"
import { tokenValidation } from "@/actions/validation"
import { AlertCircle, CircleCheck } from "lucide-react"
import iconStyle from "@/components/Icon/icon.module.css"
import msx from "@/styles/module.module.scss"

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
        <div className={msx["auth"]}>
            <div className={msx["auth-inner"]} >
                <Card variant="ghost" padding="0" radius="0" gap="600">
                    <CardTitle rank={2}>Email Validation</CardTitle>
                    <CardDescription>Wait until your email is validated!</CardDescription>
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
                </Card>
            </div>
        </div>
    )
}