import { auth } from "@/auth";
import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const setImage = async (body: any) => {
    try {

        const session = await auth()
        const user = session?.user

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        console.log("SETTED IMAGE BODY (DATA): ", body)

        const image = await prisma.image.create({
            data: {
                name: body.name,
                url: body.url,
                key: body.key,
                type: body.type,
                size: body.size,
                uploadedById: user?.id as string
            }
        })

        console.log("SETTED IMAGE (DATA): ", image)

        return NextResponse.json(image)

    } catch (error) {
        console.error(error)
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export const getImageById = async (id: string) => {
    try {
        const image = await prisma.image.findUnique({
            where: {
                id
            }
        })

        console.log("GET IMAGE BY ID (DATA): ", image)

        return image;

    } catch (error) {
        console.log(error)
        return null
    }
}