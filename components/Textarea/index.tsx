"use client"

import React, { useState } from "react";
import { TextareaProps } from "./interface";
import sx from "@/styles/component.module.scss";
import textarea from "./textarea.module.css"


const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ mode = "solid", shade = "100", sizes = "M", status = "default", resize, ...props }, ref) => {
    const [isTextareaFocused, setIsTextareaFocused] = useState(false);

    const customAttrs = {
        "data-mode": mode,
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
        <textarea className={textarea.container} ref={ref} {...customAttrs} {...props} onFocus={handleTextareaFocus} onBlur={handleTextareaBlur} />
    )
})

Textarea.displayName = "Textarea"

export { Textarea }