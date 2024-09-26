"use client"

import { useContext } from "react"
import { Button, NavigationToggle, Logo, Profile, Search } from "@/components"
import { ToggleContext } from "@/context/toggleContext"
import { Bell, ShoppingCart } from "lucide-react"
import useScreenSize from "@/hooks/useScreenSize"
import header from "./page-header.module.css"

interface HeaderProps { 
    user: any;
    device: string | null;
    onLogout?: () => void;
}


export const PageHeader = ({ user, device, onLogout }: HeaderProps) => {
    const { state, handleState } = useContext(ToggleContext)
    // const params = useSearchParams()

    const deviceScreen = useScreenSize()
    const deviceWidth = deviceScreen.width

    const mobile = deviceWidth === 0 && device === "mobile" ? true : deviceWidth > 0 && deviceWidth < 768 ? true : false
    const tablet = deviceWidth === 0 && device === "mobile" ? true : deviceWidth > 767 && deviceWidth < 1025 ? true : false

    return (
        <div className={header.container}>
            <div className={header.left}>
                {
                    mobile &&
                    <Button type="button" size="M" content="icon" shade="100" name="Toggle Menu" title={state ? "Click to collapse" : "Click to expand"} onClick={handleState}>
                        <NavigationToggle state={state} />
                    </Button>
                }
                {
                    !mobile &&
                    <Logo src="/logo.svg" alt="Edrox Logo" width={200} height={42} />
                }
            </div>
            <div className={header.center}>
                {
                    mobile &&
                    <Logo src="/logo.svg" alt="Edrox Logo" width={200} height={42} />
                }
            </div>
            <div className={header.right}>
                {
                    !mobile && 
                    <>
                        <Button type="button" size="M" content="icon" shade="100" aria-label="Shopping Cart">
                            <ShoppingCart />
                        </Button>
                        <Button type="button" size="M" content="icon" shade="100" aria-label="Notifications">
                            <Bell />
                        </Button>
                    </>
                }
                <Profile size="M" user={user} onLogout={onLogout} />
            </div>
        </div>
    )
}