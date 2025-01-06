"use server";

import * as z from "zod";
import { ContentChapterSchema, NewChapterSchema } from "@/schemas";
import { editChapterById, setChapter } from "@/data/chapters";
import { revalidatePath, revalidateTag } from "next/cache";
import { Chapter } from "@/interfaces/global";


// export const getChapters = async (page: number) => {
//     const chapters = await prisma.chapter.findMany({
//         orderBy: { order: 'asc' },
//         take: 12,
//         skip: (page - 1) * 12,
//     })
//     return chapters
// }

export const newInitChapter = async (values: z.infer<typeof NewChapterSchema>, courseId: string) => {
    const validatedFields = NewChapterSchema.safeParse(values);
    // console.log("validatedFields: ", validatedFields)
    // console.log("courseId: ", courseId)

    if (!values.title) {
        return { error: "Title is required" };
    }

    if (!validatedFields.success) return {
        error: "Invalid fields!"
    };

    // const chapterData =  
    await setChapter(validatedFields.data, courseId)
    // const data = await chapterData.json()
    revalidateTag('chapters')
    // revalidatePath(`/management/courses/${courseId}/edit/content`)
    // console.log("COurse Data Json", data)

    return {
        // data,
        success: "The chapter was successfully created!"
    };
};

export const updateContentChapter = async (courseId: string, chapterId: string, values: z.infer<typeof ContentChapterSchema>) => {
    const validatedFields = ContentChapterSchema.safeParse(values);


    if (!validatedFields.success) return { error: "Invalid fields!" };

    console.log("Chapter validatedFields: ", validatedFields.data)

    await editChapterById(chapterId, validatedFields.data)

    revalidatePath(`/management/courses/${courseId}/edit/content/${chapterId}`)

    return {
        success: "The chapter content was successfully updated!"
    };
};

export async function updateChaptersPositions(chapters: Chapter[]) {
    try {
        // Update each item's position in the database
        const updatePromises = chapters.map(async (item) =>
            await editChapterById(item.id, { position: item.position })
            // prisma.chapters.update({
            //     where: { id: item.id },
            //     data: { position: item.position },
            // })
        );

        // Wait for all updates to complete
        await Promise.all(updatePromises);

        return { success: true };
    } catch (error) {
        console.error("Error updating positions:", error);
        return { success: false, error: "Failed to update positions" };
    }
}