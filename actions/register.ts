"use server"

import * as z from "zod"
import { prisma } from "@/lib/prismadb"
import bcrypt from "bcrypt"
import { RegisterSchema } from "@/schemas"

import { getUserByEmail } from "@/data/user"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"


export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values)

    if (!validatedFields.success) return { error: "Invalid fields!" }

    const {name, email, password} = validatedFields.data

    const hashedPassword = await bcrypt.hash(password, 10)

    const userExists = await getUserByEmail(email)

    console.log("REGISTER UserExists: ", userExists)

    if (userExists) {
        return { error: "The email is taken!" }
    }

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    const verificationToken = await generateVerificationToken(email)

    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
    )

    return { success: "Confirmation email sent!"}
}