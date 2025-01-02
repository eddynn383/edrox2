"use server"

import * as z from "zod";
import { deleteCategoriesByIds, deleteCategoryById, editCategoryById, setCategory } from "@/data/categories";
import { CategorySchema, NewCategorySchema } from "@/schemas";
import { revalidateTag } from "next/cache";

export const newCategory = async (values: z.infer<typeof NewCategorySchema>) => {
    const validatedFields = NewCategorySchema.safeParse(values);

    if (!values.name) {
        return { error: "Name is required" };
    }

    if (!validatedFields.success) return { error: "Invalid fields!" };

    const categoryData = await setCategory(validatedFields.data)
    const data = await categoryData.json()

    revalidateTag('categories')

    return {
        data,
        success: "The category was successfully created!"
    };
};

export const updateCategory = async (id: string, values: z.infer<typeof CategorySchema>) => {
    const validatedFields = CategorySchema.safeParse(values);

    if (!values.name) {
        return { error: "Name is required" };
    }

    if (!validatedFields.success) return { error: "Invalid fields!" };

    await editCategoryById(id, validatedFields.data)

    revalidateTag('categories')

    return {
        success: "The category was successfully updated!"
    };
};

export const deleteCategory = async (id: string) => {
    await deleteCategoryById(id);
    revalidateTag('categories')
};

export const deleteManyCategories = async (ids: string[]) => {

    await deleteCategoriesByIds(ids);
    revalidateTag('categories')
};