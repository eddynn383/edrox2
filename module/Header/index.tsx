"use client"

import { useContext } from "react"
import { Button, NavigationToggle, Logo, Profile, Search } from "@/components"
import { ToggleContext } from "@/context/toggleContext"
import useScreenSize from "@/hooks/useScreenSize"
import psx from "@/styles/page.module.scss"


const Header = ({ user, onLogout }: { user: any, onLogout?: () => void }) => {
    const { state, handleState } = useContext(ToggleContext)
    const screen = useScreenSize()
    const w = screen.width
    const mobile = w < 1025 ? true : false

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
                    <Logo src="/logo.svg" alt="logo" width={200} height={42} />
                }
            </div>
            <div className={psx["header-center"]}>
                {
                    mobile &&
                    <Logo src="/logo.svg" alt="logo" width={200} height={42} />
                }
                {/* {
                    !mobile &&
                    <Search placeholder="Search" />
                } */}
            </div>
            <div className={psx["header-right"]}>
                {/* <UserButton afterSignOutUrl="/" /> */}
                <Profile size="M" user={user} onLogout={onLogout} />
                {/* <Avatar src="https://images.pexels.com/photos/5611966/pexels-photo-5611966.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" size="M" type="circle" /> */}
            </div>
        </div>
    )
}

export default Header