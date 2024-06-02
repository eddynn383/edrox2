import { auth } from "@/auth";


export const isUserAllowed = async () => {
    const session = await auth();
    const userRole = session?.user.role;
    // console.log(userRole)

    return userRole === process.env.APP_ALLOWED_USER;
}