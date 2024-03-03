"use server";

import * as z from "zod";
import { NewInitChapterSchema } from "@/schemas";
import { setChapter } from "@/data/chapters";
import { revalidateTag } from "next/cache";


export const newInitChapter = async (values: z.infer<typeof NewInitChapterSchema>, courseId: string) => {
    const validatedFields = NewInitChapterSchema.safeParse(values);
    console.log("validatedFields: ", validatedFields)
    console.log("courseId: ", courseId)

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
    // console.log("COurse Data Json", data)

    return { 
        // data,
        success: "The chapter was successfully created!" 
    };
};