"use server";

import * as z from "zod";
import { NewCourseSchema, NewCourseDetailsSchema } from "@/schemas";
import { auth } from "@/auth";
import { editCourseById, setCourse } from "@/data/courses";
import { setTutor } from "@/data/tutors";
import { setPrice } from "@/data/prices";
import { revalidateTag } from "next/cache";


export const newCourse = async (values: z.infer<typeof NewCourseSchema>) => {
    const validatedFields = NewCourseSchema.safeParse(values);
    // const courseExists = await getCourseByUrl(values.url)
    const session = await auth()
    // console.log("validatedFields: ", validatedFields)

    if (!values.title) {
        return { error: "Title is required" };
    }

    // if (courseExists) {
    //     return { error: "Course already exists!" }
    // }

    if (!values.category) {
        return { error: "Category is required" };
    }

    if (!validatedFields.success) return { error: "Invalid fields!" };

    const courseData = await setCourse(validatedFields.data)
    const data = await courseData.json()

    // console.log("Course Data Json", data)

    const currentUser = {
        name: session?.user.name,
        image: session?.user.image,
        userId: session?.user.id
    }

    // const tutor = await setTutor(currentUser, courseData.id)
    // const price = await setPrice(null, "") 

    // console.log("Tutor Data Json", tutor)

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

    const course = await editCourseById(courseId, validatedFields.data)

    revalidateTag('courses')

    return {
        success: "The course was successfully updated!" 
    };
};