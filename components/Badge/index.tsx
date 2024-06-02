import Link from "next/link"
import { BadgeProps } from "./interface"
import badge from "./badge.module.css"

function Badge({ className=badge.container, mode = "solid", shape = "square", size = "M", status = "default", selected, href, ...props }: BadgeProps) {
    return (
        <>        
            {
                !href && 
                <div className={className} data-mode={mode} data-size={size} data-status={status} data-shape={shape} {...props} />
            }
            {
                href && 
                <Link href={href}>
                    <div className={className} data-mode={mode} data-size={size} data-status={status} data-shape={shape} data-selected={selected} {...props} />
                </Link>
            }
        </>
    )
}

export { Badge }
