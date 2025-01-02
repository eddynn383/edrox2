"use client";

import React from "react";
import { ButtonProps } from "./interface";
import button from "./button.module.css"
import sx from "@/styles/component.module.scss";


const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = button.container, size = "M", mode = "solid", variant = "primary", status = "default", content = "text", selected, controls, children, ...props }, ref) => {

        const customAttrs = {
            "data-mode": mode,
            "data-variant": variant,
            "data-status": status,
            "data-size": size,
            "data-content": content,
            "data-selected": selected
        }

        const a11y = {
            "aria-controls": controls,
        }

        return (
            <button className={className} {...customAttrs} {...a11y} ref={ref} {...props}>
                {children}
            </button>
        )
    })

Button.displayName = "Button"

export { Button }