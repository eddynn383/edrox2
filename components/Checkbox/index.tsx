"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckboxProps } from "./interface"
import checkbox from "./checkbox.module.css"

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(({ className=checkbox.container, mode = "solid", shade = "100", ...props }, ref) => (
    <CheckboxPrimitive.Root ref={ref} className={className} data-mode={mode} data-shade={shade} {...props} >
        <CheckboxPrimitive.Indicator className={checkbox.indicator} />
    </CheckboxPrimitive.Root>
))

Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }