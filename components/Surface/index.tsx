import { HTMLProps, forwardRef } from 'react'
import surface from "./surface.module.css"
import { Mode } from '@/interfaces/global'

export type SurfaceProps = HTMLProps<HTMLDivElement> & {
    mode?: Exclude<Mode, "text">
}

const Surface = forwardRef<HTMLDivElement, SurfaceProps>(
    ({ children, className = surface.container, mode = "solid", ...props }, ref) => {

        return (
            <div className={className} data-mode={mode} {...props} ref={ref}>
                {children}
            </div>
        )
    },
)

Surface.displayName = 'Surface'

export { Surface } 
