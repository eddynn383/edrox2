"use client"

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Icon } from "../Icon";
import { NavigationMenuItemProps } from "./interface";
import sx from "@/styles/component.module.scss"

export const NavigationMenuItem = ({ icon, text, path, iconsOnly = false }: NavigationMenuItemProps) => {
    const pathname = usePathname();
    const router = useRouter()
    const [isCollapsed, setIsCollapsed] = useState<Boolean>(false)

    const isActive =
        (pathname === "/" && path === "/") ||
        pathname === path ||
        pathname?.startsWith(`${path}/`)

    useEffect(() => {
        if (iconsOnly === false) {            
            const timeoutId = setTimeout(() => {
                setIsCollapsed(iconsOnly)
            }, 250); // Adjust the delay time as needed
    
            return () => clearTimeout(timeoutId);
        } else {
            setIsCollapsed(iconsOnly)
        }
    }, [iconsOnly]);

    const clickHanlder = () => {
        router.push(path);
    }

    return (
        <button className={`${sx["menu_item"]} ${isActive ? sx["menu_item--active"] : ""}`} onClick={clickHanlder}>
            <span className={sx["menu_icon"]}><Icon name={icon} /></span>
            {isCollapsed && <span className={sx["menu_text"]} data-visibility={iconsOnly ? "visible" : "hidden"}>{text}</span>}
        </button>
    )
}
