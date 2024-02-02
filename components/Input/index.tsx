"use client"

import React from "react";

import { Icon } from "@/components/Icon";
import { InputProps } from "./interface";
import sx from "@/styles/component.module.scss";

const Input = React.forwardRef<HTMLInputElement, InputProps>(({type, shade = "100", sizes = "M", status = "default", iconBefore, iconAfter, ...props }, ref) => {
    
    const customAttrs = {
        "data-shade": shade,
        "data-size": sizes,
        "data-status": status,
        "data-icon": iconBefore && iconAfter ? 'both' : iconBefore ? 'before' : iconAfter ? 'after' : null,
        // "data-focus": focus
    }

    return (
        <div className={sx["input"]} {...customAttrs}>
            {iconBefore && <Icon name={iconBefore} className={sx["icon"]} />}
            {
                <input className={sx["input-inner"]} type={type} ref={ref} {...props} />
            }
            {iconAfter && <Icon name={iconAfter} className={sx["icon"]} />}
        </div>
    )
}
)

Input.displayName = "Input"

export { Input }