import { auth } from "@/auth";
import { prisma } from "@/lib/prismadb"
import { simulateDelay } from "@/lib/utils";
import { NextResponse } from "next/server";

type GroupBodyType = {
    name: string;
    description?: string;
}

export const setGroup = async (body: GroupBodyType, courseId: string) => {
    try {
        console.log("Its called setGroup")
        const session = await auth()
        const user = session?.user

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const lastGroup = await prisma.group.findFirst({
            where: {
                courseId
            },
            orderBy: {
                position: "desc",
            },
        });

        console.log("lastGroup: ", lastGroup)

        const newPosition = lastGroup ? lastGroup.position + 1 : 1;

        const groupData = await prisma.group.create({
            data: {
                name: body.name,
                description: body.description,
                position: newPosition,
                courseId: courseId,
                createdById: user?.id as string,
                updatedAt: new Date(),
                updatedById: user?.id
            }
        })

        console.log("SETTED Group (DATA): ", groupData)

        return Response.json(groupData)

    } catch (error) {
        console.error(error)
        return null
    }
}

export const getAllGroups = async () => {
    try {
        const Groups = await prisma.group.findMany()

        console.log("GET ALL GroupS (DATA): ", Groups)

        return Groups;

    } catch (error) {
        console.error(error)
        return null;
    }
}

export const getAllGroupsLazy = async (page: number) => {
    try {
        const Groups = await prisma.group.findMany({
            orderBy: { position: 'asc' },
            take: 12,
            skip: (page - 1) * 12,
        })

        console.log("GET ALL GroupS LAZY (DATA): ", Groups)

        return Groups;

    } catch (error) {
        console.error(error)
        return null;
    }
}

export const getAllGroupsByCourseId = async (courseId: string) => {
    try {
        const groups = await prisma.group.findMany({
            where: {
                courseId,
            },
            orderBy: {
                createdAt: 'asc',
            },
            include: {
                _count: {
                    select: {
                        users: true
                    }
                }
            }
        })

        if (process.env.NODE_ENV === "development") {
            await simulateDelay(3000); // 3 seconds delay
        }

        console.log("GET ALL GroupS BY COURSE ID (DATA): ", groups)

        return groups;

    } catch (error) {
        console.log(error)
        return [];
    }
}

export const getGroupById = async (id: string) => {
    try {
        const group = await prisma.group.findUnique({
            where: {
                id
            }
        })

        console.log("GET Group BY ID (DATA): ", group)

        return group;

    } catch (error) {
        console.log(error)
        return null;
    }
}

// export const getGroupByName = async (courseId: string, name: string) => {
//     try {
//         const group = await prisma.group.findUnique({
//             where: {
//                 name,
//                 courseId
//             }
//         })

//         console.log("GET Group BY ID (DATA): ", group)

//         return group;

//     } catch (error) {
//         console.log(error)
//         return null;
//     }
// }

export const editGroupById = async (id: string, body: any) => {
    try {
        const session = await auth()
        const user = session?.user

        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        console.log("Edit Course Body: ", body)

        const editedGroup = await prisma.group.update({
            where: {
                id
            },
            data: body
        })

        console.log("EDIT Group BY ID (DATA): ", editedGroup)

        return editedGroup;

    } catch (error) {
        console.log(error)
        return null;
    }
}

export const assignUsersOnGroup = async (groupId: string, usersIds: string[]) => {
    try {
        const session = await auth()
        const user = session?.user

        if (!user?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const assignment = await prisma.userOnCoursesGroups.createMany({
            data: usersIds.map((userId) => ({
                userId,
                groupId,
                assignedAt: new Date(),
                assignedBy: user.id as string,
            })),
            skipDuplicates: true,
        })

        console.log("ASSIGN USERS ON GROUPID (DATA): ", assignment)

        // return { success: true, assignment }
        return assignment
    } catch (error) {
        console.log("ASSIGN USERS ON GROUPID (DATA): ", error)
        return { success: false, error };
    }
}