import { auth } from "@/auth";
import { db } from "@/lib/db"
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
        console.log({ body })

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const courseOwner = await db.course.findUnique({
            where: {
                id: courseId,
                createdById: session.user.id,
            }
        })

        if (!courseOwner) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const lastChapter = await db.chapter.findFirst({
            where: {
                courseId
            },
            orderBy: {
                position: "desc",
            },
        });

        console.log("lastChapter: ", lastChapter)

        const newPosition = lastChapter ? lastChapter.position + 1 : 1;

        const chapter = await db.chapter.create({
            data: {
                title: body.title,
                description: body.description,
                videoUrl: body.videoUrl,
                position: newPosition,
                isPublished: body.isPublished,
                isFree: body.isFree,
                courseId: courseId
            }
        })

        return Response.json(chapter)
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export const getAllChapters = async () => {
    try {        
        const chapters = await db.chapter.findMany()
    
        return chapters
    } catch (error) {
        console.log(error)
        return [];
    }
}

export const getPublishdedChapters = async () => {
    try {
        const chapters = await db.chapter.findMany({
            where: {
                isPublished: true,
            },
            orderBy: {
                createdAt: 'asc',
            },
        })
        
        console.log(chapters)

        return chapters
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getPublishdedChaptersById = async (id: string) => {
    try {
        const chapters = await db.chapter.findMany({
            where: {
                id,
                isPublished: true,
            },
            orderBy: {
                createdAt: 'asc',
            },
        })
        
        console.log(chapters)

        return chapters
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getPublishdedChaptersByCourseId = async (courseId: string) => {
    try {
        const chapters = await db.chapter.findMany({
            where: {
                courseId,
                isPublished: true,
            },
            orderBy: {
                createdAt: 'asc',
            },
        })
        
        console.log(chapters)

        return chapters
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getAllChaptersByCourseId = async (courseId: string) => {
    try {
        const chapters = await db.chapter.findMany({
            where: {
                courseId,
            },
            orderBy: {
                createdAt: 'asc',
            },
        })
        
        console.log(chapters)

        return chapters
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getChapterById = async ( id: string ) => {
    try {
        const chapter = await db.chapter.findUnique({
            where: {
                id
            }
        })

        return chapter;
    } catch (error) {
            console.log(error)
            return null;
    }
}