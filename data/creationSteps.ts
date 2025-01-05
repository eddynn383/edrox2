import { auth } from "@/auth";
import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const getAllCreationSteps = async () => {
    try {
        const steps = await prisma.creationStep.findMany()

        console.log("GET ALL CREATION STEPS (DATA): ", steps)

        return steps;

    } catch (error) {
        console.error("GET ALL CREATION STEPS (DATA): ", error)
        return [];
    }
}

export const getAllCreationStepsByFor = async (forName: string) => {
    try {
        const steps = await prisma.creationStep.findMany({
            where: {
                for: forName
            },
            orderBy: { position: 'asc' }
        })

        console.log("GET ALL CREATION STEPS BY FOR (DATA): ", steps)

        return steps;

    } catch (error) {
        console.error("GET ALL CREATION STEPS BY FOR (DATA): ", error)
        return [];
    }
}

export const getAllCreationStepsByUrl = async (url: string) => {
    try {

        if (!url) return

        const steps = await prisma.creationStep.findUnique({
            where: {
                url
            }
        })

        console.log("GET ALL CREATION STEPS BY FOR (DATA): ", steps)

        return steps;

    } catch (error) {
        console.error("GET ALL CREATION STEPS BY FOR (DATA): ", error)
        return [];
    }
}