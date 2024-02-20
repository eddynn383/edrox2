import { db } from "@/lib/db";

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