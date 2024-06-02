"use client"

import React, { useState } from "react";

import { Icon } from "@/components/Icon";
import { InputProps } from "./interface";
import csx from "@/styles/component.module.scss";
import { Name } from "../Icon/interface";
import input from "./input.module.css"

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className=input.container, type, mode="solid", shade = "100", sizes = "M", status = "default", iconBefore, iconAfter, outerStyle, ...props }, ref) => {
    const [isInputFocused, setIsInputFocused] = useState(false);


    const customAttrs = {
        "data-mode": mode,
        "data-shade": shade,
        "data-size": sizes,
        "data-status": status,
        "data-icon": iconBefore && iconAfter ? 'both' : iconBefore ? 'before' : iconAfter ? 'after' : null
    }


    const handleInputFocus = () => {
        setIsInputFocused(true);
    };

    const handleInputBlur = () => {
        setIsInputFocused(false);
    };

    return (
        <div className={className} data-focus={isInputFocused} style={outerStyle} {...customAttrs} >
            {iconBefore}
            {
                <input className={input.element} type={type} ref={ref} {...props} onFocus={handleInputFocus} onBlur={handleInputBlur} />
            }
            {iconAfter}
        </div>
    )
}
)

Input.displayName = "Input"

export { Input }