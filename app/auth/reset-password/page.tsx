import { NewPasswordForm } from "@/module/NewPasswordForm";
import { Suspense } from "react";


const ResetPasswordPage = () => {
    return ( 
        <Suspense>
            <NewPasswordForm />
        </Suspense>
    );
}
 
export default ResetPasswordPage;