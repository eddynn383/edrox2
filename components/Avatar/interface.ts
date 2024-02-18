import { Size } from "@/interfaces/global"


export interface AvatarProps {
    src: string;
    alt?: string;
    id?: string;
    style?: React.CSSProperties;
    size: Size;
    type: "square" | "circle";
    onClick?: any;
}