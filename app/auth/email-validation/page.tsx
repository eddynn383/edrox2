import { EmailValidationForm } from "@/module/EmailValidationForm";
import { Suspense } from "react";

const EmailValidation = () => {
    return ( 
        <Suspense>
            <EmailValidationForm />
        </Suspense>
    );
}
 
export default EmailValidation;