
import { auth } from "@/auth";
import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";

type PriceBody = {
    currency: string;
    fullPrice: number;
    discountedPrice?: number;
    discountExpireDate?: Date;
};

export const setPrice = async (body: PriceBody, courseId: string) => {
    try {

        const session = await auth()
        const user = session?.user
        console.log({ body })
        console.log(courseId)

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const price = await prisma.price.create({
            data: {
                currency: body.currency,
                fullPrice: body.fullPrice,
                discountedPrice: body.discountedPrice,
                discountExpireDate: body.discountExpireDate,
                courseId
            }
        })

        return price;
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const getAllPrices = async () => {
    try {
        const price = await prisma.price.findMany()

        return price
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getPriceByCourseId = async (courseId: string) => {
    try {
        const price = await prisma.price.findMany({
            where: {
                courseId
            }
        })

        return price;
    } catch (error) {
        console.log(error)
        return null
    }
}