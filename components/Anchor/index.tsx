import Link from "next/link";
import { AnchorProps } from "./interface";
import button from "@/components/Button/button.module.css"
import React from "react";


const Anchor = React.forwardRef<HTMLAnchorElement, AnchorProps>(({url, className=button.container, size = "M", mode = "text", status = "default", variant = "accent", shade = "100", content = "text", children, ...props}, ref) => {

    const customAttrs = {
        "data-mode": mode,
        "data-variant": variant,
        "data-status": status,
        "data-shade": shade,
        "data-size": size,
        "data-content": content
    }

    return ( 
        <Link className={className} href={url} ref={ref} {...customAttrs} {...props}>{children}</Link>
    )
})

Anchor.displayName = "Anchor"
 
export { Anchor };