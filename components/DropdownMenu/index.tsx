"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"
import sx from "@/styles/component.module.scss"
import { DropdownMenuCheckboxItemProps, DropdownMenuContentProps, DropdownMenuItemProps, DropdownMenuLabelProps, DropdownMenuRadioItemProps, DropdownMenuSeparatorProps, DropdownMenuSubContentProps, DropdownMenuSubTriggerProps } from "./interface"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
    DropdownMenuSubTriggerProps
>(({ className = `${sx["dropdown-submenu-trigger"]}`, inset, children, ...props }, ref) => (
    <DropdownMenuPrimitive.SubTrigger ref={ref} className={className} {...props} >
        {children}
        <ChevronRight />
    </DropdownMenuPrimitive.SubTrigger>
))

DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName


const DropdownMenuSubContent = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
    DropdownMenuSubContentProps
>(({ className = `${sx["dropdown-submenu-content"]}`, ...props }, ref) => (
    <DropdownMenuPrimitive.SubContent ref={ref} className={className} {...props} />
))

DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName


const DropdownMenuContent = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Content>,
    DropdownMenuContentProps
>(({ className = `${sx["dropdown-menu-content"]}`, sideOffset = 4, shade = "100", ...props }, ref) => (
    <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content ref={ref} data-shade={shade} sideOffset={sideOffset} className={className} {...props} />
    </DropdownMenuPrimitive.Portal>
))

DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName


const DropdownMenuItem = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Item>,
    DropdownMenuItemProps
>(({ className = `${sx["dropdown-menu-item"]}`, inset, ...props }, ref) => (
    <DropdownMenuPrimitive.Item ref={ref} className={className} {...props} />
))

DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName


const DropdownMenuCheckboxItem = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
    DropdownMenuCheckboxItemProps
>(({ className = `${sx["dropdown-menu-checkbox-item"]}`, children, checked, ...props }, ref) => (
    <DropdownMenuPrimitive.CheckboxItem ref={ref} className={className} checked={checked} {...props} >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            <DropdownMenuPrimitive.ItemIndicator>
                <Check />
            </DropdownMenuPrimitive.ItemIndicator>
        </span>
        {children}
    </DropdownMenuPrimitive.CheckboxItem>
))

DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName


const DropdownMenuRadioItem = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
    DropdownMenuRadioItemProps
>(({ className = `${sx["dropdown-menu-radio-item"]}`, children, ...props }, ref) => (
    <DropdownMenuPrimitive.RadioItem ref={ref} className={className} {...props} >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            <DropdownMenuPrimitive.ItemIndicator>
                <Circle className="h-2 w-2 fill-current" />
            </DropdownMenuPrimitive.ItemIndicator >
        </span>
        {children}
    </DropdownMenuPrimitive.RadioItem>
))

DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName


const DropdownMenuLabel = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Label>,
    DropdownMenuLabelProps
>(({ className = `${sx["dropdown-menu-label"]}`, inset, ...props }, ref) => (
    <DropdownMenuPrimitive.Label ref={ref} className={className} {...props} />
))

DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName


const DropdownMenuSeparator = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
    DropdownMenuSeparatorProps
>(({ className = `${sx["dropdown-menu-separator"]}`, ...props }, ref) => (
    <DropdownMenuPrimitive.Separator ref={ref} className={className} {...props} />
))

DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName


const DropdownMenuShortcut = ({ className = `${sx["dropdown-menu-shortcut"]}`, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
    return (
        <span className={className} {...props} />
    )
}

DropdownMenuShortcut.displayName = "DropdownMenuShortcut"


export {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuCheckboxItem,
    DropdownMenuRadioItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuGroup,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuRadioGroup,
}
