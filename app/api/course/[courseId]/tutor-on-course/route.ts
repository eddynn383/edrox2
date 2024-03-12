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

        const alreadyExists = await prisma.tutorsOnCourses.findFirst({
            where: {
                courseId: courseId,
                tutorId: body.id,
            }
        })

        // console.log("tutor exists: ", alreadyExists)

        if(alreadyExists) {
            return new NextResponse("Tutor already exists!", { status: 502 })
        }

        console.log("TUTOR REQUEST: ", body)
        const tutorsOnCourses = await prisma.tutorsOnCourses.create({
            data: {
                tutorId: body.id,
                courseId: courseId,
                assignedBy: session.user.id as string
            }
        })

        console.log("TUTOR: ", tutorsOnCourses)
        return Response.json(tutorsOnCourses)
    } catch (error) {
        console.log("TUTOR ERROR: ", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
