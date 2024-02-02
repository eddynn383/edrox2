import Image from "next/image";
import sx from "@/styles/component.module.scss";
import {LogoProps} from "./interface"


const Logo = ({ cn, src, alt, position = "left", width, height }: LogoProps) => {

    return (
        <div className={sx["logo"]} data-position={position}>
            <Image className={cn} src={src} alt={alt} width={width} height={height} priority />
        </div>
    )
}

export { Logo }