import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

type GetCourses = {
    title?: string;
    categoryId?: string;
};

export const getAllCourses = async () => {
    try {        
        const courses = await db.course.findMany()
    
        return courses
    } catch (error) {
        console.log(error)
        return [];
    }
}

export const getPublishdedCourses = async ({ title, categoryId }: GetCourses) => {
    try {
        const courses = await db.course.findMany({
            where: {
                isPublished: true,
                title: {
                    contains: title,
                    mode: 'insensitive'
                },
                categoryId,
            },
            include: {
                category: true,
                chapters: {
                    where: {
                        isPublished: true,
                    },
                    select: {
                        id: true
                    }
                }
            }
        })
        console.log(courses)

        return courses
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getCoursesById = async (id: string) => {
    try {
        const courses = await db.course.findUnique({
            where: {
                id
            }
        })

        return courses
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getCoursesByTitle = async (title: string) => {
    try {
        const courses = await db.course.findMany({
            where: {
                title: {
                    contains: title
                }
            }
        })

        return courses
    } catch (error) {
        console.log(error)
        return null
    }
}

export const deleteCourseById = async (id: string) => {
    try {
        const session = await auth()

        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        console.log("the deletion is triggered")

        const deletedCourse = await db.course.delete({
            where: {
                id
            }
        })


        return NextResponse.json(deletedCourse)
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export const deleteCoursesByIds = async (ids: string[]) => {
    try {
        const session = await auth()

        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        console.log("the deletion is triggered")

        const deletedCourses = await db.course.deleteMany({
            where: {
                id: {
                    in: ids
                }
            }
        })


        return NextResponse.json(deletedCourses)
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}