import { auth } from "@/auth";
import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";

type GetCourses = {
    title: string;
    categoryId?: string;
};

export const setTutor = async (body: any) => {
    try {

        const tutor = await prisma.tutor.create({
            data: {
                name: body.name,   
                image: body.image,   
                userId: body.id,
            }
        })

        // console.log("NEW TUTOR: ", tutor)

        return tutor
    } catch (error) {
        // console.log(error)
        return null;
    }
}

export const setTutorOnCourse = async (tutorId: any, courseId: string) => {
    try {

        const session = await auth()
        const user = session?.user

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const tutor = await prisma.tutorsOnCourses.create({
            data: {
                tutorId,
                courseId,
                assignedBy: user.id as string
            }
        })

        // console.log("NEW TUTOR ON COURSE: ", tutor)

        return tutor
    } catch (error) {
        // console.log(error)
        return null;
    }
}

export const getAllTutors = async () => {
    try {
        const tutor = await prisma.tutor.findMany()

        return tutor
    } catch (error) {
        // console.log(error)
        return null
    }
}

export const getTutorById = async (id: string) => {
    try {
        const ratingAvg = await prisma.ratingsOnTutors.aggregate({
            _avg: {
                rating: true
            },
            where: {
                tutorId: id
            }
        })

        const ratingCount = await prisma.ratingsOnTutors.aggregate({
            _count: {
                rating: true
            },
            where: {
                tutorId: id
            }
        })

        const tutor = await prisma.tutor.findUnique({
            where: {
                id
            }
        })

        // return NextResponse.json(tutor)
        return {
            ...tutor,
            rating: {
                avg: ratingAvg._avg.rating === null ? 0 : ratingAvg._avg.rating,
                count: ratingCount._count.rating
            }
        };
    } catch (error) {
        // console.log(error)
        return null
    }
}