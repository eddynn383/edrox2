import Image from "next/image";
import csx from "@/styles/component.module.scss";
import {LogoProps} from "./interface"
import logo from "./logo.module.css"


const Logo = ({ className=logo.image, src, alt, position = "left", width, height, ...props }: LogoProps) => {

    return (
        <div className={logo.container} data-position={position}>
            <Image className={className} src={src} alt={alt} width={width} height={height} priority {...props} />
        </div>
    )
}

export { Logo }