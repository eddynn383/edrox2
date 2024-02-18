"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import sx from "@/styles/component.module.scss"

const Progress = React.forwardRef<
    React.ElementRef<typeof ProgressPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ value, ...props }, ref) => (
    <ProgressPrimitive.Root
        ref={ref}
        className={sx["progress"]}
        {...props}
    >
        <ProgressPrimitive.Indicator
            className={sx["progress-indicator"]}
            style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
    </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
