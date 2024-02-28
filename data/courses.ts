import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

type GetCourses = {
    title: string;
    categoryId?: string;
};

export const setCourse = async (body: any) => {
    try {

        const session = await auth()
        const user = session?.user
        console.log({ body })

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const course = await db.course.create({
            data: {
                title: body.title,
                url: body.url,
                categoryId: body.category,
                createdById: user?.id as string
            }
        })

        return Response.json(course)
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export const getAllCourses = async () => {
    try {        
        const courses = await db.course.findMany({
            orderBy: {
                createdAt: 'asc',
            }
        })
    
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
            },
            orderBy: {
                createdAt: 'asc',
            },
        })
        
        console.log(courses)
        // await new Promise((resolve) => setTimeout(resolve, 5000))
        return courses
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getCourseById = async (id: string) => {
    try {
        const course = await db.course.findUnique({
            where: {
                id
            },
            include: {
                category: true
            }
        })

        return course
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getCourseByUrl = async (url: string) => {
    try {
        const course = await db.course.findUnique({
            where: {
                url
            },
            include: {
                category: true
            }
        })

        return course
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

export const editCourseById = async (id: string, data: any) => {
    try {
        const session = await auth()

        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        console.log("edit happened")

        const editedCourse = await db.course.update({
            where: {
                id
            },
            data
        })


        return NextResponse.json(editedCourse)
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Error", { status: 500 })
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