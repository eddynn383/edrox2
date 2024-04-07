import { Sidebar } from "@/module/Sidebar";
import Header from "@/module/Header";
import { auth, signOut } from "@/auth";
import { Button } from "@/components";
import { logout } from "@/actions/logout";
import { headers } from "next/headers";

const DashboardLayout = async ({
    children
}: {
    children: React.ReactNode
}) => {
    const session = await auth()
    const headersList = headers()

    
    const viewport = headersList.get('x-viewport')
    const device = headersList.get('x-device')
    console.log("viewport: ", viewport)
    console.log("device: ", device)

    return (
        <div className="layout layout--two-cols">
            <div className="layout_left">
                <Sidebar user={session?.user} device={viewport} />
            </div>
            <div className="layout_right">
                <Header user={session?.user} device={viewport} onLogout={logout} />
                {children}
            </div>
        </div>
    );
}

export default DashboardLayout;