import Image from "next/image";
import { CoverProps } from "./interface";
import sx from "@/styles/component.module.scss";

const Cover = ({ className=sx["cover"], src, alt, width, height, defSize=false }: CoverProps) => {

    const customAttr = defSize ? {
        "data-width": `${width}px`,
        "data-height": `${height}px`,
        "style": {
            "width": `${width}px`, 
            "height": `${height}px`
        } 
    } : null

    return (
        <div className={className} {...customAttr} >
            <Image src={src} alt={alt} width={width} height={height} />
        </div>
    )
}

export { Cover }