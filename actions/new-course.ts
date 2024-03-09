"use server";

import * as z from "zod";
import { NewCourseSchema, NewCourseDetailsSchema } from "@/schemas";
import { auth } from "@/auth";
import { editCourseById, getCourseByUrl, setCourse } from "@/data/courses";
import { setTutor } from "@/data/tutors";
import { revalidateTag } from "next/cache";


export const newCourse = async (values: z.infer<typeof NewCourseSchema>) => {
    const validatedFields = NewCourseSchema.safeParse(values);
    const courseExists = await getCourseByUrl(values.url)
    const session = await auth()
    console.log("validatedFields: ", validatedFields)

    if (!values.title) {
        return { error: "Title is required" };
    }

    if (courseExists) {
        return { error: "Course already exists!" }
    }

    if (!values.category) {
        return { error: "Category is required" };
    }

    if (!validatedFields.success) return { error: "Invalid fields!" };

    const courseData = await setCourse(validatedFields.data)
    const data = await courseData.json()

    console.log("Course Data Json", data)

    const currentUser = {
        name: session?.user.name,
        image: session?.user.image,
        userId: session?.user.id
    }

    const tutor = await setTutor(currentUser, data.id)

    console.log("Tutor Data Json", tutor)

    revalidateTag('courses')

    return { 
        data,
        success: "The course was successfully created!" 
    };
};

export const updateCourse = async (courseId: string, values: z.infer<typeof NewCourseDetailsSchema>) => {
    const validatedFields = NewCourseDetailsSchema.safeParse(values);
    const session = await auth()

    if (!validatedFields.success) return { error: "Invalid fields!" };

    const courseData = await editCourseById(courseId, validatedFields.data)

    const data = await courseData.json()

    revalidateTag('courses')

    return { 
        data,
        success: "The course was successfully updated!" 
    };
};