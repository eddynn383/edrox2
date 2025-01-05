"use client";

import React from "react";
import { LinkProps } from "./interface";
import link from "./link.module.css";
import Link from "next/link";

const Anchor = React.forwardRef<HTMLAnchorElement, LinkProps>(({ className = link.container, href, mode = "text", size = "M", children, onClick, ...props }, ref) => {


    if (onClick && !href) {
        return (

            <button type="button" className={className} data-mode={mode} data-size={size} {...props} ref={ref as React.Ref<HTMLButtonElement>} onClick={onClick} >
                {children}
            </button>
        )
    }

    if (href && !onClick) {
        return (
            <Link className={className} href={href} data-mode={mode} data-size={size} {...props} ref={ref} >
                {children}
            </Link>
        )
    }

    console.error("Link requires either an 'href' or 'onClick' prop.");
    return null;
})

Anchor.displayName = "Anchor"

export { Anchor }