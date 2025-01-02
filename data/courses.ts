import { auth } from "@/auth";
import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";

type GetCourses = {
    title: string;
    categoryId?: string;
};

type Course = {
    title: string;
    category: string;
}


export const setCourse = async (body: any) => {
    try {
        const session = await auth();
        const user = session?.user;

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Create the course
        const course = await prisma.course.create({
            data: {
                title: body.title,
                categoryId: body.category,
                createdById: user.id as string,
                updatedAt: new Date(),
                updatedById: user.id,
                settings: {
                    create: [
                        {
                            date: false,
                            repetition: false,
                            price: false,
                            seats: false,
                            tags: false,
                        },
                    ],
                }
            },
        });

        // Create a default group for the course
        const defaultGroup = await prisma.group.create({
            data: {
                name: "Default Group",
                courseId: course.id,
            }
        });

        console.log(
            "SETTED COURSE (DATA): ",
            course,
            "DEFAULT GROUP: ",
            defaultGroup
        );

        return NextResponse.json(course);
    } catch (error) {
        console.error("SETTED COURSE (DATA): ", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
};

export const setCourseSettings = async (data: any) => {
    try {

        const courseSettings = await prisma.courseSettings.create({
            data
        })

        console.log("SETTED COURSE SETTINGS (DATA): ", courseSettings)

        return NextResponse.json(courseSettings)

    } catch (error) {

        console.error("SETTED COURSE (DATA): ", error);

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
                image: true,
                tutors: {
                    include: {
                        tutors: true
                    }
                },
                createdBy: true
            }
        })

        console.log("GET ALL COURSS (DATA): ", courses)

        return courses;

    } catch (error) {
        console.error("GET ALL COURSS (DATA): ", error)
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
                image: true,
                tutors: true,
                ratings: true,
            },
            orderBy: {
                createdAt: 'asc',
            },
        })

        console.log("GET PUBLISHED COURSES (DATA): ", courses)

        return courses;

    } catch (error) {
        console.error("GET PUBLISHED COURSES (DATA): ", error)

        return null;
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
                image: true,
                chapters: {
                    where: {
                        isPublished: true,
                    },
                    orderBy: {
                        position: "asc",
                    },
                },
                tutors: {
                    select: {
                        tutorId: true,
                        tutors: true
                    }
                }
            }
        })

        console.log("GET COURSE BY ID (DATA): ", course)

        return course;

    } catch (error) {
        console.error("GET COURSE BY ID (DATA): ", error)
        return null
    }
}

export const getCoursesByTitle = async (title: string) => {
    try {
        const courses = await prisma.course.findMany({
            where: {
                title: {
                    contains: title
                }
            }
        })

        console.log("GET COURSE BY TITLE (DATA): ", courses)

        return courses;

    } catch (error) {
        console.error("GET COURSE BY TITLE (DATA): ", error)
        return null
    }
}

export const getCourseSettingsByCourseId = async (courseId: string) => {
    try {
        const courseSettings = await prisma.courseSettings.findFirst({
            where: {
                courseId
            }
        })

        console.log("GET COURSE SETTIGNS BY COURSE ID (DATA): ", courseSettings)

        return courseSettings;

    } catch (error) {
        console.error("GET COURSE SETTIGNS BY COURSE ID (DATA): ", error)
        return null
    }
}

export const editCourseById = async (id: string, body: any) => {
    try {
        const session = await auth()
        const user = session?.user

        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // console.log("edit happened")
        console.log("Edit Course Body: ", body)

        const editedCourse = await prisma.course.update({
            where: {
                id
            },
            data: {
                title: body.title,
                description: body.description,
                categoryId: body.category,
                imageId: body.image || null,
                updatedAt: new Date(),
                updatedById: user?.id
            },
            include: {
                image: true,
            }
        })

        console.log("UPDATE COURSE BY ID (DATA): ", editedCourse)

        return editedCourse;

    } catch (error) {
        console.error("UPDATE COURSE BY ID (DATA): ", error)
        return null;
    }
}



export const editCourseSettingsById = async (id: string, data: any) => {
    try {
        const courseSettings = await prisma.courseSettings.update({
            where: {
                id,
            },
            data
        })

        console.log("UPDATE COURSE SETTINGS BY ID (DATA): ", courseSettings)

        return courseSettings;

    } catch (error) {
        console.error("UPDATE COURSE SETTINGS BY ID (DATA): ", error)
        return null;
    }
}

export const deleteCourseById = async (id: string) => {
    try {
        const session = await auth()

        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const deletedCourseSettings = prisma.courseSettings.deleteMany({
            where: {
                courseId: id
            }
        })

        const deletedCourse = prisma.course.delete({
            where: {
                id
            }
        })


        console.log("DELETED COURSE BY ID (DATA): ", deletedCourse)

        const transaction = await prisma.$transaction([deletedCourseSettings, deletedCourse])

        return transaction;

    } catch (error) {
        console.error("DELETED COURSE BY ID (DATA): ", error)
        return null;
    }
}

export const deleteCoursesByIds = async (ids: string[]) => {
    try {
        const session = await auth()

        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const deletedCourses = await prisma.course.deleteMany({
            where: {
                id: {
                    in: ids
                }
            }
        })

        console.log("DELETED COURSES BY IDs (DATA): ", deletedCourses)

        return deletedCourses;

    } catch (error) {
        console.error("DELETED COURSES BY IDs (DATA): ", error)
        return null;
    }
}