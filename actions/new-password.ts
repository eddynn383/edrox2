"use server"

import * as z from "zod"
import bcrypt from "bcryptjs"

import { NewPasswordSchema } from "@/schemas"
import { getPasswordResetTokenByToken } from "@/data/passResetToken"
import { getUserByEmail } from "@/data/user"
import { prisma } from "@/lib/prismadb"

export const newPassword = async (values: z.infer<typeof NewPasswordSchema>, token?: string | null) => {
    if (!token) {
        return { error: "Missing token!" }
    }

    const validatedFields = NewPasswordSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { password } = validatedFields.data;

    const exisingToken = await getPasswordResetTokenByToken(token)

    if (!exisingToken) {
        return { error: "Invalid token!" }        
    }

    const hasExpired = new Date(exisingToken.expires) < new Date();

    if (hasExpired) {
        return { error: "Token has expired!" }
    }

    const existingUser = await getUserByEmail(exisingToken.email);

    if (!existingUser) {
        return { error: "Email does not exist!" }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
        where: {
            id: existingUser.id,
        },
        data: {
            password: hashedPassword
        }
    })

    await prisma.passwordResetToken.delete({
        where: {
            id: exisingToken.id,
        }
    })

    return { success: "Password updated!" }
}