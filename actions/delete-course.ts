"use server";



// Delete it after is merged with courses.ts

import { deleteCourseById, deleteCoursesByIds, editCourseById } from "@/data/courses";
import { revalidateTag } from "next/cache";
import { deleteFileUpload } from "./upload-file";

export const deleteCourse = async (id: string) => {
    await deleteCourseById(id);
    revalidateTag('courses')
};

export const deleteManyCourses = async (ids: string[]) => {

    await deleteCoursesByIds(ids);
    revalidateTag('courses')
};

export const deleteCourseImage = async (courseId: string, imageKey: string) => {
    try {
        await deleteFileUpload(imageKey);
        await editCourseById(courseId, { image: null })

        return { success: "Image deleted successfully" };
    } catch (error) {
        console.error("Failed to delete image:", error);
        return { error: "Failed to delete image" };
    }
};