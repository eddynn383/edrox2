"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import sx from "@/styles/component.module.scss"


const Label = React.forwardRef<
    React.ElementRef<typeof LabelPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className=sx["form-label"], ...props }, ref) => (
    <LabelPrimitive.Root
        ref={ref}
        className={className}
        {...props}
    />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
