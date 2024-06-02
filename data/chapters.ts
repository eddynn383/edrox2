import { auth } from "@/auth";
import { prisma } from "@/lib/prismadb"
import { NextResponse } from "next/server";

type ChapterBodyType = {
    title: string;
    description?: string;
    videoUrl?: string;
    isPublished?: boolean;
    isFree?: boolean;
    // courseId?: string;
}

export const setChapter = async (body: ChapterBodyType, courseId: string) => {
    try {

        const session = await auth()
        const user = session?.user
        // console.log({ body })

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const courseOwner = await prisma.course.findUnique({
            where: {
                id: courseId,
                createdById: session.user.id,
            }
        })

        // if (!courseOwner) {
        //     console.log("You are not allowed to create a chapter for this course")
        //     return new NextResponse("Unauthorized", { status: 401 });
        // }

        const lastChapter = await prisma.chapter.findFirst({
            where: {
                courseId
            },
            orderBy: {
                position: "desc",
            },
        });

        // console.log("lastChapter: ", lastChapter)

        const newPosition = lastChapter ? lastChapter.position + 1 : 1;

        const chapter = await prisma.chapter.create({
            data: {
                title: body.title,
                description: body.description,
                position: newPosition,
                isPublished: body.isPublished,
                isFree: body.isFree,
                courseId: courseId
            }
        })

        return Response.json(chapter)
    } catch (error) {
        // console.log(error)
        return null
    }
}

export const getAllChapters = async () => {
    try {        
        const chapters = await prisma.chapter.findMany()
    
        return chapters
    } catch (error) {
        // console.log(error)
        return null;
    }
}

export const getPublishdedChapters = async () => {
    try {
        const chapters = await prisma.chapter.findMany({
            where: {
                isPublished: true,
            },
            orderBy: {
                createdAt: 'asc',
            },
        })
        
        // console.log(chapters)

        return chapters
    } catch (error) {
        // console.log(error)
        return null;
    }
}

export const getPublishdedChaptersById = async (id: string) => {
    try {
        const chapters = await prisma.chapter.findMany({
            where: {
                id,
                isPublished: true,
            },
            orderBy: {
                createdAt: 'asc',
            },
        })
        
        // console.log(chapters)

        return chapters
    } catch (error) {
        // console.log(error)
        return null;
    }
}

export const getPublishdedChaptersByCourseId = async (courseId: string) => {
    try {
        const chapters = await prisma.chapter.findMany({
            where: {
                courseId,
                isPublished: true,
            },
            orderBy: {
                createdAt: 'asc',
            },
        })
        
        // console.log(chapters)

        return chapters
    } catch (error) {
        // console.log(error)
        return [];
    }
}

export const getAllChaptersByCourseId = async (courseId: string) => {
    try {
        const chapters = await prisma.chapter.findMany({
            where: {
                courseId,
            },
            orderBy: {
                createdAt: 'asc',
            },
        })
        
        // console.log(chapters)

        return chapters
    } catch (error) {
        // console.log(error)
        return [];
    }
}

export const getChapterById = async ( id: string ) => {
    try {
        const chapter = await prisma.chapter.findUnique({
            where: {
                id
            }
        })

        return chapter;
    } catch (error) {
        // console.log(error)
        return null;
    }
}

export const getChaptersCountByCourseId = async ( courseId: string) => {
    try {
        const chapter = await prisma.chapter.aggregate({
            where: {
                courseId
            },
            _count: true
        })

        return chapter._count
    } catch (error) {
        // console.log(error)
        return null;
    }
}

export const getChaptersSumDurationByCourseId = async ( courseId: string) => {
    try {
        const chapter = await prisma.chapter.aggregate({
            where: {
                courseId
            },
            _sum: {
                duration: true
            }
        })

        return chapter._sum.duration === null ? 0 : chapter._sum.duration
    } catch (error) {
        // console.log(error)
        return null;
    }
}