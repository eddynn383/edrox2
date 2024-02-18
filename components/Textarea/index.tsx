import * as React from "react"
import { TextareaProps } from "./interface"
import sx from "@/styles/component.module.scss"


const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ shade = "100", sizes = "M", status = "default", ...props }, ref) => {
    const customAttrs = {
        "data-shade": shade,
        "data-size": sizes,
        "data-status": status,
    }
    return (
        <textarea className={sx["textarea"]} ref={ref} {...customAttrs} {...props} />
    )
})

Textarea.displayName = "Textarea"

export { Textarea }