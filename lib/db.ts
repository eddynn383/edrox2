// import { PrismaClient } from "@prisma/client/edge";
import { PrismaClient } from '@prisma/client'
// import { withAccelerate } from '@prisma/extension-accelerate'
// const prismaClientSingleton = () => {
//     return new PrismaClient().$extends(withAccelerate())
// }

// type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

// const globalForPrisma = globalThis as unknown as {
//     prisma: PrismaClientSingleton | undefined;
// }

// export const db = globalForPrisma.prisma?? prismaClientSingleton()

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

declare global {
    var prisma: PrismaClient | undefined
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;
