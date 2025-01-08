import { User } from "@/interfaces/global";
import { prisma } from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export const getAllUsers = async () => {
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                name: 'asc',
            },
        })

        return users

    } catch (error) {
        // console.log(error)
        return null
    }
}

export const getAllUsersByRole = async (role: UserRole, courseId: string) => {
    try {
        const users = await prisma.user.findMany({
            where: {
                role,
                NOT: {
                    coursesGroups: {
                        some: {
                            group: {
                                courseId
                            }
                        }, // Exclude users with any related course groups
                    },
                },
            },
            orderBy: {
                name: 'asc',
            },
        })

        return users

    } catch (error) {
        // console.log(error)
        return null
    }
}

export const getUserByEmail = async (email: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        return user

    } catch (error) {
        // console.log(error)
        return null
    }
}

export const getUserById = async (id: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })

        return user

    } catch (error) {
        // console.log(error)
        return null
    }
}

export const getUsersByCourseGroupId = async (groupId: string) => {
    try {
        const users = await prisma.userOnCoursesGroups.findMany({
            where: {
                groupId
            },
            orderBy: {
                user: {
                    name: 'asc'
                }
            },
            include: {
                user: true
            }
        })

        console.error("GET USERS BY COURSE GROUP ID (DATA): ", users)

        return users

    } catch (error) {
        console.error("GET USERS BY COURSE GROUP ID (DATA): ", error)
        return null;

    }
}

export const countUsersOnCourseGroup = async (groupId: string) => {
    try {
        const totalUsers = await prisma.userOnCoursesGroups.count({
            where: {
                groupId
            }
        })

        console.error("COUNT USERS ON COURSE GROUP (DATA): ", totalUsers)
        return totalUsers;

    } catch (error) {
        console.error("COUNT USERS ON COURSE GROUP (DATA): ", error)
        return null;
    }
}

export const updateUserById = async (id: string, data: User) => {
    try {
        const user = await prisma.user.update({
            where: {
                id
            },
            data
        })
        // console.log("User successfully updated!")
        return user

    } catch (error) {
        // console.log(error)
        return null
    }
}

export const deleteUsersByIds = async (ids: string[]) => {
    try {

        const deletedUsers = await prisma.user.deleteMany({
            where: {
                id: {
                    in: ids
                }
            }
        })

        // console.log("DELETED USERS BY IDs (DATA): ", deletedUsers)

        return deletedUsers;

    } catch (error) {
        console.error("DELETED USERS BY IDs (DATA): ", error)
        return null;
    }
}