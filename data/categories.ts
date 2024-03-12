import { prisma } from "@/lib/prismadb";

export const getAllCategories = async () => {
    try {
        const categories = await prisma.category.findMany()
    
        console.log(categories)
    
        return categories
    } catch (error) {
        console.log(error);
        return null;
    }

}

export const getCategoryById = async (id: string) => {
    try {
        const category = await prisma.category.findUnique({
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