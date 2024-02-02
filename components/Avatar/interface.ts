import { Size } from "@/interfaces/global"


export interface IPropsAvatar {
    src: string;
    alt?: string;
    id?: string;
    style?: React.CSSProperties;
    size: Size;
    type: "square" | "circle";
    onClick?: any;
}