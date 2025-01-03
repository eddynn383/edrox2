import { Anchor, Card, CardContent, CardHeader, CardTitle } from "@/components";
import module from "@/styles/module.module.css"


const AuthErrorPage = () => {

    return (
        <div className={module.auth}>

            <div className={module.inner}>
                <Card mode="solid" variant="ghost" padding="0" radius="0" gap="600">
                    <CardHeader style={{ "display": "flex", "flexDirection": "column", "gap": "8px" }}>
                        <CardTitle rank={2}>Something went wrong!</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Anchor url="/auth/login" mode="solid" variant="accent" content="text">Back to login</Anchor>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default AuthErrorPage;