"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import popover from "./popover.module.css"
import button from "@/components/Button/button.module.css"
import { X } from "lucide-react"
import { Button } from "../Button"


const Popover = PopoverPrimitive.Root

// const PopoverTrigger = PopoverPrimitive.Trigger

// const PopoverContent = <PopoverPrimitive.Content />

// const PopoverClose = PopoverPrimitive.Close

// const PopoverPortal = PopoverPrimitive.Portal

// const PopoverClose = React.forwardRef<
//     React.ElementRef<typeof PopoverPrimitive.Close>,
//     React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Close>
// >(({ className, ...props }, ref) => (
//     <PopoverPrimitive.Close ref={ref} className={className} aria-label="Close" {...props}>
//         <X />
//     </PopoverPrimitive.Close>
// ))

const PopoverTrigger = React.forwardRef<
    React.ElementRef<typeof PopoverPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>
>(({ className = button.container, ...props }, ref) => (
    <PopoverPrimitive.Trigger ref={ref} className={className} {...props} />
))

interface PopoverContentProps extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
    close?: boolean;
}

const PopoverContent = React.forwardRef<
    React.ElementRef<typeof PopoverPrimitive.Content>,
    PopoverContentProps
>(({ className = popover.content, align = "center", sideOffset = 4, close = false, children, ...props }, ref) => (
    <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
            ref={ref}
            align={align}
            sideOffset={sideOffset}
            className={className}
            {...props}
        >
            {children}
            {close && <PopoverPrimitive.Close className={popover.close}><X /></PopoverPrimitive.Close>}
        </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
))

Popover.displayName = PopoverPrimitive.Root.displayName
PopoverContent.displayName = PopoverPrimitive.Content.displayName
PopoverTrigger.displayName = PopoverPrimitive.Trigger.displayName

// PopoverClose.displayName = PopoverPrimitive.Close.displayName



export { Popover, PopoverTrigger, PopoverContent }
