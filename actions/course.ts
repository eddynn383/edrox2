"use server";

import * as z from "zod";
import { NewCourseSchema, CourseDescriptionSchema, CourseImageSchema, CourseMetadataSchema, CourseSchema, CourseSettingsSchema } from "@/schemas";
import { deleteCourseById, deleteCoursesByIds, editCourseById, editCourseSettingsById, getCourseById, setCourse } from "@/data/courses";
import { revalidatePath, revalidateTag } from "next/cache";
import { setMetadata } from "@/data/metadata";
import { deleteFileUpload } from "./upload-file";


export const newCourse = async (values: z.infer<typeof NewCourseSchema>) => {
    const validatedFields = NewCourseSchema.safeParse(values);

    if (!values.name) {
        return { error: "Name is required" };
    }

    if (!values.category) {
        return { error: "Category is required" };
    }

    if (!validatedFields.success) return { error: "Invalid fields!" };

    // const validatedData = {
    //     title: validatedFields.data.title,
    //     categoryId: validatedFields.data.category,
    // }

    const courseData = await setCourse(validatedFields.data)

    const data = await courseData.json()
    // console.log("courseData JSON: ", data)

    revalidateTag('courses')

    return {
        data,
        success: "The course was successfully created!"
    };
};

export const updateCourse = async (courseId: string, values: z.infer<typeof NewCourseSchema>) => {
    const validatedFields = CourseSchema.safeParse(values);

    // console.log("************** Update Course Start **************")
    console.group()
    // console.log(values)
    console.groupEnd()
    // console.log("************** Update Course End **************")

    if (!values.name) {
        return { error: "Title is required" };
    }

    if (!values.category) {
        return { error: "Category is required" };
    }

    if (!validatedFields.success) return { error: "Invalid fields!" };
    // console.log("This function 'updateCourse' is called!")
    // const newCourse = {
    //     title: validatedFields.data.title,
    //     description: validatedFields.data.description,
    //     categoryId: validatedFields.data.category,
    //     image: {
    //         upsert: {
    //             create: {
    //                 url: validatedFields.data.image?.url,
    //                 key: validatedFields.data.image?.key,
    //             },
    //             update: {
    //                 url: validatedFields.data.image?.url,
    //                 key: validatedFields.data.image?.key,
    //             },
    //         },
    //     },
    // }

    const course: any = await editCourseById(courseId, validatedFields.data)

    revalidatePath(`/management/courses/edit/${courseId}`)

    return {
        course,
        success: "The course was successfully updated!"
    };
};

export const updateCourseDescription = async (courseId: string, values: z.infer<typeof CourseDescriptionSchema>) => {
    const validatedFields = CourseDescriptionSchema.safeParse(values);

    if (!validatedFields.success) return { error: "Invalid fields!" };

    await editCourseById(courseId, validatedFields.data)

    revalidatePath(`/management/courses/edit/${courseId}`)

    return {
        success: "The course was successfully updated!"
    };
};



export const updateCourseCover = async (courseId: string, values: z.infer<typeof CourseImageSchema>) => {
    const validatedFields = CourseImageSchema.safeParse(values);

    if (!validatedFields.success) return { error: "Invalid fields!" };

    // console.log("validatedFields: ", validatedFields)

    await editCourseById(courseId, validatedFields.data)

    revalidateTag('courses')

    return {
        success: "The course was successfully updated!"
    };
}

export const updateCourseMetadata = async (courseId: string, values: z.infer<typeof CourseMetadataSchema>) => {
    const validatedFields = CourseMetadataSchema.safeParse(values);

    // console.log("Validated Values", validatedFields)

    if (!validatedFields.success) return { error: "Invalid fields!" };

    const metadata = await setMetadata(courseId, validatedFields.data)
    const data = await metadata?.json()
    // console.log("===metadata:", metadata)

    revalidatePath(`/management/courses/edit/${courseId}`)

    return {
        data,
        success: "The metadata was successfully created!"
    };
};

export const updateCourseSettings = async (id: string, values: z.infer<typeof CourseSettingsSchema>) => {
    const validatedFields = CourseSettingsSchema.safeParse(values);

    if (!validatedFields.success) return { error: "Invalid fields!" };

    await editCourseSettingsById(id, validatedFields.data)

    revalidateTag('courses')

    return {
        success: "The course was successfully updated!"
    };
}


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