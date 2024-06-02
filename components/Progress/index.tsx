"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import progress from "./progress.module.css"
import { ProgressProps } from "./interface"

const Progress = React.forwardRef<
    React.ElementRef<typeof ProgressPrimitive.Root>,
    ProgressProps
>(({ value, className=progress.container, thickness="100", shape="square", ...props }, ref) => (
    <ProgressPrimitive.Root
        ref={ref}
        className={className}
        data-thickness={thickness}
        data-shape={shape}
        {...props}
    >
        <ProgressPrimitive.Indicator
            className={progress.indicator}
            style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
    </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
