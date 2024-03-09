"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { RadioGroupItemProps, RadioGroupProps } from "./interface"
import csx from "@/styles/component.module.scss"

const RadioGroup = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Root>, RadioGroupProps>(({ className=csx["radiogroup"], orientation="vertical", ...props }, ref) => {
    return (
        <RadioGroupPrimitive.Root className={className} data-orientation={orientation} {...props} ref={ref} />
    )
})

RadioGroup.displayName = RadioGroupPrimitive.Root.displayName



const RadioGroupItem = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Item>, RadioGroupItemProps>(({ className=csx["radiobox"], mode="solid", shade="100", ...props }, ref) => {
    return (
        <RadioGroupPrimitive.Item ref={ref} data-mode={mode} data-shade={shade} className={className} {...props} >
            <RadioGroupPrimitive.Indicator className={csx["radiobox-indicator"]} />
        </RadioGroupPrimitive.Item>
    )
})

RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem } 