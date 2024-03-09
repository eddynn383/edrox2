"use client"

import { useContext } from "react"
import { Button, NavigationToggle, Logo, Profile, Search } from "@/components"
import { ToggleContext } from "@/context/toggleContext"
import useScreenSize from "@/hooks/useScreenSize"
import psx from "@/styles/page.module.scss"
import { Bell, ShoppingCart } from "lucide-react"


const Header = ({ user, onLogout }: { user: any, onLogout?: () => void }) => {
    const { state, handleState } = useContext(ToggleContext)
    const screen = useScreenSize()
    const w = screen.width
    const tablet = w < 1025 ? true : false
    const mobile = w < 769 ? true : false

    return (
        <div className={psx["header"]}>
            <div className={psx["header-left"]}>
                {
                    tablet &&
                    <Button cn="toggle" type="button" size="M" content="icon" shade="100" name="Toggle Menu" title={state ? "Click to collapse" : "Click to expand"} onClick={handleState}>
                        <NavigationToggle state={state} />
                    </Button>
                }
                {
                    !tablet &&
                    <Logo src="/logo.svg" alt="logo" width={200} height={42} />
                }
            </div>
            <div className={psx["header-center"]}>
                {
                    tablet &&
                    <Logo src="/logo.svg" alt="logo" width={200} height={42} />
                }
            </div>
            <div className={psx["header-right"]}>
                {
                    !mobile && 
                    <>
                        <Button cn="toggle" type="button" size="M" content="icon" shade="100">
                            <ShoppingCart />
                        </Button>
                        <Button cn="toggle" type="button" size="M" content="icon" shade="100">
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