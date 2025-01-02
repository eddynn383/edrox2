"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import toggle from "./toggle.module.css"
import { ToggleProps } from "./interface"

const Toggle = React.forwardRef<
    React.ElementRef<typeof TogglePrimitive.Root>,
    ToggleProps
>(({ className = toggle.container, size = "M", mode = "solid", variant = "primary", status = "default", content = "text", ...props }, ref) => {
    const customAttrs = {
        "data-mode": mode,
        "data-variant": variant,
        "data-status": status,
        "data-size": size,
        "data-content": content,
    }
    return (
        <TogglePrimitive.Root
            ref={ref}
            className={className}
            {...customAttrs}
            {...props}
        />
    )
})

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle }
