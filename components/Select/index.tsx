"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { SelectContentProps, SelectItemProps, SelectLabelProps, SelectScrollDownButtonProps, SelectScrollUpButtonProps, SelectSeparatorProps, SelectTriggerProps } from "./interface"
import sx from "@/styles/component.module.scss"


const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Trigger>,
    SelectTriggerProps
>(({ className, children, mode = "solid", shade = "100", size = "M", status="default", ...props }, ref) => (
    <SelectPrimitive.Trigger ref={ref} className={sx["select-trigger"]} data-mode={mode} data-shade={shade} data-size={size} data-status={status} {...props} >
        {children}
        <SelectPrimitive.Icon asChild>
            <ChevronDown />
        </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
))

SelectTrigger.displayName = SelectPrimitive.Trigger.displayName


const SelectScrollUpButton = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
    SelectScrollUpButtonProps
>(({ className, ...props }, ref) => (
    <SelectPrimitive.ScrollUpButton ref={ref} className={sx["select-scroll-up"]} {...props} >
        <ChevronUp />
    </SelectPrimitive.ScrollUpButton>
))

SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName


const SelectScrollDownButton = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
    SelectScrollDownButtonProps
>(({ className, ...props }, ref) => (
    <SelectPrimitive.ScrollDownButton ref={ref} className={sx["select-scroll-down"]} {...props} >
        <ChevronDown />
    </SelectPrimitive.ScrollDownButton>
))

SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName


const SelectContent = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Content>,
    SelectContentProps
>(({ className, children, position = "popper", shade = "100", size = "M", ...props }, ref) => (
    <SelectPrimitive.Portal>
        <SelectPrimitive.Content ref={ref} className={sx["select-content"]} position={position} data-shade={shade} data-size={size} {...props} >
            <SelectScrollUpButton />
            <SelectPrimitive.Viewport className={sx["select-content-inner"]} >
                {children}
            </SelectPrimitive.Viewport>
            <SelectScrollDownButton />
        </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
))

SelectContent.displayName = SelectPrimitive.Content.displayName


const SelectLabel = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Label>,
    SelectLabelProps
>(({ className, ...props }, ref) => (
    <SelectPrimitive.Label ref={ref} className={sx["select-label"]} {...props} />
))

SelectLabel.displayName = SelectPrimitive.Label.displayName


const SelectItem = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Item>,
    SelectItemProps
>(({ className, children, ...props }, ref) => (
    <SelectPrimitive.Item ref={ref} className={sx["select-item"]} {...props} >
        <span>
            <SelectPrimitive.ItemIndicator>
                <Check className={sx["select-item-selected"]} />
            </SelectPrimitive.ItemIndicator>
        </span>

        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
))

SelectItem.displayName = SelectPrimitive.Item.displayName


const SelectSeparator = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Separator>,
    SelectSeparatorProps
>(({ className, ...props }, ref) => (
    <SelectPrimitive.Separator
        ref={ref}
        className={sx["select-separator"]}
        {...props}
    />
))

SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
    Select,
    SelectGroup,
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectLabel,
    SelectItem,
    SelectSeparator,
    SelectScrollUpButton,
    SelectScrollDownButton,
}
