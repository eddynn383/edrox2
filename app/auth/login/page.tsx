import { LoginForm } from "@/module/LoginForm";
import { Suspense } from "react";

const LoginPage = () => {
    return (
        <Suspense fallback="loading login form...">
            <LoginForm />
        </Suspense>
    );
}

export default LoginPage;