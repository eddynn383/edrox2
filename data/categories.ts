import { db } from "@/lib/db";

export const getAllCategories = async () => {
    try {
        const categories = await db.category.findMany()
    
        console.log(categories)
    
        return categories
    } catch (error) {
        console.log(error);
        return null;
    }

}

export const getCategoryById = async (id: string) => {
    try {
        const category = await db.category.findUnique({
            where: {
                id
            }
        })
    
        console.log(category)
    
        return category
    } catch (error) {
        console.log(error);
        return null;
    }

}