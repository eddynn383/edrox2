import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const res = await request.json()
        console.log({ res })
        const category = await db.category.create({
            data: {
                name: res.name
            }
        })

        return Response.json(category)
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 })
    }
}