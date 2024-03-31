"use client"

import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"

import { signIn } from "next-auth/react"
import { Button } from "@/components"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import sx from "@/styles/module.module.scss"

export const Social = () => {

    const loginHandler = (provider: "github" | "google") => {
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT
        })
    }

    return (
        <div className={sx["social"]}>
            <Button size="M" shade="200" onClick={() => loginHandler("google")}>Sign in with Google <FcGoogle /></Button>
            <Button size="M" shade="200" onClick={() => loginHandler("github")}>Sign in with Github <FaGithub /></Button>
        </div>
    )
}