"use server";

import * as z from "zod";
import { NewChapterSchema } from "@/schemas";
import { setChapter } from "@/data/chapters";
import { revalidatePath, revalidateTag } from "next/cache";


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
    // revalidateTag('chapters')
    revalidatePath(`/admin/courses/edit/${courseId}`)
    // console.log("COurse Data Json", data)

    return { 
        // data,
        success: "The chapter was successfully created!" 
    };
};