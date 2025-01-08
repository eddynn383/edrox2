import { auth } from "@/auth";
import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const setCategory = async (body: any) => {
    try {

        const session = await auth()
        const user = session?.user

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const category = await prisma.category.create({
            data: {
                name: body.name,
                createdById: user?.id as string
            }
        })

        // console.log("SETTED CATEGORY (DATA): ", category)

        return NextResponse.json(category);

    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export const editCategoryById = async (id: string, body: any) => {
    try {
        const session = await auth()
        const user = session?.user

        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const editedCategory = await prisma.category.update({
            where: {
                id
            },
            data: body
        })


        return editedCategory
    } catch (error) {
        // console.log(error)
        return null;
    }
}

export const getAllCategories = async () => {
    try {
        const categories = await prisma.category.findMany({
            include: {
                createdBy: true,
                courses: true
            }
        })

        // console.log("GET ALL CATEGORIES (DATA): ", categories)

        return categories;

    } catch (error) {
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

        // console.log("GET CATEGORY BY ID (DATA): ", category)

        return category;

    } catch (error) {
        return null;
    }

}

export const deleteCategoryById = async (id: string) => {
    try {
        const session = await auth()

        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const deletedCategory = await prisma.category.delete({
            where: {
                id
            }
        })

        // console.log("DELETED CATEGORY BY ID (DATA): ", deletedCategory)

        return deletedCategory;

    } catch (error) {
        return null;
    }
}

export const deleteCategoriesByIds = async (ids: string[]) => {
    try {
        const session = await auth()

        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const deletedCategories = await prisma.category.deleteMany({
            where: {
                id: {
                    in: ids
                }
            }
        })

        // console.log("DELETED CATEGORIES BY IDs (DATA): ", deletedCategories)

        return deletedCategories;

    } catch (error) {
        return null;
    }
}