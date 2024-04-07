import Link from "next/link";
import msx from "@/styles/module.module.scss"
import csx from "@/styles/component.module.scss"
import { Card, CardContent, CardHeader, CardTitle } from "@/components";


const AuthErrorPage = () => {
    
    return ( 
        <div className={msx["auth"]}>
            <div className={msx["auth-inner"]}>
                <Card variant="ghost" padding="0" radius="0" gap="600">
                    <CardHeader style={{"display": "flex", "flexDirection": "column", "gap": "8px"}}>                        
                        <CardTitle rank={2}>Something went wrong!</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Link className={csx["button"]} data-mode="solid" data-variant="accent" data-status="default" data-size="M" data-content="text" href="/auth/login">Back to login</Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
 
export default AuthErrorPage;