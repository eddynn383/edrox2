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
        const user = session?.user
        const body = await request.json()
        const { courseId } = params

        // console.log("USER: ", user)

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const alreadyExists = await prisma.rating.findFirst({
            where: {
                courseId: courseId,
                userId: session.user.id
            }
        })

        // console.log("rating exists: ", alreadyExists)

        if (alreadyExists) {
            return new NextResponse("Review already exists!", { status: 502 })
        }

        // console.log("dataBeforeSave: ", body)
        const rating = await prisma.rating.create({
            data: {
                courseId: courseId,
                userId: user.id as string,
                rating: body.rating,
                title: body.title,
                comment: body.comment
            }
        })

        // console.log("SAVED RATING: ", rating)
        return Response.json(rating)
    } catch (error) {
        // console.log(error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}