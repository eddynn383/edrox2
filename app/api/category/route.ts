import { auth } from "@/auth"
import { prisma } from "@/lib/prismadb"
import { NextResponse } from "next/server"

export const runtime = "edge"

export async function POST(request: Request) {
    try {
        const res = await request.json()
        const session = await auth()
        const user = session?.user
        // console.log({ res })
        const category = await prisma.category.create({
            data: {
                name: res.name,
                createdById: res.createdBy,
                // createdById: user?.id as string
            },
        })

        return Response.json(category)
    } catch (error) {
        // console.log(error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function GET() {
    try {
        const category = await prisma.category.findMany({
            // cacheStrategy: { ttl: 60 }
        })
        // .withAccelerateInfo()

        return Response.json(category)
    } catch (error) {
        // console.log(error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}