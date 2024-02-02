import { Status, Shade, Mode, Size, Content, Variant } from "@/interfaces/global"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    cn?: String; 
    selected?: boolean;
    controls?: string,
    size?: Size;
    mode?: Mode;
    status?: Status;
    variant?: Variant;
    shade?: Shade;
    content?: Content;
    value?: string;
    children?: React.ReactNode | React.ReactNode[] | string;
}