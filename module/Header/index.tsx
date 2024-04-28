"use client"

import { useContext } from "react"
import { Button, NavigationToggle, Logo, Profile, Search } from "@/components"
import { ToggleContext } from "@/context/toggleContext"
import useScreenSize from "@/hooks/useScreenSize"
import psx from "@/styles/page.module.scss"
import { Bell, ShoppingCart } from "lucide-react"
import { useSearchParams } from "next/navigation"

interface HeaderProps { 
    user: any;
    device: string | null;
    onLogout?: () => void;
}


const Header = ({ user, device, onLogout }: HeaderProps) => {
    const { state, handleState } = useContext(ToggleContext)
    // const params = useSearchParams()

    const deviceScreen = useScreenSize()
    const deviceWidth = deviceScreen.width

    const mobile = deviceWidth === 0 && device === "mobile" ? true : deviceWidth > 0 && deviceWidth < 768 ? true : false
    const tablet = deviceWidth === 0 && device === "mobile" ? true : deviceWidth > 767 && deviceWidth < 1025 ? true : false

    return (
        <div className={psx["header"]}>
            <div className={psx["header-left"]}>
                {
                    mobile &&
                    <Button cn="toggle" type="button" size="M" content="icon" shade="100" name="Toggle Menu" title={state ? "Click to collapse" : "Click to expand"} onClick={handleState}>
                        <NavigationToggle state={state} />
                    </Button>
                }
                {
                    !mobile &&
                    <Logo src="/logo.svg" alt="Edrox Logo" width={200} height={42} />
                }
            </div>
            <div className={psx["header-center"]}>
                {
                    mobile &&
                    <Logo src="/logo.svg" alt="Edrox Logo" width={200} height={42} />
                }
            </div>
            <div className={psx["header-right"]}>
                {
                    !mobile && 
                    <>
                        <Button cn="toggle" type="button" size="M" content="icon" shade="100" aria-label="Shopping Cart">
                            <ShoppingCart />
                        </Button>
                        <Button cn="toggle" type="button" size="M" content="icon" shade="100" aria-label="Notifications">
                            <Bell />
                        </Button>
                    </>
                }
                <Profile size="M" user={user} onLogout={onLogout} />
            </div>
        </div>
    )
}

export default Header