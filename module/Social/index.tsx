"use client"

import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { Loader2Icon } from "lucide-react";

import { signIn } from "next-auth/react"
import { Button } from "@/components"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { useState } from "react"
import sx from "@/styles/module.module.scss"

export const Social = () => {
    const [loading, setLoading] = useState(false)

    const loginHandler = (provider: "github" | "google") => {
        setLoading(true)
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT
        })
        setLoading(false)
    }

    return (
        <div className={sx["social"]}>
            <Button size="M" mode="outline" onClick={() => loginHandler("google")}>
                {!loading && <FcGoogle />}
                {loading && <Loader2Icon className="loading-spinner"/>} 
                Sign in with Google
            </Button>
            <Button size="M" mode="outline" onClick={() => loginHandler("github")}>
                {!loading && <FaGithub />}
                {loading && <Loader2Icon className="loading-spinner"/>} 
                Sign in with Github
            </Button>
        </div>
    )
}