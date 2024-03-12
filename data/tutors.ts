import { auth } from "@/auth";
import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";

type GetCourses = {
    title: string;
    categoryId?: string;
};

export const setTutor = async (body: any, courseId: string) => {
    try {

        const session = await auth()
        const user = session?.user
        console.log({ body })
        console.log(courseId)

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const tutor = await prisma.tutor.create({
            data: {
                name: body.name,   
                image: body.image,   
                userId: body.userId,
            }
        })

        // const course = await prisma.course.update({
        //     where: {
        //         id: courseId
        //     },
        //     data: {
        //         tutors: tutor
        //     }
        // })

        return tutor
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const getAllTutors = async () => {
    try {
        const tutor = await prisma.tutor.findMany()

        return tutor
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getTutorByCourseId = async (courseId: string) => {
    try {
        const tutor = await prisma.tutorsOnCourses.findMany({
            where: {
                courseId
            }
        })

        return tutor
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getTutorById = async (id: string) => {
    try {
        const tutor = await prisma.tutor.findMany({
            where: {
                id
            }
        })

        return tutor
    } catch (error) {
        console.log(error)
        return null
    }
}