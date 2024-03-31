
"use server"

import * as z from "zod"
import { prisma } from "@/lib/prismadb"
import bcrypt from "bcrypt"
import { ProfileSchema } from "@/schemas"

import { getUserByEmail, updateUserById } from "@/data/user"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"


export const updateProfile = async (userId: string, values: z.infer<typeof ProfileSchema>) => {
    const validatedFields = ProfileSchema.safeParse(values)

    if (!validatedFields.success) return { error: "Invalid fields!" }

    const { name, bio, birthday } = validatedFields.data

    await updateUserById(userId, validatedFields.data)
    // await prisma.user.create({
    //     data: {
    //         name,
    //         email,
    //     }
    // })

    return { success: "Confirmation email sent!" }
}