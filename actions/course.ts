"use server";

import * as z from "zod";
import { NewCourseSchema, CourseDescriptionSchema, CoverImageSchema, CourseMetadataSchema } from "@/schemas";
import { auth } from "@/auth";
import { editCourseById, getCourseById, setCourse } from "@/data/courses";
import { setTutor } from "@/data/tutors";
import { setPrice } from "@/data/prices";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { setMetadata } from "@/data/metadata";


export const newCourse = async (values: z.infer<typeof NewCourseSchema>) => {
    const validatedFields = NewCourseSchema.safeParse(values);

    if (!values.title) {
        return { error: "Title is required" };
    }

    if (!values.category) {
        return { error: "Category is required" };
    }

    if (!validatedFields.success) return { error: "Invalid fields!" };

    const courseData = await setCourse(validatedFields.data)
    const data = await courseData.json()

    revalidateTag('courses')

    return { 
        data,
        success: "The course was successfully created!" 
    };
};

export const updateCourse = async (courseId: string, values: z.infer<typeof NewCourseSchema>) => {
    const validatedFields = NewCourseSchema.safeParse(values);

    if (!values.title) {
        return { error: "Title is required" };
    }

    if (!values.category) {
        return { error: "Category is required" };
    }

    if (!validatedFields.success) return { error: "Invalid fields!" };
    // console.log("This function 'updateCourse' is called!")
    const newCourse = {
        title: validatedFields.data.title,
        categoryId: validatedFields.data.category
    }

    await editCourseById(courseId, newCourse)

    revalidatePath(`/admin/courses/edit/${courseId}`)

    return { 
        success: "The course was successfully updated!" 
    };
};

export const updateCourseDescription = async (courseId: string, values: z.infer<typeof CourseDescriptionSchema>) => {
    const validatedFields = CourseDescriptionSchema.safeParse(values);

    if (!validatedFields.success) return { error: "Invalid fields!" };
    
    await editCourseById(courseId, validatedFields.data)

    revalidatePath(`/admin/courses/edit/${courseId}`)

    return {
        success: "The course was successfully updated!" 
    };
};



export const updateCourseCover = async (courseId: string, values: z.infer<typeof CoverImageSchema>) => {
    const validatedFields = CoverImageSchema.safeParse(values);

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

    console.log("Validated Values", validatedFields)

    if (!validatedFields.success) return { error: "Invalid fields!" };
    
    const metadata = await setMetadata(courseId, validatedFields.data)
    const data = await metadata?.json()
    console.log("===metadata:", metadata)

    revalidatePath(`/admin/courses/edit/${courseId}`)

    return {
        data,
        success: "The metadata was successfully created!" 
    };
};