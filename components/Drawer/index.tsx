"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"
import { DrawerContentProps, DrawerDescriptionProps, DrawerFooterProps, DrawerHeaderProps, DrawerOverlayProps, DrawerProps, DrawerTitleProps } from "./interface"
import sx from "@/styles/component.module.scss"

const Drawer = ({ shouldScaleBackground = true, ...props }: DrawerProps) => (
    <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />
)

Drawer.displayName = "Drawer"



const DrawerTrigger = DrawerPrimitive.Trigger

const DrawerPortal = DrawerPrimitive.Portal

const DrawerClose = DrawerPrimitive.Close

const DrawerOverlay = React.forwardRef<React.ElementRef<typeof DrawerPrimitive.Overlay>, DrawerOverlayProps>(({ className=sx["drawer-overlay"], ...props }, ref) => (
    <DrawerPrimitive.Overlay ref={ref} className={className} {...props} />
))

// className={cn("fixed inset-0 z-50 bg-black/80", className)}

DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName



const DrawerContent = React.forwardRef<React.ElementRef<typeof DrawerPrimitive.Content>, DrawerContentProps>(({ className=sx["drawer-content"], children, ...props }, ref) => (
    <DrawerPortal>
        <DrawerOverlay />
        <DrawerPrimitive.Content ref={ref} className={className} {...props} >
            <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
            {children}
        </DrawerPrimitive.Content>
    </DrawerPortal>
))

// className={cn(
//     "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
//     className
// )}

DrawerContent.displayName = "DrawerContent"



const DrawerHeader = ({ className=sx["drawer-header"], ...props }: DrawerHeaderProps ) => (
    <div className={className}
        {...props}
    />
)

//cn("grid gap-1.5 p-4 text-center sm:text-left", className)

DrawerHeader.displayName = "DrawerHeader"



const DrawerFooter = ({ className=sx["drawer-footer"], ...props }: DrawerFooterProps ) => (
    <div className={className} {...props} />
)

//cn("mt-auto flex flex-col gap-2 p-4", className)

DrawerFooter.displayName = "DrawerFooter"



const DrawerTitle = React.forwardRef<React.ElementRef<typeof DrawerPrimitive.Title>, DrawerTitleProps >(({ className=sx["drawer-title"], ...props }, ref) => (
    <DrawerPrimitive.Title ref={ref} className={className} {...props} />
))

// cn("text-lg font-semibold leading-none tracking-tight",className)

DrawerTitle.displayName = DrawerPrimitive.Title.displayName



const DrawerDescription = React.forwardRef<React.ElementRef<typeof DrawerPrimitive.Description>, DrawerDescriptionProps>(({ className=sx["drawer-description"], ...props }, ref) => (
    <DrawerPrimitive.Description ref={ref} className={className} {...props}
    />
))

// cn("text-sm text-muted-foreground", className)

DrawerDescription.displayName = DrawerPrimitive.Description.displayName



export {
    Drawer,
    DrawerPortal,
    DrawerOverlay,
    DrawerTrigger,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerFooter,
    DrawerTitle,
    DrawerDescription,
}
