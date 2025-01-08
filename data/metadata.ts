import { auth } from "@/auth";
import { prisma } from "@/lib/prismadb"
import { NextResponse } from "next/server";

type Metadata = {
    key: string;
    value: string;
    courseId?: string;
}

export const setMetadata = async (courseId: string, body: Metadata) => {
    // console.log("set Meta Body: ", body)

    try {

        const session = await auth()
        const user = session?.user

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const alreadyCreated = await prisma.metadata.findUnique({
            where: {
                id: courseId,
                key: body.key
            }
        })

        // console.log("alreadyCreated: ", alreadyCreated)

        // if (!alreadyCreated) {
        //     return new NextResponse("Key already exists!!!!!", { status: 500 })
        // }

        const metadata = await prisma.metadata.create({
            data: {
                key: body.key,
                value: body.value,
                courseId: courseId
            }
        })

        // console.log("METADATA: ", metadata)

        return Response.json(metadata)
        // console.log("Metadata: ", metadata)
        // return metadata
    } catch (error) {
        // console.log(error)
        return null
    }
}

export const getMetadata = async (courseId: string) => {
    try {
        const metadata = await prisma.metadata.findMany({
            where: {
                courseId
            }
        })

        return metadata
    } catch (error) {
        return [];
    }
}