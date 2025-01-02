"use client"

import { useContext } from "react"
import { Button, NavigationToggle, Logo, Profile, Search } from "@/components"
import { ToggleContext } from "@/context/toggleContext"
import { Bell, ShoppingCart } from "lucide-react"
import useScreenSize from "@/hooks/useScreenSize"
import header from "./layout-header.module.css"
import { CreateManyModal } from "@/module/CreateManyModal"

interface LayoutHeaderProps {
    user: any;
    device: string | null;
    onLogout?: () => void;
}


export const LayoutHeader = ({ user, device, onLogout }: LayoutHeaderProps) => {
    // const params = useSearchParams()

    // console.log(user)

    const deviceScreen = useScreenSize()
    const deviceWidth = deviceScreen.width

    const mobile = deviceWidth === 0 && device === "mobile" ? true : deviceWidth > 0 && deviceWidth < 768 ? true : false
    const tablet = deviceWidth === 0 && device === "mobile" ? true : deviceWidth > 767 && deviceWidth < 1025 ? true : false

    return (
        <div className={header.container}>
            <div className={header.left}>
                <NavigationToggle />
            </div>
            <div className={header.center}>
                <Logo src="/logo.svg" alt="Edrox Logo" width={200} height={42} />
            </div>
            <div className={header.right}>
                <CreateManyModal />
                <Button type="button" mode="text" size="M" content="icon" aria-label="Shopping Cart">
                    <ShoppingCart />
                </Button>
                <Button type="button" mode="text" size="M" content="icon" aria-label="Notifications">
                    <Bell />
                </Button>
                <Profile size="M" user={user} onLogout={onLogout} />
            </div>
        </div>
    )
}