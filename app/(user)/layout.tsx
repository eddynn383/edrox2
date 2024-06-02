import { Sidebar } from "@/module/Sidebar";
import Header from "@/module/Header";
import { auth } from "@/auth";
import { logout } from "@/actions/logout";
import { headers } from "next/headers";
import global from "@/styles/global.module.css"

const DashboardLayout = async ({
    children
}: {
    children: React.ReactNode
}) => {
    const session = await auth()
    const headersList = headers()

    
    const viewport = headersList.get('x-viewport')
    const device = headersList.get('x-device')
    // console.log("viewport: ", viewport)
    // console.log("device: ", device)

    return (
        <div className={global.layout}>
            <div className={global.left}>
                <Sidebar user={session?.user} device={viewport} />
            </div>
            <div className={global.right}>
                <Header user={session?.user} device={viewport} onLogout={logout} />
                {children}
            </div>
        </div>
    );
}

export default DashboardLayout;