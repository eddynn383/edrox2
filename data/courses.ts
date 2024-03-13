import { auth } from "@/auth";
import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";

type GetCourses = {
    title: string;
    categoryId?: string;
};

export const setCourse = async (body: any) => {
    try {

        const session = await auth()
        const user = session?.user
        // console.log({ body })

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const course = await prisma.course.create({
            data: {
                title: body.title,
                categoryId: body.category,
                createdById: user?.id as string
            }
        })

        return NextResponse.json(course)
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export const getAllCourses = async () => {
    try {        
        const courses = await prisma.course.findMany({
            orderBy: {
                createdAt: 'asc',
            },
            include: {
                price: true,
                chapters: true,
                tutors: true
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

        const courses = await prisma.course.findMany({
            where: {
                isPublished: true,
                title: {
                    contains: title,
                    mode: 'insensitive'
                },
                categoryId,
            },
            include: {
                price: true,
                category: true,
                chapters: {
                    where: {
                        isPublished: true,
                    },
                    select: {
                        id: true
                    }
                },
                tutors: true,
                ratings: true,
            },
            orderBy: {
                createdAt: 'asc',
            }
        })
        
        // console.log(courses)
        // await new Promise((resolve) => setTimeout(resolve, 5000))
        return courses
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getCourseById = async (id: string) => {
    try {
        const course = await prisma.course.findUnique({
            where: {
                id
            },
            include: {
                price: true,
                category: true,
                chapters: {
                    where: {
                        isPublished: true,
                    },
                    // select: {
                    //     id: true
                    // }
                },
                tutors: {
                    select: {
                        tutorId: true
                    }
                }
            }
        })

        // console.log("RETURNED COURSE: ", course)
        return course
    } catch (error) {
        console.log(error)
        return null
    }
}

// export const getCourseByUrl = async (url: string) => {
//     try {
//         const course = await prisma.course.findUnique({
//             where: {
//                 url
//             },
//             include: {
//                 category: true
//             }
//         })

//         return course
//     } catch (error) {
//         console.log(error)
//         return null
//     }
// }

export const getCoursesByTitle = async (title: string) => {
    try {
        const courses = await prisma.course.findMany({
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

        // console.log("edit happened")

        const editedCourse = await prisma.course.update({
            where: {
                id
            },
            data
        })


        return editedCourse
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const deleteCourseById = async (id: string) => {
    try {
        const session = await auth()

        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // console.log("the deletion is triggered")

        const deletedCourse = await prisma.course.delete({
            where: {
                id
            }
        })


        return deletedCourse
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const deleteCoursesByIds = async (ids: string[]) => {
    try {
        const session = await auth()

        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // console.log("the deletion is triggered")

        const deletedCourses = await prisma.course.deleteMany({
            where: {
                id: {
                    in: ids
                }
            }
        })


        return deletedCourses
    } catch (error) {
        console.log(error)
        return null;
    }
}