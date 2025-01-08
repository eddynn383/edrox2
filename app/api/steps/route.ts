import { auth } from "@/auth"
import { prisma } from "@/lib/prismadb"
import { NextResponse } from "next/server"

export const runtime = "edge"

export async function POST(request: Request) {
    try {
        const res = await request.json()
        // const session = await auth()
        // const user = session?.user
        // console.log({ res })

        const creationStep = await prisma.creationStep.create({
            data: {
                name: res.name,
                status: res.status,
                position: res.position,
                url: res.url,
                for: res.for
            },
        })

        return Response.json(creationStep)
    } catch (error) {
        // console.log(error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function GET() {
    try {
        const creationStep = await prisma.creationStep.findMany({
            // cacheStrategy: { ttl: 60 }
        })
        // .withAccelerateInfo()

        return Response.json(creationStep)
    } catch (error) {
        // console.log(error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}