import { auth } from "@/auth";
import { db } from "@/lib/db"
import { NextResponse } from "next/server";

// type CourseBody = {
//     title: string;
//     url: string;
//     description?: string;
//     category: any;
//     createdBy: any;
// }

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