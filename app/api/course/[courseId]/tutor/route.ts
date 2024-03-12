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

        console.log(courseId)

        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        // const alreadyExists = await prisma.tutor.findFirst({
        //     where: {
        //         courseId: courseId,
        //         name: data.name,
        //     }
        // })

        // console.log("tutor exists: ", alreadyExists)

        // if(alreadyExists) {
        //     return new NextResponse("Tutor already exists!", { status: 502 })
        // }

        console.log("TUTOR REQUEST: ", body)
        const tutor = await prisma.tutor.create({
            data: {
                name: body.name,
                image: body.image,
                userId: body.userId,
            }
        })

        console.log("TUTOR: ", tutor)
        return Response.json(tutor)
    } catch (error) {
        console.log("TUTOR ERROR: ", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
