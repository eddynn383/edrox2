"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import sx from "@/styles/component.module.scss"
import { CheckboxProps } from "./interface"

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(({ className=sx["checkbox"], mode = "solid", shade = "100", ...props }, ref) => (
    <CheckboxPrimitive.Root ref={ref} className={className} data-mode={mode} data-shade={shade} {...props} >
        <CheckboxPrimitive.Indicator className={sx["checkbox-indicator"]} />
    </CheckboxPrimitive.Root>
))

Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }