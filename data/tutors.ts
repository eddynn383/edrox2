import { auth } from "@/auth";
import { db } from "@/lib/db";
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

        const tutor = await db.tutor.create({
            data: {
                name: body.name,   
                image: body.image,   
                userId: body.userId,
                courseId
            }
        })

        return tutor
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export const getAllTutors = async () => {
    try {
        const tutor = await db.tutor.findMany()

        return tutor
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getTutorByCourseId = async (courseId: string) => {
    try {
        const tutor = await db.tutor.findMany({
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