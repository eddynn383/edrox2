import { isTeacher } from "@/lib/teacher";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const AdminLayout = async ({
    children
}: {
    children: React.ReactNode;
}) => {
    const session = await auth();

    if (session?.user.role !== "ADMIN") {
        return redirect("/unauthorized");
    }

    return <>{children}</>
}

export default AdminLayout;