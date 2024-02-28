"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { NewCourseSchema, NewInitCourseSchema } from "@/schemas";
import { auth } from "@/auth";
import toast from "react-hot-toast";
import { getCourseByUrl, setCourse } from "@/data/courses";

export const newCourse = async (values: z.infer<typeof NewCourseSchema>) => {
    const validatedFields = NewCourseSchema.safeParse(values);
    console.log(validatedFields)

    const session = await auth()
    console.log(validatedFields)

    console.log(values)

    if (!values.title) {
        return { error: "title is required" };
    }

    if (!validatedFields.success) return { error: "Invalid fields!" };

    const { title, description } = validatedFields.data;

    // await db.course.create({
    //     data: {
    //         title,
    //         description,
    //         createdById: session?.user.id as string,
    //     },
    // });

    return { success: "The course was successfully created!" };
};


export const newInitCourse = async (values: z.infer<typeof NewInitCourseSchema>) => {
    const validatedFields = NewInitCourseSchema.safeParse(values);
    const courseExists = await getCourseByUrl(values.url)
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
    console.log("COurse Data Json", data)
    // return Response.json(courseData)

    return { 
        data,
        success: "The course was successfully created!" 
    };
};