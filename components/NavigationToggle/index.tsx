import { NavigationToggleProps } from "./interface"
import toggle from "./toggle.module.css"

export const NavigationToggle = ({ className = toggle.container, state }: NavigationToggleProps) => {

    return (
        <div className={className} data-state={state ? 'open' : "close"}>
            <span className={toggle.bar} data-position="top"></span>
            <span className={toggle.bar} data-position="middle"></span>
            <span className={toggle.bar} data-position="bottom"></span>
        </div>
    )
}
