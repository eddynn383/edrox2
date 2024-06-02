import { auth } from "@/auth";
import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const setEnrolment = async ( courseId: string, userId?: string ) => {
    try {

        const session = await auth()
        const user = session?.user
        // console.log({ body })

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        console.log("its triggered on server")

        const alreadyEnrolled = await prisma.enrollment.findUnique({
            where: {
                userId_courseId: {
                    courseId,
                    userId: userId ? userId : user?.id as string
                }
            }
        })

        console.log("[alreadyEnrolled]: ", alreadyEnrolled)

        if (alreadyEnrolled) {
            return new NextResponse("Already enrolled", { status: 401 });
        }

        const enrolledCourse = await prisma.enrollment.create({
            data: {
                userId: userId ? userId : user?.id as string,
                courseId,
                status: "STARTED"
            }
        })

        console.log("[enrolledCourse]: ", enrolledCourse)

        return NextResponse.json(enrolledCourse)
        // return Response.json(enrolledCourse)
        // return enrolledCourse
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export const getEnrolment = async ( courseId: string, userId?: string ) => {
    try {
        const session = await auth()
        const user = session?.user

        const enrolment = await prisma.enrollment.findUnique({
            where: {
                userId_courseId: {
                    courseId,
                    userId: userId ? userId : user?.id as string
                }
            }
        })

        return enrolment
    } catch (error) {
        console.log("GET ENROLMENT", error)

        return null
    }
}

export const getAllUserEnrolments = async ( userId?: string ) => {
    try {
        const session = await auth()
        const user = session?.user

        const enrolment = await prisma.enrollment.findMany({
            where: {
                userId: userId ? userId : user?.id as string
            },
            include: {
                course: true
            }
        })

        return enrolment
    } catch (error) {
        console.log("GET ALL ENROLMENTS", error)

        return null
    }
}