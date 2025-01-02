"use client"

import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { ToastActionsProps, ToastCloseProps, ToastContainerProps, ToastDescriptionProps, ToastTitleProps, ToastViewportProps } from "./interface"
import { X } from "lucide-react"
import toast from "./toast.module.css"
import { Button } from "../Button"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
    React.ElementRef<typeof ToastPrimitives.Viewport>,
    ToastViewportProps
>(({ className = toast.viewport, ...props }, ref) => (
    <ToastPrimitives.Viewport
        ref={ref}
        className={className}
        {...props}
    />
))

ToastViewport.displayName = ToastPrimitives.Viewport.displayName


const Toast = React.forwardRef<React.ElementRef<typeof ToastPrimitives.Root>, ToastContainerProps>(({ className = toast.container, mode = "solid", status = "default", ...props }, ref) => {
    return (
        <ToastPrimitives.Root
            ref={ref}
            className={className}
            data-mode={mode}
            data-status={status}
            {...props}
        />
    )
})

Toast.displayName = ToastPrimitives.Root.displayName


const ToastAction = React.forwardRef<React.ElementRef<typeof ToastPrimitives.Action>, ToastActionsProps>(({ className = toast.actions, mode = "outline", variant = "accent", size = "S", status = "default", children, ...props }, ref) => (
    <ToastPrimitives.Action
        ref={ref}
        {...props}
        asChild
    >
        <div className={className}>
            <Button mode={mode} variant={variant} status={status} size={size} content="text">
                {children}
            </Button>
        </div>
    </ToastPrimitives.Action>
))

ToastAction.displayName = ToastPrimitives.Action.displayName


const ToastClose = React.forwardRef<React.ElementRef<typeof ToastPrimitives.Close>, ToastCloseProps>(({ className = toast.close, variant, status, ...props }, ref) => (
    <ToastPrimitives.Close
        ref={ref}
        className={className}
        toast-close=""
        {...props}
        asChild
    >
        <div className={className}>
            <Button size="S" mode="text" variant="accent" status={status} content="icon">
                <X />
            </Button>
        </div>
    </ToastPrimitives.Close>
))

ToastClose.displayName = ToastPrimitives.Close.displayName


const ToastTitle = React.forwardRef<
    React.ElementRef<typeof ToastPrimitives.Title>,
    ToastTitleProps
>(({ className = toast.title, ...props }, ref) => (
    <ToastPrimitives.Title
        ref={ref}
        className={className}
        {...props}
    />
))

ToastTitle.displayName = ToastPrimitives.Title.displayName


const ToastDescription = React.forwardRef<
    React.ElementRef<typeof ToastPrimitives.Description>,
    ToastDescriptionProps
>(({ className = toast.description, ...props }, ref) => (
    <ToastPrimitives.Description
        ref={ref}
        className={className}
        {...props}
    />
))

ToastDescription.displayName = ToastPrimitives.Description.displayName


type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
    type ToastProps,
    type ToastActionElement,
    ToastProvider,
    ToastViewport,
    Toast,
    ToastTitle,
    ToastDescription,
    ToastClose,
    ToastAction,
}
