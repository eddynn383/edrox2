"use client"

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Icon } from "../Icon";
import { NavigationMenuItemProps } from "./interface";
import csx from "@/styles/component.module.scss"
import navigation from "@/components/NavigationMenu/navigation.module.css"
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
        <Link href={path} className={navigation.item} title={text} data-active={isActive} >
            <span className={navigation["item-icon"]}><Icon name={icon} /></span>
            {isCollapsed && <span className={navigation["item-text"]} data-visibility={iconsOnly ? "visible" : "hidden"}>{text}</span>}
        </Link>
    )
}
