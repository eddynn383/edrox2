import { HeadingProps } from "./interface";
import heading from "./heading.module.css"

const Heading = ({ className = heading.element, children, rank, size = "M", truncate = null, uppercase = false }: HeadingProps) => {
    return (
        <>
            {rank === 1 && <h1 className={className} data-rank={rank} data-size={size} data-uppercase={uppercase} data-truncate={truncate?.lines} style={{ maxWidth: truncate?.length }}>{children}</h1>}
            {rank === 2 && <h2 className={className} data-rank={rank} data-size={size} data-uppercase={uppercase} data-truncate={truncate?.lines} style={{ maxWidth: truncate?.length }}>{children}</h2>}
            {rank === 3 && <h3 className={className} data-rank={rank} data-size={size} data-uppercase={uppercase} data-truncate={truncate?.lines} style={{ maxWidth: truncate?.length }}>{children}</h3>}
            {rank === 4 && <h4 className={className} data-rank={rank} data-size={size} data-uppercase={uppercase} data-truncate={truncate?.lines} style={{ maxWidth: truncate?.length }}>{children}</h4>}
            {rank === 5 && <h5 className={className} data-rank={rank} data-size={size} data-uppercase={uppercase} data-truncate={truncate?.lines} style={{ maxWidth: truncate?.length }}>{children}</h5>}
            {rank === 6 && <h6 className={className} data-rank={rank} data-size={size} data-uppercase={uppercase} data-truncate={truncate?.lines} style={{ maxWidth: truncate?.length }}>{children}</h6>}
        </>
    )
}

export { Heading };