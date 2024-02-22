// "use server"
import { logout } from "@/actions/logout";
import { Button } from "@/components";

const LogOut = ({ children }: { children: React.ReactNode }) => {
    const clickHandler = () => {
        logout();
    }

    return (
        <Button type="button" mode="text" variant="accent" status="fail" onClick={clickHandler}>{children}</Button>
    );
}

export { LogOut };