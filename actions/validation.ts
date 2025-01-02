"use server"

import { prisma } from "@/lib/prismadb"

import { getUserByEmail } from "@/data/users"
import { getVerificationTokenByToken } from "@/data/verificationToken"

export const tokenValidation = async (token: string) => {
    const existingToken = await getVerificationTokenByToken(token)

    // console.log({existingToken})

    if (!existingToken) {
        return { error: "Token does not exist!" }
    }

    const hasExpired = new Date(existingToken.expires) < new Date()


    if (hasExpired) {
        return { error: "Token has expired!" }
    }

    const existingUser = await getUserByEmail(existingToken.email);

    // console.log({ex: {existingUser}})

    if (!existingUser) {
        // console.log("User exists!")
        return { error: "Email does not exist!" }
    }

    await prisma.user.update({
        where: {
            id: existingUser.id,
        },
        data: {
            emailVerified: new Date(),
            email: existingToken.email
        }
    })

    await prisma.verificationToken.delete({
        where: {
            id: existingToken.id,
        }
    })

    return { success: "Email verified!" }
}