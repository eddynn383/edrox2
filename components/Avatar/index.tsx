"use client";

import Image from "next/image";
import { AvatarProps } from "./interface";
import sx from "@/styles/component.module.scss"
import s from "./avatar.module.css"


const Avatar = ({ src, alt, id, style, size = "M", shape="square", ...props }: AvatarProps) => {
    let imageSize;

    switch (size) {
        case "S": imageSize = 24
            break;
        case "M": imageSize = 36
            break;
        case "L": imageSize = 44
            break;
        case "XL": imageSize = 60
            break;
        case "2XL": imageSize = 120
            break;
        default: imageSize = 36
            break;
    }

    return (
        <div className={s.container} id={id} style={style} data-size={size} data-shape={shape} {...props}>
            <Image className="profile" width={imageSize} height={imageSize} src={src} alt={alt ? alt : ''} />
        </div>
    )
}

export { Avatar }