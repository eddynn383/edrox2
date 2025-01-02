"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { SwitchProps } from "./interface"
import switchSX from "./switch.module.css"


const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitives.Root>, SwitchProps>(({ className = switchSX.container, ...props }, ref) => (
    <SwitchPrimitives.Root className={className} {...props} ref={ref} >
        <SwitchPrimitives.Thumb className={switchSX.thumb} />
    </SwitchPrimitives.Root>
))

Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }