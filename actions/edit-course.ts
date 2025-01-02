"use server";

import { editCourseById } from "@/data/courses";
import { revalidateTag } from "next/cache";

export const editCourse = async (id: string, data: any) => {
    // console.log(id, data)
    await editCourseById(id, data);
    revalidateTag('courses')
};

export const goToCourseDetails = async () => {

}

export const goToCourseContent = async () => {

}

export const goToCourseParticipants = async () => {

}

export const goToCourseRewards = async () => {

}