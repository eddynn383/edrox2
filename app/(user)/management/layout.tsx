import { auth } from "@/auth";
import { redirect } from "next/navigation";

const AdminLayout = async ({
    children
}: {
    children: React.ReactNode;
}) => {
    const session = await auth();
    // const session = {
    //     user: {
    //         id: 1,
    //         name: "John Doe",
    //         email: "john.doe@example.com",
    //         image: "/assets/images/profile-avatar.png",
    //         role: "ADMIN"
    //     }
    // }

    if (session?.user.role !== "ADMIN") {
        return redirect("/unauthorized");
    }

    return <>{children}</>
}

export default AdminLayout;