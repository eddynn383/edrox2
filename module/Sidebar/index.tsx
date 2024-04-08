"use client"

import { useContext, useState } from "react"
import { Button } from "@/components/Button"
import { NavigationMenu } from "@/components/NavigationMenu"
import { NavigationToggle } from "@/components/NavigationToggle"
import msx from "@/styles/module.module.scss"

// replace this import with data from database
import { learnerMenu, adminMenu, userTools } from "@/lib/dummy-data"
import useScreenSize from "@/hooks/useScreenSize"
import { ToggleContext } from "@/context/toggleContext"

interface SidebarProps {
    user?: any;
    device: string | null;
}

export const Sidebar = ({user, device}: SidebarProps) => {
    const {state, handleState} = useContext(ToggleContext)

    const deviceScreen = useScreenSize()
    const deviceWidth = deviceScreen.width

    const mobile = deviceWidth === 0 && device === "mobile" ? true : deviceWidth > 0 && deviceWidth < 768 ? true : false
    const tablet = deviceWidth === 0 && device === "mobile" ? true : deviceWidth > 767 && deviceWidth < 1025 ? true : false

    const customAttrs = {
        "data-state": state ? "expanded" : "collapsed",
    }
    
    return ( 
        <>        
            {
                !mobile && 
                <aside className={msx["sidebar"]} data-device="web" {...customAttrs}>
                    <div className={msx["sidebar-content"]}>
                        <div className={msx["sidebar-header"]}>
                            <Button cn="toggle" type="button" size="M" content="icon" shade="200" name="Toggle Menu" title={state ? "Click to collapse" : "Click to expand"} onClick={handleState} >
                                <NavigationToggle state={state} />
                            </Button>
                        </div>
                        <div className={msx["sidebar-body"]}>
                            <NavigationMenu data={learnerMenu} state={state} />
                            {user?.role === "ADMIN" && 
                                <>
                                    <span className={msx["sidebar-separator"]}></span>
                                    <NavigationMenu data={adminMenu} state={state} />
                                </>
                            }
                        </div>
                        <div className={msx["sidebar-footer"]}>
                            <NavigationMenu data={userTools} state={state} />
                        </div>
                    </div>
                </aside>
            }
            {
                mobile &&    
                    <>
                        <aside className={msx["sidebar"]} data-device="mobile" {...customAttrs}>
                            <div className={msx["sidebar-overlay"]} onClick={handleState}/>
                            <div className={msx["sidebar-content"]}>
                                <div className={msx["sidebar-header"]}>
                                    <Button cn="toggle" type="button" size="M" content="icon" shade="200" name="Toggle Menu" title={state ? "Click to collapse" : "Click to expand"} onClick={handleState}>
                                        <NavigationToggle state={state} />
                                    </Button>
                                </div>
                                <div className={msx["sidebar-body"]}>
                                    <NavigationMenu data={learnerMenu} state={state} />
                                    <span className={msx["sidebar-separator"]}></span>
                                    <NavigationMenu data={adminMenu} state={state} />
                                </div>
                                <div className={msx["sidebar-footer"]}>
                                    <NavigationMenu data={userTools} state={state} />
                                </div>
                            </div>
                        </aside>
                    </>    
            }
        </>
    )
}