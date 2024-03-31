import Image from "next/image";
import csx from "@/styles/component.module.scss";
import {LogoProps} from "./interface"


const Logo = ({ cn, src, alt, position = "left", width, height, ...props }: LogoProps) => {

    return (
        <div className={csx["logo"]} data-position={position}>
            <Image className={cn} src={src} alt={alt} width={width} height={height} priority {...props} />
        </div>
    )
}

export { Logo }