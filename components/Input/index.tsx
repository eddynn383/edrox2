"use client"

import React, { useState } from "react";

import { Icon } from "@/components/Icon";
import { InputProps } from "./interface";
import sx from "@/styles/component.module.scss";

const Input = React.forwardRef<HTMLInputElement, InputProps>(({type, shade = "100", sizes = "M", status = "default", iconBefore, iconAfter, ...props }, ref) => {
    const [isInputFocused, setIsInputFocused] = useState(false);


    const customAttrs = {
        "data-shade": shade,
        "data-size": sizes,
        "data-status": status,
        "data-icon": iconBefore && iconAfter ? 'both' : iconBefore ? 'before' : iconAfter ? 'after' : null,
        // "data-focus": focus
    }


    const handleInputFocus = () => {
        setIsInputFocused(true);
    };

    const handleInputBlur = () => {
        setIsInputFocused(false);
    };

    return (
        <div className={sx["input"]} data-focus={isInputFocused} {...customAttrs}>
            {iconBefore && <Icon name={iconBefore} className={sx["icon"]} />}
            {
                <input className={sx["input-inner"]} type={type} ref={ref} {...props} onFocus={handleInputFocus} onBlur={handleInputBlur} />
            }
            {iconAfter && <Icon name={iconAfter} className={sx["icon"]} />}
        </div>
    )
}
)

Input.displayName = "Input"

export { Input }