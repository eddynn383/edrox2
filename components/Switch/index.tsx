"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import sx from "@/styles/component.module.scss"
import { SwitchProps } from "./interface"


const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitives.Root>, SwitchProps>(({ className, ...props }, ref) => (
    <SwitchPrimitives.Root className={sx["switch"]} {...props} ref={ref} >
        <SwitchPrimitives.Thumb className={sx["switch-thumb"]} />
    </SwitchPrimitives.Root>
))

Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }