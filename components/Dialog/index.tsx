"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { DialogContentProps, DialogDescriptionProps, DialogFooterProps, DialogHeaderProps, DialogBodyProps, DialogOverlayProps, DialogTitleProps } from "./interface"
import dialog from "./dialog.module.css"


const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Overlay>, DialogOverlayProps>(({ className=dialog.overlay, ...props }, ref) => (
    <DialogPrimitive.Overlay className={className} ref={ref} {...props} />
))
        
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName



const DialogContent = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Content>, DialogContentProps>(({ className=dialog.content, children, ...props }, ref) => (
    <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content ref={ref} className={className} {...props} >
            {children}
            <DialogPrimitive.Close className={dialog.close}>
                <X />
                <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
        </DialogPrimitive.Content>
    </DialogPortal>
))

DialogContent.displayName = DialogPrimitive.Content.displayName



const DialogHeader = ({ className=dialog.header, ...props }: DialogHeaderProps) => (
    <div className={className} {...props} />
)
    
DialogHeader.displayName = "DialogHeader"



const DialogBody = ({ className=dialog.body, ...props }: DialogBodyProps) => (
    <div className={className} {...props} />
)
    
DialogBody.displayName = "DialogBody"



const DialogFooter = ({ className=dialog.footer, ...props }: DialogFooterProps) => (
    <div className={className} {...props} />
)

DialogFooter.displayName = "DialogFooter"



const DialogTitle = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Title>, DialogTitleProps>(({ className=dialog.title, ...props }, ref) => (
    <DialogPrimitive.Title ref={ref} className={className} {...props} />
))

DialogTitle.displayName = DialogPrimitive.Title.displayName



const DialogDescription = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Description>, DialogDescriptionProps>(({ className=dialog.description, ...props }, ref) => (
    <DialogPrimitive.Description ref={ref} className={className} {...props} />
))

DialogDescription.displayName = DialogPrimitive.Description.displayName



export {
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogClose,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogBody,
    DialogFooter,
    DialogTitle,
    DialogDescription,
}
