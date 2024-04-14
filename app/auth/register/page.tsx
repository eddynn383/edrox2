import { RegisterForm } from "@/module/RegisterForm";
import { Suspense } from "react";

const RegisterPage = () => {
    return (
        <Suspense fallback="loading register form...">
            <RegisterForm />
        </Suspense>
    );
}

export default RegisterPage;