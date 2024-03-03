"use client"

import React, { useState } from "react";
import { TextareaProps } from "./interface";
import sx from "@/styles/component.module.scss";


const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ shade = "100", sizes = "M", status = "default", resize, ...props }, ref) => {
    const [isTextareaFocused, setIsTextareaFocused] = useState(false);
    
    const customAttrs = {
        "data-shade": shade,
        "data-size": sizes,
        "data-status": status,
        "data-resize": resize,
        "data-focus": isTextareaFocused
    }

    const handleTextareaFocus = () => {
        setIsTextareaFocused(true);
    };

    const handleTextareaBlur = () => {
        setIsTextareaFocused(false);
    };

    return (
        <textarea className={sx["textarea"]} ref={ref} {...customAttrs} {...props} onFocus={handleTextareaFocus} onBlur={handleTextareaBlur} />
    )
})

Textarea.displayName = "Textarea"

export { Textarea }