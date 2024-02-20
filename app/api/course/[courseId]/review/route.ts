import { auth } from "@/auth"
import { db } from "@/lib/db"
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
        const data = await request.json()
        const { courseId } = params

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        console.log({ data })
        const review = await db.review.create({
            data: {
                courseId: courseId,
                userId: session.user.id as string,
                rating: data.rating,
                title: data.title,
                comment: data.comment
            }
        })

        console.log(review)
        return Response.json(review)
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}