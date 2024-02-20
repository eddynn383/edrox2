import { db } from "@/lib/db";

export const getCategories = async () => {
    try {
        const categories = await db.category.findMany()
    
        console.log(categories)
    
        return categories
    } catch (error) {
        console.log(error);
        return null;
    }

}