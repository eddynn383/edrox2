"use client"

import { useContext } from "react"
import { Button } from "../Button"
import { NavigationToggleProps } from "./interface"
import toggle from "./toggle.module.css"
import { ToggleContext } from "@/context/toggleContext"

export const NavigationToggle = ({ className = toggle.container }: NavigationToggleProps) => {
    const { state, handleState } = useContext(ToggleContext)

    return (
        <Button type="button" size="M" mode="text" content="icon" name="Toggle Menu" title={state ? "Click to collapse" : "Click to expand"} onClick={handleState}>
            <div className={className} data-state={state ? 'open' : "close"}>
                <span className={toggle.bar} data-position="top"></span>
                <span className={toggle.bar} data-position="middle"></span>
                <span className={toggle.bar} data-position="bottom"></span>
            </div>
        </Button>
    )
}
