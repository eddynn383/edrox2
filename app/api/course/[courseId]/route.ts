import { auth } from "@/auth"
import { prisma } from "@/lib/prismadb"
import { NextResponse } from "next/server"

type paramsType = {
    params: {
        courseId: string
    }
}

export async function DELETE(request: Request, { params }: paramsType) {
    try {
        const { courseId } = params
        const session = await auth()

        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const deletedCourse = await prisma.course.delete({
            where: {
                id: courseId,
            }
        })


        return NextResponse.json(deletedCourse)
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function PATCH(request: Request, { params }: paramsType) {
    try {
        const { courseId } = params
        const session = await auth()
        const updatedData = await request.json()

        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const updatedCourse = await prisma.course.update({
            where: {
                id: courseId,
            },
            data: {
                ...updatedData
            }
        })

        return NextResponse.json(updatedCourse)
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}