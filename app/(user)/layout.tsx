import { Sidebar } from "@/layout/Sidebar";
import { LayoutHeader } from "@/layout/LayoutHeader";
import { auth } from "@/auth";
import { logout } from "@/actions/logout";
// import { headers } from "next/headers";
// import global from "@/styles/global.module.css"
import layout from "@/styles/layout.module.css"
import { FaS } from "react-icons/fa6";

const DashboardLayout = async ({
    children
}: {
    children: React.ReactNode
}) => {
    const session = await auth()
    // const session = {
    //     user: {
    //         id: 1,
    //         name: "John Doe",
    //         email: "john.doe@example.com",
    //         image: "/assets/images/profile-avatar.png",
    //         role: "ADMIN"
    //     }
    // }
    // const headersList = await headers()


    // const viewport = headersList.get('x-viewport')
    // const device = headersList.get('x-device')

    const viewport = null

    return (
        // <div className={global.layout}>
        //     <div className={global.left}>
        //         <Sidebar user={session?.user} device={viewport} />
        //     </div>
        //     <div className={global.right}>
        //         <LayoutHeader user={session?.user} device={viewport} onLogout={logout} />
        //         <PageBody>
        //             {children}
        //         </PageBody>
        //     </div>
        // </div>
        <main className={layout.main}>
            <div className={layout.header}>
                <LayoutHeader user={session?.user} device={viewport} onLogout={logout} />
            </div>
            <div className={layout.body}>
                <div className={layout.left}>
                    <Sidebar user={session?.user} device={viewport} />
                </div>
                <div className={layout.right}>
                    {children}
                </div>
            </div>
        </main>
    );
}

export default DashboardLayout;