"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { RadioGroupItemProps, RadioGroupProps } from "./interface"
import radio from "./radio.module.css"

const RadioGroup = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Root>, RadioGroupProps>(({ className=radio.group, orientation="vertical", ...props }, ref) => {
    return (
        <RadioGroupPrimitive.Root className={className} data-orientation={orientation} {...props} ref={ref} />
    )
})

RadioGroup.displayName = RadioGroupPrimitive.Root.displayName



const RadioGroupItem = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Item>, RadioGroupItemProps>(({ className=radio.item, mode="solid", shade="100", ...props }, ref) => {
    return (
        <RadioGroupPrimitive.Item ref={ref} data-mode={mode} data-shade={shade} className={className} {...props} >
            <RadioGroupPrimitive.Indicator className={radio.indicator} />
        </RadioGroupPrimitive.Item>
    )
})

RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem } 