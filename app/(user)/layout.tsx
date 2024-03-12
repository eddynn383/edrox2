import { Sidebar } from "@/module/Sidebar";
import Header from "@/module/Header";
import { auth, signOut } from "@/auth";
import { Button } from "@/components";
import { logout } from "@/actions/logout";

const DashboardLayout = async ({
    children
}: {
    children: React.ReactNode
}) => {
    const session = await auth()
    // const logOut = await signOut()

    // console.log("LAYOUT SESSION: ", session)

    return (
        <div className="layout layout--two-cols">
            <div className="layout_left">
                <Sidebar user={session?.user} />
            </div>
            <div className="layout_right">
                <Header user={session?.user} onLogout={logout} />
                {children}
            </div>
        </div>
    );
}

export default DashboardLayout;