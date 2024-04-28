import Image from "next/image";
import { Icon, Text } from "@/components"
import { CoverProps } from "./interface";
import csx from "@/styles/component.module.scss";

const Cover = ({ className=csx["cover"], src, alt, width, height, defSize=false, size="M", ...props }: CoverProps) => {

    const customAttr = defSize ? {
        "data-width": `${width}px`,
        "data-height": `${height}px`,
        "style": {
            "width": `${width}px`, 
            "height": `${height}px`
        } 
    } : null

    return (
        <div className={className} {...customAttr} {...props} data-size={size}>
            {
                src && 
                <Image src={src} alt={alt} width={width} height={height} />
            }
            {
                !src && 
                <div className={csx["cover-empty"]}>
                    { size !== "S" && <Icon name="image"/> }
                    <Text size="XS">No image found!</Text>
                </div>
            }
        </div>
    )
}

export { Cover }