import { Shape, Size } from "@/interfaces/global"


export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    src: string;
    text?: string;
    alt?: string;
    id?: string;
    style?: React.CSSProperties;
    size: Size;
    shape: Shape;
    title?: string;
    onClick?: any;
}