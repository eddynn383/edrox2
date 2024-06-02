"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"
import { ScrollAreaProps, ScrollBarProps } from "./interface"
import scroll from "./scroll.module.css"


const ScrollArea = React.forwardRef<React.ElementRef<typeof ScrollAreaPrimitive.Root>, ScrollAreaProps>(({ className=scroll.area, children, ...props }, ref) => (
    <ScrollAreaPrimitive.Root
        ref={ref}
        className={className}
        {...props}
    >
        <ScrollAreaPrimitive.Viewport className={scroll.viewport}>
            {children}
        </ScrollAreaPrimitive.Viewport>
        <ScrollBar />
        <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
))

ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName



const ScrollBar = React.forwardRef<React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>, ScrollBarProps>(({ className=scroll.bar, orientation = "vertical", ...props }, ref) => (
    <ScrollAreaPrimitive.ScrollAreaScrollbar ref={ref} orientation={orientation} className={className} {...props} >
        <ScrollAreaPrimitive.ScrollAreaThumb className={scroll.thumb} />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
))

ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }