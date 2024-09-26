import React from "react";
import { PageBodyProps } from "./interface";
import body from "./page-body.module.css";

const PageBody = React.forwardRef<
    HTMLDivElement,
    PageBodyProps
>(({ className=body.container, children, ...props }, ref) => {
    return (
        <div className={className} {...props} ref={ref}>
            {children}
        </div>
    )
})

PageBody.displayName = "PageBody"

export { PageBody }