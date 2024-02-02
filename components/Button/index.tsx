"use client";

import React from "react";
import { ButtonProps } from "./interface";
import sx from "@/styles/component.module.scss";


const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ cn, size = "M", mode = "solid", status = "default", variant = "primary", shade = "100", content = "text", selected, controls, children, ...props }, ref) => {

    const customAttrs = {
        "data-mode": mode,
        "data-variant": variant,
        "data-status": status,
        "data-shade": shade,
        "data-size": size,
        "data-content": content,
        "data-selected": selected
    }

    const a11y = {
        "aria-controls": controls,
    }

    return (
        <button className={`${sx["button"]}${cn ? " " + cn : ""}`} {...customAttrs} {...a11y} ref={ref} {...props}>
            {children}
        </button>
    )
})

Button.displayName = "Button"

export { Button }