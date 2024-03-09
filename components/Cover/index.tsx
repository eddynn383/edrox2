import Image from "next/image";
import { CoverProps } from "./interface";
import sx from "@/styles/component.module.scss";

const Cover = ({ className=sx["cover"], src, alt, width, height }: CoverProps) => {
    return (
        <div className={className} data-width={width} data-height={height}>
            <Image src={src} alt={alt} width={width} height={height} />
        </div>
    )
}

export { Cover }