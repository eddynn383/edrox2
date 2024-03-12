"use server"

import * as z from "zod"
import { AuthError } from "next-auth"


import { prisma } from "@/lib/prismadb"
import { signIn } from "@/auth"
import { LoginSchema } from "@/schemas"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { getUserByEmail } from "@/data/user"
import { generateVerificationToken, generateTwoFactorToken } from "@/lib/tokens"
import { sendVerificationEmail, sendTwoFactorTokenEmail } from "@/lib/mail"
import { getTwoFactorTokenByEmail } from "@/data/twoFactorToken"
import { getTwoFactorConfirmationByUserId } from "@/data/twoFactorConfirmation"


export const login = async (values: z.infer<typeof LoginSchema>, callbackUrl?: string | null) => {
    const validatedFields = LoginSchema.safeParse(values)


    if (!validatedFields.success) {
        return { error: "Invalid fields!"}
    }

    const { email, password, code } = validatedFields.data;


    const existingUser = await getUserByEmail(email);
    // console.log("LOGIN ACTION EMAIL:", email.trim())
    // console.log("LOGIN ACTION: ", { existingUser })

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Email does not exist!" }
    }

    if (!existingUser.emailVerified) {

        const verificationToken = await generateVerificationToken(existingUser.email)
        // console.log("VerToken LOGIN ACTION: ", verificationToken)

        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        )

        return {success: "A confirmation email was sent!"}
    }

    if (existingUser.isTwoFactorEnabled && existingUser.email) {

        if (code) { 

            const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email)

            if (!twoFactorToken) {
                return { error: "Invalid Code!" }
            }

            if (twoFactorToken.token !== code) {
                return { error: "Invalid Code!" }
            }

            const hasExpired = new Date(twoFactorToken.expires) < new Date();

            if (hasExpired) {
                return { error: "Code is expired!" }
            }

            await prisma.twoFactorToken.delete({
                where: { 
                    id: twoFactorToken.id 
                }
            })

            const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

            if (existingConfirmation) {
                await prisma.twoFactorConfirmation.delete({
                    where: { 
                        id: existingConfirmation.id
                    }
                })
            }

            await prisma.twoFactorConfirmation.create({
                data: {
                    userId: existingUser.id
                }
            })

        } else {
            const twoFactorToken = await generateTwoFactorToken(existingUser.email)
    
            await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token)
    
            return {
                twoFactor: true
            }
        }
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT
        })
        
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" }
            
                default:
                    return { error: "Something went wrong!" };
            }
        }

        throw error
    }
}