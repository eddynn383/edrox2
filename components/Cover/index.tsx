import Image from "next/image";
import { IPropsCover } from "./interface";
import sx from "@/styles/component.module.scss";

const Cover = ({ cn, src, alt, width, height }: IPropsCover) => {
    return (
        <div className={sx["cover"]}>
            <Image className={cn} src={src} alt={alt} width={width} height={height} />
        </div>
    )
}

export { Cover }