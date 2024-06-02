import { Status, Shade, Mode, Size, Content, Variant } from "@/interfaces/global"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    selected?: boolean;
    controls?: string,
    size?: Size;
    mode?: Mode;
    variant?: Variant;
    status?: Status;
    shade?: Shade;
    content?: Content;
    value?: string;
    children?: React.ReactNode | React.ReactNode[] | string;
}
// type Primary = "primary"