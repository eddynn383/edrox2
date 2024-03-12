import { auth } from "@/auth"
import { prisma } from "@/lib/prismadb"
import { NextResponse } from "next/server"

type paramsType = {
    params: {
        tutorId: string
    }
}

export async function DELETE(request: Request, { params }: paramsType) {
    try {
        const { tutorId } = params
        const session = await auth()

        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const deletedTutor = await prisma.tutor.delete({
            where: {
                id: tutorId,
            }
        })


        return NextResponse.json(deletedTutor)
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify(error), { status: 500 })
    }
}

export async function PATCH(request: Request, { params }: paramsType) {
    try {
        const { tutorId } = params
        const session = await auth()
        const updatedData = await request.json()

        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const updatedTutor = await prisma.tutor.update({
            where: {
                id: tutorId,
            },
            data: {
                ...updatedData
            }
        })

        return NextResponse.json(updatedTutor)
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify(error), { status: 500 })
    }
}