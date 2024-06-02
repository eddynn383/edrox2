import { auth } from "@/auth";
import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";


export const setProgress = async ( chapterId: string, isCompleted: boolean) => {

    try {
        const session = await auth()
        const user = session?.user

        if (!user?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const userProgress = await prisma.userProgress.upsert({
            where: {
                userId_chapterId: {
                    userId: user.id,
                    chapterId
                }
            },
            update: {
                isCompleted
            },
            create: {
                userId: user.id,
                chapterId,
                isCompleted: false,
            }
        })

        return NextResponse.json(userProgress);
    } catch (error) {
        console.log("[CHAPTER_ID_PROGRESS]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export const getProgress = async (courseId: string, userId?: string): Promise<number> => {
    try {
        const session = await auth()
        const user = session?.user

        const publishedChapters = await prisma.chapter.findMany({
            where: {
                courseId: courseId,
                isPublished: true,
            },
            select: {
                id: true,
            }
        });

        const publishedChapterIds = publishedChapters.map((chapter) => chapter.id);

        const validCompletedChapters = await prisma.userProgress.count({
            where: {
                userId: userId ? userId : user?.id,
                chapterId: {
                    in: publishedChapterIds,
                },
                isCompleted: true,
            }
        });

        const progressPercentage = (validCompletedChapters / publishedChapterIds.length) * 100;

        return progressPercentage;
    } catch (error) {
        console.log("[GET_PROGRESS]", error);
        return 0;
    }
}