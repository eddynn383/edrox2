"use server"

import * as z from "zod";
import { NewCourseGroupSchema } from "@/schemas";
import { revalidateTag } from "next/cache";
import { assignUsersOnGroup, setGroup } from "@/data/groups";

export const newCourseGroup = async (values: z.infer<typeof NewCourseGroupSchema>, courseId: string) => {
    const validatedFields = NewCourseGroupSchema.safeParse(values);

    if (!values.name) {
        return { error: "Name is required" };
    }

    if (!validatedFields.success) return {
        error: "Invalid fields!"
    };

    await setGroup(validatedFields.data, courseId)
    revalidateTag('groups')

    return {
        success: "The group was successfully created!"
    };
};

export const assignUsersToGroup = async (groupId: string, usersIds: string[]) => {
    // const validatedFields = NewCourseGroupSchema.safeParse(values);

    // if (!values.name) {
    //     return { error: "Name is required" };
    // }

    // if (!validatedFields.success) return {
    //     error: "Invalid fields!"
    // };

    // console.log("Its called assignUsersOnGroup")

    await assignUsersOnGroup(groupId, usersIds)
    // revalidateTag('groups')

    return {
        success: "The group was successfully created!"
    };
};