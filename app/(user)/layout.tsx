import { Sidebar } from "@/module/Sidebar";
import { PageHeader } from "@/module/PageHeader";
import { auth } from "@/auth";
import { logout } from "@/actions/logout";
import { headers } from "next/headers";
import global from "@/styles/global.module.css"
import { PageBody } from "@/module/PageBody";

const DashboardLayout = async ({
    children
}: {
    children: React.ReactNode
}) => {
    const session = await auth()
    const headersList = headers()

    
    const viewport = headersList.get('x-viewport')
    const device = headersList.get('x-device')

    return (
        <div className={global.layout}>
            <div className={global.left}>
                <Sidebar user={session?.user} device={viewport} />
            </div>
            <div className={global.right}>
                <PageHeader user={session?.user} device={viewport} onLogout={logout} />
                <PageBody>
                    {children}
                </PageBody>
            </div>
        </div>
    );
}

export default DashboardLayout;