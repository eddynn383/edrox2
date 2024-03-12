import { auth } from "@/auth"
import { prisma } from "@/lib/prismadb"
import { revalidateTag } from "next/cache"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const session = await auth()
        const user = session?.user
        const res = await request.json()
        console.log({ res })

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const course = await prisma.course.create({
            data: {
                title: res.title,
                description: res.description,
                image: res.image,
                categoryId: res.categoryId,
                price: res.price,
                level: res.level,
                createdById: user.id as string,
            }
        })

        revalidateTag('courses')
        console.log(course)
        return Response.json(course)
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify(error), { status: 500 })
    }
}

export async function GET() {
    try {
        const course = await prisma.course.findMany()

        return Response.json(course)
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify(error), { status: 500 })
    }
}