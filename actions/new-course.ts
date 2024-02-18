"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { NewCourseSchema } from "@/schemas";
import { auth } from "@/auth";

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

    await db.course.create({
        data: {
            title,
            description,
            createdById: session?.user.id,
        },
    });

    return { success: "The course was successfully created!" };
};
