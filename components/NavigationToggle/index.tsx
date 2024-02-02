import sx from "@/styles/component.module.scss"
import { NavigationToggleProps } from "./interface"

export const NavigationToggle = ({state}: NavigationToggleProps) => {

  return (
    <div className={`${sx["toggle"]} ${state ? sx["open"] : sx["close"]}`}>
        <span className={`${sx["bar"]} ${sx["bar--top"]}`}></span>
        <span className={`${sx["bar"]} ${sx["bar--middle"]}`}></span>
        <span className={`${sx["bar"]} ${sx["bar--bottom"]}`}></span>
    </div>
  )
}
