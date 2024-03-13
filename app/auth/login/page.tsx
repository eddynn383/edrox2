import { LoginForm } from "@/module/LoginForm";
import { Suspense } from "react";

const LoginPage = () => {
    return (
        <Suspense>
            <LoginForm />
        </Suspense>
    );
}

export default LoginPage;