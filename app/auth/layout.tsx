import { Logo } from "@/components";
import psx from "@/styles/page.module.scss"

const AuthLayout = ({children}: {children: React.ReactNode}) => {

    return ( 
        <div className={`${psx["layout"]} ${psx["layout--auth"]}`}>
            <div className={psx["layout-left"]}>
                <Logo src="/logo-white.svg" alt="logo" width={100} height={19} />
                <div className={psx["layout-auth-details"]}>
                    <h1 className={psx["layout-auth-title"]}>Continue your learning journey</h1>
                    <p className={psx["layout-auth-description"]}>Explore the benefits of our Learning Suite. <br />Continue to grow your skills</p>
                </div>
            </div>
            <div className={psx["layout-right"]}>
                {children}
            </div>
        </div>
    );
}
 
export default AuthLayout;