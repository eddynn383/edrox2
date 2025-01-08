import { setProgress } from "@/data/progress"
import { revalidatePath } from "next/cache"

export const newProgress = async (courseId: string, chapterId: string, isCompleted: boolean) => {
    // console.log("chapter ID: ", chapterId)
    const content = await setProgress(chapterId, isCompleted)

    const data = await content?.json()

    revalidatePath(`/management/courses/edit/${courseId}/chapter/${chapterId}`)

    return {
        data,
        success: `This chapter ${chapterId} was succesfully set in progress`
    }
}