"use server"

import { auth } from "@/auth";
import { prisma } from "@/lib/prismadb"
import { simulateDelay } from "@/lib/utils";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

type ChapterBodyType = {
    name: string;
    description?: string;
    videoUrl?: string;
    isPublished?: boolean;
    isFree?: boolean;
    // courseId?: string;
}

export const setChapter = async (body: ChapterBodyType, courseId: string) => {
    try {
        const session = await auth();
        const user = session?.user;

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Optional: Check if the user is the course owner
        // const courseOwner = await prisma.course.findUnique({
        //     where: {
        //         id: courseId,
        //         createdById: user.id,
        //     }
        // });
        // if (!courseOwner) {
        //     console.log("You are not allowed to create a chapter for this course");
        //     return new NextResponse("Unauthorized", { status: 401 });
        // }

        const lastChapter = await prisma.chapter.findFirst({
            where: { courseId },
            orderBy: { position: "desc" },
        });

        const newPosition = lastChapter ? lastChapter.position + 1 : 1;

        // Create the new chapter
        const chapter = await prisma.chapter.create({
            data: {
                name: body.name,
                description: body.description,
                position: newPosition,
                isPublished: body.isPublished,
                isFree: body.isFree,
                courseId,
                prevChapter: lastChapter?.id || null, // Link to the previous chapter if it exists
            },
        });

        // Update the `nextChapterId` of the previous chapter, if it exists
        if (lastChapter) {
            await prisma.chapter.update({
                where: { id: lastChapter.id },
                data: { nextChapter: chapter.id },
            });
        }

        return Response.json(chapter);

    } catch (error) {
        console.error(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};


export const getAllChapters = async () => {
    try {
        const chapters = await prisma.chapter.findMany()

        // console.log("GET ALL CHAPTERS (DATA): ", chapters)

        return chapters;

    } catch (error) {
        console.error(error)
        return null;
    }
}

export const getAllChaptersLazy = async (page: number) => {
    try {
        const chapters = await prisma.chapter.findMany({
            orderBy: { position: 'asc' },
            take: 12,
            skip: (page - 1) * 12,
        })

        // console.log("GET ALL CHAPTERS LAZY (DATA): ", chapters)

        return chapters;

    } catch (error) {
        console.error(error)
        return null;
    }
}

// needs to be reviewed
export async function reorderChapters(
    updates: { id: string; position: number }[]
) {
    const transaction = updates.map((update) =>
        prisma.chapter.update({
            where: { id: update.id },
            data: { position: update.position }
        })
    )

    await prisma.$transaction(transaction)
    revalidatePath('/chapters')
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

        // console.log("GET PUBLISHED CHAPTERS (DATA): ", chapters)

        return chapters;

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

        // console.log("GET PUBLISHED CHAPTERS BY ID (DATA): ", chapters)

        return chapters;

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

        // console.log("GET PUBLISHED CHAPTERS BY COURSE ID (DATA): ", chapters)

        return chapters;

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

        if (process.env.NODE_ENV === "development") {
            await simulateDelay(3000); // 3 seconds delay
        }
        // revalidatePath('/chapters')
        // revalidateTag('chapters')
        // revalidatePath(`/management/courses/${courseId}/edit/content`)
        // console.log("GET ALL CHAPTERS BY COURSE ID (DATA): ", chapters)

        return chapters;

    } catch (error) {
        // console.log(error)
        return [];
    }
}

export const getChapterById = async (id: string) => {
    try {
        const chapter = await prisma.chapter.findUnique({
            where: {
                id
            }
        })

        // console.log("GET CHAPTER BY ID (DATA): ", chapter)

        return chapter
        // return NextResponse.json(chapter);

    } catch (error) {
        // console.log(error)
        return null;
    }
}

export const getChaptersCountByCourseId = async (courseId: string) => {
    try {
        const chapter = await prisma.chapter.aggregate({
            where: {
                courseId
            },
            _count: true
        })

        // console.log("COUNT CHAPTERS BY COURSE ID (DATA): ", chapter._count)

        return chapter._count;

    } catch (error) {
        // console.log(error)
        return null;
    }
}

export const getChaptersSumDurationByCourseId = async (courseId: string) => {
    try {
        const chapter = await prisma.chapter.aggregate({
            where: {
                courseId
            },
            _sum: {
                duration: true
            }
        })

        return chapter._sum.duration === null ? 0 : chapter._sum.duration;

    } catch (error) {
        // console.log(error)
        return null;
    }
}

export const editChapterById = async (id: string, body: any) => {
    try {
        const session = await auth()
        const user = session?.user

        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // console.log("Edit Course Body: ", body)

        const editedChapter = await prisma.chapter.update({
            where: {
                id
            },
            data: body
        })

        // console.log("EDIT CHAPTER BY ID (DATA): ", editedChapter)

        return editedChapter;

    } catch (error) {
        // console.log(error)
        return null;
    }
}

export const deleteChapterById = async (id: string) => {
    try {
        const session = await auth()

        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const deletedChapter = prisma.chapter.delete({
            where: {
                id
            }
        })


        // console.log("DELETED CHAPTER BY ID (DATA): ", deletedCourse)

        return deletedChapter;

    } catch (error) {
        console.error("DELETED COURSE BY ID (DATA): ", error)
        return null;
    }
}

export const deleteChaptersByIds = async (ids: string[]) => {
    try {
        const session = await auth()

        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const deletedChapters = await prisma.chapter.deleteMany({
            where: {
                id: {
                    in: ids
                }
            }
        })

        // console.log("DELETED CHAPTERS BY IDs (DATA): ", deletedChapters)

        return deletedChapters;

    } catch (error) {
        console.error("DELETED COURSES BY IDs (DATA): ", error)
        return null;
    }
}