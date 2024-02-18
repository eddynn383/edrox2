import { db } from "@/lib/db";

export const getCourses = async () => {
    const courses = await db.course.findMany({
        include: {
            category: true,
            chapters: true
        }
    })

    console.log(courses)

    return courses

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