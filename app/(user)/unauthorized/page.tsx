import { Button } from "@/components";
import Link from "next/link";
import sxm from "@/styles/module.module.scss"
import sxc from "@/styles/component.module.scss"

const Page = async () => {

    return ( 
        <div className={sxm["page-content"]}>
            <h1>Access Denied</h1>
            <p>Sorry about that, but you don&apos;t have the permission to access this page</p>
            <Link className={sxc["button"]} data-mode="solid" data-variant="accent" data-status="default" data-size="M" data-content="text" href="/">Go back home</Link>
        </div>
    );
}
 
export default Page;