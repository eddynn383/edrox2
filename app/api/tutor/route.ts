import { auth } from "@/auth"
import { prisma } from "@/lib/prismadb"
import { revalidateTag } from "next/cache"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const session = await auth()
        const user = session?.user
        const body = await request.json()
        console.log({ body })

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const tutor = await prisma.tutor.create({
            data: {
                image: body.image,
                name: body.name,
                userId: body.userId,
            }
        })

        revalidateTag('tutor')
        console.log(tutor)
        return Response.json(tutor)
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify(error), { status: 500 })
    }
}

export async function GET() {
    try {
        const tutor = await prisma.tutor.findMany()

        return Response.json(tutor)
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify(error), { status: 500 })
    }
}