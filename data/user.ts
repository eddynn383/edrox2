import { User } from "@/interfaces/global";
import { prisma } from "@/lib/prismadb";

export const getUserByEmail = async (email: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        return user

    } catch (error) {
        // console.log(error)
        return null
    }
}

export const getUserById = async (id: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })

        return user

    } catch (error) {
        // console.log(error)
        return null
    }
}

export const updateUserById = async (id: string, data: User) => {
    try {
        const user = await prisma.user.update({
            where: {
                id
            },
            data
        })
        // console.log("User successfully updated!")
        return user

    } catch (error) {
        // console.log(error)
        return null
    }
}