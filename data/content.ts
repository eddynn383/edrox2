import { auth } from "@/auth";
import { prisma } from "@/lib/prismadb"
import { NextResponse } from "next/server";

type ContentBodyType = {
    type: string;
    value: string;
    position?: number;
}

export const setContent = async (body: ContentBodyType, chapterId: string) => {
    try {

        const session = await auth()
        const user = session?.user

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const lastContent = await prisma.content.findFirst({
            where: {
                chapterId
            },
            orderBy: {
                position: "desc",
            },
        });

        const newPosition = lastContent ? lastContent.position + 1 : 1;

        const content = await prisma.content.create({
            data: {
                chapterId,
                type: body.type,
                value: body.value,
                position: newPosition,
            }
        })

        return Response.json(content)
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getAllContent = async () => {
    try {        
        const content = await prisma.content.findMany()
    
        return content
    } catch (error) {
        // console.log(error)
        return null;
    }
}

export const getContentById = async (id: string) => {
    try {
        const content = await prisma.content.findMany({
            where: {
                id
            }
        })
        

        return content
    } catch (error) {
        // console.log(error)
        return null;
    }
}

export const getContentByChapterId = async (chapterId: string) => {
    try {
        const content = await prisma.content.findMany({
            where: {
                chapterId
            },
            orderBy: {
                position: 'asc',
            }
        })

        return content
    } catch (error) {
        // console.log(error)
        return null;
    }
}

export const updateContentById = async (id: string, data: any) => {
    try {
        const content = await prisma.content.update({
            where: {
                id
            }, 
            data: {
                value: data
            }
        })

        return content 
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const deleteContentById = async (id: string) => {
    try {
        await prisma.content.delete({
            where: {
                id
            }
        })

    } catch (error) {
        console.log(error)
        return null
    }
}