"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"
import { DropdownMenuCheckboxItemProps, DropdownMenuContentProps, DropdownMenuItemProps, DropdownMenuLabelProps, DropdownMenuRadioItemProps, DropdownMenuSeparatorProps, DropdownMenuSubContentProps, DropdownMenuSubTriggerProps } from "./interface"
import dropdown from "./dropdown.module.css"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
    DropdownMenuSubTriggerProps
>(({ className = dropdown["submenu-trigger"], inset, children, ...props }, ref) => (
    <DropdownMenuPrimitive.SubTrigger ref={ref} className={className} {...props} >
        {children}
        <ChevronRight className={dropdown["submenu-trigger-icon"]} />
    </DropdownMenuPrimitive.SubTrigger>
))

DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName


const DropdownMenuSubContent = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
    DropdownMenuSubContentProps
>(({ className = dropdown["submenu-content"], shade = "100", ...props }, ref) => (
    <DropdownMenuPrimitive.SubContent ref={ref} data-shade={shade} className={className} {...props} />
))

DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName


const DropdownMenuContent = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Content>,
    DropdownMenuContentProps
>(({ className = dropdown["menu-content"], sideOffset = 4, shade = "100", ...props }, ref) => (
    <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content ref={ref} data-shade={shade} sideOffset={sideOffset} className={className} {...props} />
    </DropdownMenuPrimitive.Portal>
))

DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName


const DropdownMenuItem = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Item>,
    DropdownMenuItemProps
>(({ className = dropdown.item, hasChild="false", inset, ...props }, ref) => (
    <DropdownMenuPrimitive.Item ref={ref} className={className} data-has-children={hasChild} {...props} />
))

DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName


const DropdownMenuCheckboxItem = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
    DropdownMenuCheckboxItemProps
>(({ className = dropdown.checkbox, children, checked, ...props }, ref) => (
    <DropdownMenuPrimitive.CheckboxItem ref={ref} className={className} checked={checked} {...props} >
        <span className={dropdown["checkbox-marker"]}>
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
>(({ className = dropdown.radiobox, children, ...props }, ref) => (
    <DropdownMenuPrimitive.RadioItem ref={ref} className={className} {...props} >
        <span className={dropdown["radiobox-marker"]}>
            <DropdownMenuPrimitive.ItemIndicator>
                <Circle />
            </DropdownMenuPrimitive.ItemIndicator >
        </span>
        {children}
    </DropdownMenuPrimitive.RadioItem>
))

DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName


const DropdownMenuLabel = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Label>,
    DropdownMenuLabelProps
>(({ className = dropdown.label, inset, ...props }, ref) => (
    <DropdownMenuPrimitive.Label ref={ref} className={className} {...props} />
))

DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName


const DropdownMenuSeparator = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
    DropdownMenuSeparatorProps
>(({ className = dropdown.separator, ...props }, ref) => (
    <DropdownMenuPrimitive.Separator ref={ref} className={className} {...props} />
))

DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName


const DropdownMenuShortcut = ({ className = dropdown.shortcut, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
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
