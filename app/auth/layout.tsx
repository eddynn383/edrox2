import sx from "@/styles/page.module.scss"

const AuthLayout = ({children}: {children: React.ReactNode}) => {

    return ( 
        <div className={`${sx["layout"]} ${sx["layout--auth"]}`}>
            {children}
        </div>
    );
}
 
export default AuthLayout;