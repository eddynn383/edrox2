"use client"

import { useContext, useState } from "react"
import { Button } from "@/components/Button"
import { NavigationMenu } from "@/components/NavigationMenu"
import { NavigationToggle } from "@/components/NavigationToggle"
import sx from "@/styles/module.module.scss"

// replace this import with data from database
import { learnerMenu, adminMenu, userTools } from "@/lib/dummy-data"
import useScreenSize from "@/hooks/useScreenSize"
import { ToggleContext } from "@/context/toggleContext"

interface SidebarProps {
    user?: any
}

export const Sidebar = ({user}: SidebarProps) => {
    const {state, handleState} = useContext(ToggleContext)

    const screen = useScreenSize()
    const w = screen.width
    const mobile = w < 1025 ? true : false

    const customAttrs = {
        "data-state": state ? "expanded" : "collapsed",
    }
    
    return ( 
        <>        
            {
                !mobile &&
                <aside className={`${sx["sidebar"]}`} {...customAttrs}>
                    <div className={sx["sidebar_header"]}>
                        <Button cn="toggle" type="button" size="M" content="icon" shade="200" name="Toggle Menu" title={state ? "Click to collapse" : "Click to expand"} onClick={handleState} >
                            <NavigationToggle state={state} />
                        </Button>
                    </div>
                    <div className={sx["sidebar_body"]}>
                        <NavigationMenu data={learnerMenu} state={state} />
                        {user?.role === "ADMIN" && 
                            <>
                                <span className={sx["sidebar_separator"]}></span>
                                <NavigationMenu data={adminMenu} state={state} />
                            </>
                        }
                    </div>
                    <div className={sx["sidebar_footer"]}>
                        <NavigationMenu data={userTools} state={state} />
                    </div>
                </aside>
            }
            {
                mobile &&        
                    <aside className={`${sx["sidebar"]} ${sx["sidebar--mobile"]}`} {...customAttrs}>
                        <div className={sx["sidebar_header"]}>
                            <Button cn="toggle" type="button" size="M" content="icon" shade="200" name="Toggle Menu" title={state ? "Click to collapse" : "Click to expand"} onClick={handleState}>
                                <NavigationToggle state={state} />
                            </Button>
                        </div>
                        <div className={sx["sidebar_body"]}>
                            <NavigationMenu data={learnerMenu} state={state} />
                            <span className={sx["sidebar_separator"]}></span>
                            <NavigationMenu data={adminMenu} state={state} />
                        </div>
                        <div className={sx["sidebar_footer"]}>
                            <NavigationMenu data={userTools} state={state} />
                        </div>
                    </aside>
            }
        </>
    )
}