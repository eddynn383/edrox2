

import { auth } from "@/auth";
import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";

type RatingBody = {
    rating: number;
    title?: string;
    comment?: string;
};

export const setRatingOnCourse = async (body: RatingBody, courseId: string) => {
    try {

        const session = await auth()
        const user = session?.user
        // console.log({ body })
        // console.log(courseId)

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const rating = await prisma.ratingsOnCourses.create({
            data: {
                courseId,
                userId: user.id as string,
                rating: body.rating,
                title: body.title,
                comment: body.comment
            }
        })

        // const avgRating = await prisma.ratingsOnCourses.aggregate({
        //     _avg: {
        //         rating: true
        //     },
        //     where: {
        //         courseId
        //     }
        // })

        // const avgRatingData = avgRating._avg.rating

        // console.log("AVG Rating: ", avgRatingData)

        // await prisma.course.update({
        //     where: {
        //         id: courseId
        //     },
        //     data: {
        //         avgRating: avgRatingData
        //     }
        // })

        return rating
    } catch (error) {
        // console.log(error)
        return null;
    }
}

export const setRatingOnTutor = async (body: RatingBody, tutorId: string) => {
    try {

        const session = await auth()
        const user = session?.user
        // console.log({ body })
        // console.log(tutorId)

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const rating = await prisma.ratingsOnTutors.create({
            data: {
                tutorId,
                userId: user.id as string,
                rating: body.rating,
                title: body.title,
                comment: body.comment
            }
        })

        return rating
    } catch (error) {
        // console.log(error)
        return null;
    }
}

export const getAllCoursesRatings = async () => {
    try {
        const ratings = await prisma.ratingsOnCourses.findMany()

        return ratings
    } catch (error) {
        // console.log(error)
        return null;
    }
}

export const getAllTutorsRatings = async () => {
    try {
        const ratings = await prisma.ratingsOnTutors.findMany()

        return ratings
    } catch (error) {
        // console.log(error)
        return null;
    }
}

export const getRatingByCourseId = async (courseId: string) => {
    try {
        const rating = await prisma.ratingsOnCourses.findMany({
            where: {
                courseId
            }
        })

        return rating
    } catch (error) {
        // console.log(error)
        return null;
    }
}

export const getRatingByTutorId = async (tutorId: string) => {
    try {
        const rating = await prisma.ratingsOnTutors.findMany({
            where: {
                tutorId
            }
        })

        return rating
    } catch (error) {
        // console.log(error)
        return null;
    }
}

export const getCourseRatingAvg = async (courseId: string) => {
    try {


        const ratingAvg = await prisma.ratingsOnCourses.aggregate({
            _avg: {
                rating: true
            },
            where: {
                courseId
            }
        })

        const ratingAvgData = ratingAvg._avg.rating

        // console.log("AVG Rating: ", ratingAvgData)

        return ratingAvgData
    } catch (error) {
        // console.log(error)
        return null;
    }
}

export const getTutorRatingAvg = async (tutorId: string) => {
    try {

        const ratingAvg = await prisma.ratingsOnTutors.aggregate({
            _avg: {
                rating: true
            },
            where: {
                tutorId
            }
        })

        const ratingAvgData = ratingAvg._avg

        // console.log("AVG Rating: ", ratingAvgData)

        return ratingAvgData.rating
    } catch (error) {
        // console.log(error)
        return null;
    }
}

export const getCourseRatingCount = async (courseId: string) => {
    try {


        const ratingAvg = await prisma.ratingsOnCourses.aggregate({
            _count: {
                rating: true
            },
            where: {
                courseId
            }
        })

        const ratingAvgData = ratingAvg._count

        // console.log("AVG Rating: ", ratingAvgData)

        return ratingAvgData.rating
    } catch (error) {
        // console.log(error)
        return null;
    }
}

export const getTutorRatingCount = async (tutorId: string) => {
    try {

        const ratingAvg = await prisma.ratingsOnTutors.aggregate({
            _count: {
                rating: true
            },
            where: {
                tutorId
            }
        })

        const ratingAvgData = ratingAvg._count

        // console.log("AVG Rating: ", ratingAvgData)

        return ratingAvgData.rating
    } catch (error) {
        // console.log(error)
        return null;
    }
}

export const updateCourseRating = async ( userId: string, courseId: string, data: any) => {
    try {

        const rating = await prisma.ratingsOnCourses.updateMany({
            where: {
                courseId,
                userId,
            },
            data
        })

        const avgRating = await prisma.ratingsOnCourses.aggregate({
            _avg: {
                rating: true
            },
            where: {
                courseId
            }
        })

        const avgRatingData = avgRating._avg.rating

        // console.log("AVG Rating: ", avgRatingData)

        await prisma.course.update({
            where: {
                id: courseId
            },
            data: {
                avgRating: avgRatingData
            }
        })

        return rating

    } catch (error) {
        return null
    }
}

export const updateTutorRating = async ( userId: string, tutorId: string, data: any) => {
    try {

        const rating = await prisma.ratingsOnTutors.updateMany({
            where: {
                tutorId,
                userId,
            },
            data
        })

        const avgRating = await prisma.ratingsOnTutors.aggregate({
            _avg: {
                rating: true
            },
            where: {
                tutorId
            }
        })

        const avgRatingData = avgRating._avg.rating

        // console.log("AVG Rating: ", avgRatingData)

        await prisma.tutor.update({
            where: {
                id: tutorId
            },
            data: {
                avgRating: avgRatingData
            }
        })

        return rating

    } catch (error) {
        return null
    }
}