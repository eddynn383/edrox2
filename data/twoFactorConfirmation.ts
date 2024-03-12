import { prisma } from "@/lib/prismadb";

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
    try {
        const twoFactorConfrimation = await prisma.twoFactorConfirmation.findUnique({
            where: {
                userId
            }
        })

        return twoFactorConfrimation;
    } catch (error) {
        console.log(error)
        return null;
    }
}