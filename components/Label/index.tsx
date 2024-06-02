"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import label from "./label.module.css"
import { LabelProps } from "./interface"

const Label = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, LabelProps>(({ className=label.container, ...props }, ref) => (
    <LabelPrimitive.Root ref={ref} className={className} {...props} />
))

Label.displayName = LabelPrimitive.Root.displayName

export { Label }
