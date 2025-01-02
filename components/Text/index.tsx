import { TextProps } from "./interface";
import text from "./text.module.css"

const Text = ({ className = text.element, type = "paragraph", children, size = "M", weight = "400", truncate = null, uppercase = false }: TextProps) => {
    return (
        <>
            {
                type === "paragraph" &&
                <p className={className} data-size={size} data-weight={weight} data-uppercase={uppercase} data-truncate={truncate?.lines} style={{ maxWidth: truncate?.length }}>{children}</p>
            }
            {
                type === "span" &&
                <span className={className} data-size={size} data-weight={weight} data-uppercase={uppercase} data-truncate={truncate?.lines} style={{ maxWidth: truncate?.length }}>{children}</span>
            }
            {
                type === "heading" &&
                <>
                    {size === "H1" && <h1 className={className} data-size={size} data-weight={weight} data-uppercase={uppercase} data-truncate={truncate?.lines} style={{ maxWidth: truncate?.length }}>{children}</h1>}
                    {size === "H2" && <h2 className={className} data-size={size} data-weight={weight} data-uppercase={uppercase} data-truncate={truncate?.lines} style={{ maxWidth: truncate?.length }}>{children}</h2>}
                    {size === "H3" && <h3 className={className} data-size={size} data-weight={weight} data-uppercase={uppercase} data-truncate={truncate?.lines} style={{ maxWidth: truncate?.length }}>{children}</h3>}
                    {size === "H4" && <h4 className={className} data-size={size} data-weight={weight} data-uppercase={uppercase} data-truncate={truncate?.lines} style={{ maxWidth: truncate?.length }}>{children}</h4>}
                    {size === "H5" && <h5 className={className} data-size={size} data-weight={weight} data-uppercase={uppercase} data-truncate={truncate?.lines} style={{ maxWidth: truncate?.length }}>{children}</h5>}
                </>

            }
        </>
    )
}

export { Text };