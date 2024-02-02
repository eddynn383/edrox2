"use client";

import Image from "next/image";
import { IPropsAvatar } from "./interface";
import sx from './component.module.scss'


const Avatar = ({ src, alt, id, style, size = "M", type = "square" }: IPropsAvatar) => {
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
        <div className={sx["avatar"]} id={id} style={style} data-size={size} data-type={type}>
            <Image className="profile" width={imageSize} height={imageSize} src={src} alt={alt ? alt : ''} />
        </div>
    )
}

export { Avatar }