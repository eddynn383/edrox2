"use client"

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Icon } from "../Icon";
import { NavigationMenuItemProps } from "./interface";
import csx from "@/styles/component.module.scss"
import Link from "next/link";

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

    return (
        <Link href={path} className={csx["menu-item"]} title={text} data-active={isActive} >
            <span className={csx["menu-item-icon"]}><Icon name={icon} /></span>
            {isCollapsed && <span className={csx["menu-item-text"]} data-visibility={iconsOnly ? "visible" : "hidden"}>{text}</span>}
        </Link>
    )
}
