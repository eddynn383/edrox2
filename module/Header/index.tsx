"use client"

import { useContext } from "react"
import { Logo } from "@/components/Logo"
import { Search } from "@/components/Search"
import { Button } from "@/components/Button"
import { NavigationToggle } from "@/components/NavigationToggle"
import { ToggleContext } from "@/context/toggleContext"
import useScreenSize from "@/hooks/useScreenSize"
import sx from "@/styles/module.module.scss"
import { Avatar } from "@/components/Avatar"


const Header = () => {
    const {state, handleState} = useContext(ToggleContext)
    const screen = useScreenSize()
    const w = screen.width
    const mobile = w < 1025 ? true : false

    return (
        <div className={sx["header"]}>
            <div className={sx["header_left"]}>
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
            <div className={sx["header_center"]}>
                {
                    mobile &&
                    <Logo src="/logo.svg" alt="logo" width={200} height={42} />
                }
                {
                    !mobile &&
                    <Search placeholder="Search" />
                }
            </div>
            <div className={sx["header_right"]}>
                {/* <UserButton afterSignOutUrl="/" /> */}
                <Avatar src="https://images.pexels.com/photos/5611966/pexels-photo-5611966.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" size="M" type="circle" />
            </div>
        </div>
    )
}

export default Header