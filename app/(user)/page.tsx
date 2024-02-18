import { auth, signOut } from "@/auth"
import { Button } from "@/components";

const Dashboard = async () => {

    const session = await auth()

    return ( 
        <div>
            <h1>Dashboard</h1>
            {JSON.stringify(session)}
            <form action={async () => {
                "use server"
                await signOut()
            }}>
                <Button type="submit" variant="accent" status="fail">Sign Out</Button>
            </form>
        </div>
    );
}
 
export default Dashboard;