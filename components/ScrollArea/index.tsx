"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"
import sx from "@/styles/component.module.scss"
import { ScrollAreaProps, ScrollBarProps } from "./interface"


const ScrollArea = React.forwardRef<React.ElementRef<typeof ScrollAreaPrimitive.Root>, ScrollAreaProps>(({ className=sx["scroll-area"], children, ...props }, ref) => (
    <ScrollAreaPrimitive.Root
        ref={ref}
        className={className}
        {...props}
    >
        <ScrollAreaPrimitive.Viewport className={sx["scroll-area-viewport"]}>
            {children}
        </ScrollAreaPrimitive.Viewport>
        <ScrollBar />
        <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
))

ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

//"h-full w-full rounded-[inherit]"

const ScrollBar = React.forwardRef<React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>, ScrollBarProps>(({ className=sx["scroll-bar"], orientation = "vertical", ...props }, ref) => (
    <ScrollAreaPrimitive.ScrollAreaScrollbar ref={ref} orientation={orientation} className={className} {...props} >
        <ScrollAreaPrimitive.ScrollAreaThumb className={sx["scroll-bar-thumb"]} />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
))

ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }

//"relative flex-1 rounded-full bg-border"

// cn(
//     "flex touch-none select-none transition-colors",
//     orientation === "vertical" &&
//     "h-full w-2.5 border-l border-l-transparent p-[1px]",
//     orientation === "horizontal" &&
//     "h-2.5 flex-col border-t border-t-transparent p-[1px]",
//     className
// )