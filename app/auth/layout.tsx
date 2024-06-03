import { Logo } from "@/components";
import auth from "@/styles/auth.module.css"

const AuthLayout = ({children}: {children: React.ReactNode}) => {

    return ( 
        <div className={auth.layout}>
            <div className={auth.left}>
                <Logo src="/logo-white.svg" alt="Edrox Logo" width={100} height={19} />
                <div className={auth.details}>
                    <h1 className={auth.title}>Continue your learning journey</h1>
                    <p className={auth.description}>Explore the benefits of our Learning Suite. <br />Continue to grow your skills</p>
                </div>
            </div>
            <div className={auth.right}>
                {children}
            </div>
        </div>
    );
}
 
export default AuthLayout;