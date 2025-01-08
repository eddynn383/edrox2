import { auth } from "@/auth"
import { prisma } from "@/lib/prismadb"
import { NextResponse } from "next/server"

type paramsType = {
    params: {
        forName: string;
    }
}

export async function GET(request: Request, { params }: paramsType) {
    try {
        const { forName } = params;

        const creationStep = await prisma.creationStep.findMany({
            where: {
                for: forName,
            },
            // cacheStrategy: { ttl: 60 }
        })
        // .withAccelerateInfo()

        return Response.json(creationStep)
    } catch (error) {
        // console.log(error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}