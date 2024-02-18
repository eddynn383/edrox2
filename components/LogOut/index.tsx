// "use server"
import { logout } from "@/actions/logout";
import { Button } from "@/components";

const LogOut = ({ children }: { children: React.ReactNode }) => {
    const clickHandler = () => {
        logout();
    }

    return (
        <Button variant="link" type="button" onClick={clickHandler}>{children}</Button>
    );
}

export { LogOut };