"use server"

import { deleteContentById, setContent, updateContentById } from "@/data/content"
import { revalidatePath, revalidateTag } from "next/cache"

export const newContent = async (courseId: string, chapterId: string, type: string) => {
    console.log("chapter ID: ", chapterId)
    const content = await setContent({
        type,
        value: ""
    }, chapterId)

    const data = await content?.json()

    revalidatePath(`/management/courses/edit/${courseId}/chapter/${chapterId}`)

    return {
        data,
        success: "Content was successfully created!"
    }
}

export const updateContent = async (id: string, courseId: string, chapterId: string, data: any) => {
    await updateContentById(id, data)

    revalidatePath(`/management/courses/edit/${courseId}/chapter/${chapterId}`)

    return {
        data,
        success: "Content was successfully updated!"
    }
}

export const deleteContent = async (id: string, courseId: string, chapterId: string) => {

    await deleteContentById(id)

    revalidatePath(`/management/courses/edit/${courseId}/chapter/${chapterId}`)

    return {
        success: "Content was successfully removed!"
    }
}