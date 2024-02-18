import { auth } from "@/auth"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const session = await auth()
        const res = await request.json()
        console.log({ res })
        const course = await db.course.create({
            data: {
                title: res.title,
                description: res.description,
                image: res.image,
                categoryId: res.categoryId,
                createdById: session?.user.id,
            }
        })

        console.log(course)
        return Response.json(course)
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function GET() {
    try {
        const course = await db.course.findMany()

        return Response.json(course)
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}