import React, { ButtonHTMLAttributes, HTMLProps, forwardRef } from 'react'

import { TooltipContent, TooltipProvider, TooltipTrigger } from '../Tooltip'
import { Button, Surface, Tooltip } from '@/components'
import { Content, Shade, Size, Variant } from '@/interfaces/global'
import { ToolbarDividerProps, ToolbarWrapperProps } from './interface'
import toolbar from "./toolbar.module.css"

const ToolbarWrapper = forwardRef<HTMLDivElement, ToolbarWrapperProps>(({ className = toolbar.wrapper, shouldShowContent = true, container = true, orientation = "horizontal", children, ...rest }, ref) => {

    return (
        <div className={className} data-orientation={orientation} data-container={container} {...rest} ref={ref}>
            {children}
        </div>
    )
})

ToolbarWrapper.displayName = ToolbarWrapper.displayName


const ToolbarDivider = forwardRef<HTMLDivElement, ToolbarDividerProps>(({ className = toolbar.divider, orientation, ...rest }, ref) => {

    return <div className={className} data-orientation={orientation} ref={ref} {...rest} />
})


ToolbarDivider.displayName = ToolbarDivider.displayName



export type ToolbarButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    tooltip?: string;
    tooltipShortcut?: string[];
    size: Size;
    content?: Content;
    variant?: Exclude<Variant, "link">;
    shade?: Shade;
    selected?: boolean;
}

const ToolbarButton = forwardRef<HTMLButtonElement, ToolbarButtonProps>(({ className = toolbar.button, variant = "primary", shade = "100", size = "M", content = "icon", disabled, tooltip, tooltipShortcut, selected, onClick, children }, ref) => {

    if (tooltip) {
        return (
            <div className={className}>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant={variant}
                                content={content}
                                size={size}
                                selected={selected}
                                ref={ref}
                                disabled={disabled}
                                onClick={onClick}
                                type="button"
                            >
                                {children}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            {tooltip} {tooltipShortcut}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        )
    }

    return children
})

ToolbarButton.displayName = ToolbarButton.displayName

export { ToolbarWrapper, ToolbarDivider, ToolbarButton }
