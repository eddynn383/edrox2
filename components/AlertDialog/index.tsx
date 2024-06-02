"use client"

import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"
import { AlertDialogActionProps, AlertDialogCancelProps, AlertDialogContentProps, AlertDialogDescriptionProps, AlertDialogFooterProps, AlertDialogHeaderProps, AlertDialogOverlayProps, AlertDialogProps, AlertDialogTitleProps } from "./interface"
import alertdialog from "./alertdialog.module.css"

const AlertDialog = AlertDialogPrimitive.Root

const AlertDialogTrigger = AlertDialogPrimitive.Trigger


const AlertDialogPortal = ({ ...props}: AlertDialogProps) => (
    <AlertDialogPrimitive.Portal {...props} />
)

AlertDialogPortal.displayName = AlertDialogPrimitive.Portal.displayName



const AlertDialogOverlay = React.forwardRef<React.ElementRef<typeof AlertDialogPrimitive.Overlay>, AlertDialogOverlayProps>(({ className=alertdialog.overlay, children, ...props }, ref) => (
    <AlertDialogPrimitive.Overlay className={className} {...props} ref={ref} />
))

AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName



const AlertDialogContent = React.forwardRef<React.ElementRef<typeof AlertDialogPrimitive.Content>, AlertDialogContentProps>(({ className=alertdialog.content, ...props }, ref) => (
    <AlertDialogPortal>
        <AlertDialogOverlay />
        <AlertDialogPrimitive.Content
            ref={ref}
            className={className}
            {...props}
        />
    </AlertDialogPortal>
))



AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName



const AlertDialogHeader = ({ className=alertdialog.header, ...props }: AlertDialogHeaderProps) => (
    <div className={className} {...props} />
)

AlertDialogHeader.displayName = "AlertDialogHeader"



const AlertDialogFooter = ({ className=alertdialog.footer, ...props }: AlertDialogFooterProps) => (
    <div className={className} {...props} />
)

AlertDialogFooter.displayName = "AlertDialogFooter"



const AlertDialogTitle = React.forwardRef<React.ElementRef<typeof AlertDialogPrimitive.Title>, AlertDialogTitleProps>(({ className=alertdialog.title, ...props }, ref) => (
    <AlertDialogPrimitive.Title ref={ref} className={className} {...props} />
))

AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName



const AlertDialogDescription = React.forwardRef<React.ElementRef<typeof AlertDialogPrimitive.Description>, AlertDialogDescriptionProps>(({ className=alertdialog.description, ...props }, ref) => (
    <AlertDialogPrimitive.Description ref={ref} className={className} {...props} />
))

AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName



const AlertDialogAction = React.forwardRef<React.ElementRef<typeof AlertDialogPrimitive.Action>, AlertDialogActionProps>(({ className=alertdialog.action, ...props }, ref) => (
    <AlertDialogPrimitive.Action ref={ref} className={className} {...props} />
))

AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName



const AlertDialogCancel = React.forwardRef<React.ElementRef<typeof AlertDialogPrimitive.Cancel>, AlertDialogCancelProps>(({ className=alertdialog.cancel, ...props }, ref) => (
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
