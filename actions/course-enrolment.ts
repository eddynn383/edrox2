"use server"

import { setEnrolment } from "@/data/enrolment";
import { revalidatePath } from "next/cache";

export const courseEnrolment = async (courseId: string) => { 
    const enrolled = await setEnrolment(courseId)

    const data =  await enrolled?.json()

    revalidatePath(`/catalog/course/${courseId}`)

    return { 
        data,
        success: "You are successfully enrolled"
    }
};