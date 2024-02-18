import { TextProps } from "./interface";
import sx from "@/styles/component.module.scss"

const Text = ({ children, size = "M" }: TextProps) => {
    return (
        <span className={sx["text"]} data-size={size}>{children}</span>
    )
}

export { Text };