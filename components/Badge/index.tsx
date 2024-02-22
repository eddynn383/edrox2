import Link from "next/link"
import { BadgeProps } from "./interface"
import sx from "@/styles/component.module.scss"

function Badge({ mode = "solid", shape = "square", size = "M", status = "default", selected, href, ...props }: BadgeProps) {
    return (
        <>        
            {
                
                !href && <div className={sx["badge"]} data-mode={mode} data-size={size} data-status={status} data-shape={shape} {...props} />
            }
            {
                href && <Link href={href}>
                    <div className={sx["badge"]} data-mode={mode} data-size={size} data-status={status} data-shape={shape} data-selected={selected} {...props} />
                </Link>
            }
        </>
    )
}

export { Badge }
