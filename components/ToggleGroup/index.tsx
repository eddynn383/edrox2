"use client"

import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { ToggleGroupItemProps, ToggleGroupProps } from "./interface"
import toggleGroup from "./toggle.module.css"
import toggle from "@/components/Toggle/toggle.module.css"

// VariantProps<typeof toggleVariants>
const ToggleGroupContext = React.createContext({
    size: "M",
    mode: "solid",
    variant: "primary",
    status: "default",
    content: "text"
})

const ToggleGroup = React.forwardRef<
    React.ElementRef<typeof ToggleGroupPrimitive.Root>,
    ToggleGroupProps
>(({ className = toggleGroup.container, size = "M", mode = "solid", variant = "primary", status = "default", content = "text", children, ...props }, ref) => {

    const customAttrs = {
        "data-mode": mode,
        "data-variant": variant,
        "data-status": status,
        "data-size": size,
        "data-content": content,
    }

    return (
        <ToggleGroupPrimitive.Root
            ref={ref}
            className={className}
            {...customAttrs}
            {...props}
        >
            <ToggleGroupContext.Provider value={{ size, mode, variant, status, content }}>
                {children}
            </ToggleGroupContext.Provider>
        </ToggleGroupPrimitive.Root>
    )
})

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName


const ToggleGroupItem = React.forwardRef<
    React.ElementRef<typeof ToggleGroupPrimitive.Item>,
    ToggleGroupItemProps
>(({ className = toggle.container, children, size = "M", mode = "solid", variant = "primary", status = "default", content = "text", ...props }, ref) => {
    const context = React.useContext(ToggleGroupContext)

    // console.log("CONTEXT: ", context)

    const customAttrs = {
        "data-size": context.size || size,
        "data-mode": mode !== "solid" ? mode : context.mode || mode,
        "data-variant": context.variant || variant,
        "data-status": context.status || status,
        "data-content": context.content || content
    }

    return (
        <ToggleGroupPrimitive.Item
            ref={ref}
            className={className}
            {...customAttrs}
            {...props}
        >
            {children}
        </ToggleGroupPrimitive.Item>
    )
})

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem }
