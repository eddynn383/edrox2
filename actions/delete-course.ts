"use server";

import { deleteCourseById, deleteCoursesByIds } from "@/data/courses";
import { revalidateTag } from "next/cache";

export const deleteCourse = async (id: string) => {
    await deleteCourseById(id);
    revalidateTag('courses')
};

export const deleteManyCourses = async (ids: string[]) => {

    await deleteCoursesByIds(ids);
    revalidateTag('courses')
};