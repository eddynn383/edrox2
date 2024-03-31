import { auth, signOut } from "@/auth"
import { Button } from "@/components";
import { Bone, SkeletonCard } from "@/components/Skeleton";
import sxm from "@/styles/module.module.scss"
import { headers } from "next/headers";


const Dashboard = async () => {

    const session = await auth()
    const headersList = headers()
    const viewport = headersList.get('x-viewport')

    console.log("X-Viewport", viewport)

    return ( 
        <div className={sxm["page-content"]}>
            <h1>Dashboard</h1>
            {JSON.stringify(session)}
            <form action={async () => {
                "use server"
                await signOut()
            }}>
                {/* <SkeletonCard />
                <Bone width="376px" height="210px" radius="8px" animationType="" animationDuration={300} /> */}
                <Button type="submit" variant="accent" status="fail">Sign Out</Button>
            </form>
        </div>
    );
}
 
export default Dashboard;