import { auth } from "@/auth"
import { prisma } from "@/lib/prismadb"
import { NextResponse } from "next/server"

type paramsType = {
    params: {
        courseId: string
    }
}

export async function POST(request: Request, { params }: paramsType) {
    try {
        const session = await auth()
        const body = await request.json()
        const { courseId } = params

        // console.log(courseId)

        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        // console.log("PRICE REQUEST: ", body)
        const price = await prisma.price.create({
            data: {
                currency: body.currency,
                fullPrice: body.fullPrice,
                discountedPrice: body.discountedPrice,
                discountExpireDate: body.discountExpireDate,
                courseId
            }
        })

        // console.log("SAVED PRICE: ", price)

        return Response.json(price)
    } catch (error) {
        // console.log("TUTOR ERROR: ", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
