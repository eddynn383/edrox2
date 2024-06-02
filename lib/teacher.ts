import { auth } from "@/auth";


export const isSuperUser = async () => {
    const session = await auth();
    const userRole = session?.user.role;
    // console.log(userRole)

    // return userId === process.env.APP_SUPERUSER_ID;
}