"use client"

import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"
import { AlertDialogActionProps, AlertDialogCancelProps, AlertDialogContentProps, AlertDialogDescriptionProps, AlertDialogFooterProps, AlertDialogHeaderProps, AlertDialogOverlayProps, AlertDialogProps, AlertDialogTitleProps } from "./interface"
import sx from "@/styles/component.module.scss"

const AlertDialog = AlertDialogPrimitive.Root

const AlertDialogTrigger = AlertDialogPrimitive.Trigger


const AlertDialogPortal = ({ className=sx["alert-dialog"], ...props}: AlertDialogProps) => (
    <AlertDialogPrimitive.Portal {...props} />
)

AlertDialogPortal.displayName = AlertDialogPrimitive.Portal.displayName



const AlertDialogOverlay = React.forwardRef<React.ElementRef<typeof AlertDialogPrimitive.Overlay>, AlertDialogOverlayProps>(({ className=sx["alert-dialog-overlay"], children, ...props }, ref) => (
    <AlertDialogPrimitive.Overlay className={className} {...props} ref={ref} />
))

// cn(
//     "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
//     className
// )

AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName



const AlertDialogContent = React.forwardRef<React.ElementRef<typeof AlertDialogPrimitive.Content>, AlertDialogContentProps>(({ className=sx["alert-dialog-content"], ...props }, ref) => (
    <AlertDialogPortal>
        <AlertDialogOverlay />
        <AlertDialogPrimitive.Content
            ref={ref}
            className={className}
            {...props}
        />
    </AlertDialogPortal>
))

// cn(
//     "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full",
//     className
// )

AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName



const AlertDialogHeader = ({ className=sx["alert-dialog-header"], ...props }: AlertDialogHeaderProps) => (
    <div className={className} {...props} />
)

// cn(
//     "flex flex-col space-y-2 text-center sm:text-left",
//     className
// )

AlertDialogHeader.displayName = "AlertDialogHeader"



const AlertDialogFooter = ({ className=sx["alert-dialog-footer"], ...props }: AlertDialogFooterProps) => (
    <div className={className} {...props} />
)

AlertDialogFooter.displayName = "AlertDialogFooter"



const AlertDialogTitle = React.forwardRef<React.ElementRef<typeof AlertDialogPrimitive.Title>, AlertDialogTitleProps>(({ className=sx["alert-dialog-title"], ...props }, ref) => (
    <AlertDialogPrimitive.Title ref={ref} className={className} {...props} />
))

AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName



const AlertDialogDescription = React.forwardRef<React.ElementRef<typeof AlertDialogPrimitive.Description>, AlertDialogDescriptionProps>(({ className=sx["alert-dialog-description"], ...props }, ref) => (
    <AlertDialogPrimitive.Description ref={ref} className={className} {...props} />
))

AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName



const AlertDialogAction = React.forwardRef<React.ElementRef<typeof AlertDialogPrimitive.Action>, AlertDialogActionProps>(({ className=sx["alert-dialog-action"], ...props }, ref) => (
    <AlertDialogPrimitive.Action ref={ref} className={className} {...props} />
))

AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName



const AlertDialogCancel = React.forwardRef<React.ElementRef<typeof AlertDialogPrimitive.Cancel>, AlertDialogCancelProps>(({ className=sx["alert-dialog-cancel"], ...props }, ref) => (
    <AlertDialogPrimitive.Cancel ref={ref} className={className} {...props} />
))

AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

export {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogAction,
    AlertDialogCancel,
}
