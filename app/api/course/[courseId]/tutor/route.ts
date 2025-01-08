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

        // console.log(courseId)

        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const alreadyExists = await prisma.tutorsOnCourses.findFirst({
            where: {
                courseId,
                tutorId: body.tutorId
            }
        })

        // console.log("tutor exists: ", alreadyExists)

        if (alreadyExists) {
            return new NextResponse("This tutor is already assigned to the course!", { status: 502 })
        }

        // console.log("TUTOR REQUEST: ", body)
        const tutor = await prisma.tutorsOnCourses.create({
            data: {
                courseId,
                tutorId: body.tutorId,
                assignedBy: user?.id as string
            }
        })

        // console.log("TUTOR: ", tutor)
        return Response.json(tutor)
    } catch (error) {
        // console.log("TUTOR ERROR: ", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
