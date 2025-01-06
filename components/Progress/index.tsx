"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import progress from "./progress.module.css"
import { ProgressProps } from "./interface"

const Progress = React.forwardRef<
    React.ElementRef<typeof ProgressPrimitive.Root>,
    ProgressProps
>(({ value, className = progress.container, thickness = "100", shape = "rounded", status = "default", width, height = "4px", ...props }, ref) => (
    <ProgressPrimitive.Root
        ref={ref}
        className={className}
        data-thickness={thickness}
        data-shape={shape}
        data-status={status}
        style={{
            "--progress-width": width,
            "--progress-height": height,
            width: "var(--progress-width)",
            height: "var(--progress-height)",
        } as React.CSSProperties}
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
