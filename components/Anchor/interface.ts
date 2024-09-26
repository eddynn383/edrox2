import { Content, Mode, Shade, Size, Status, Variant } from "@/interfaces/global";


export interface AnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    url: string;
    size?: Size;
    mode?: Mode;
    variant?: Variant;
    status?: Status;
    shade?: Shade;
    content?: Content;
    inline?: Boolean;
    value?: string;
    children?: React.ReactNode | React.ReactNode[] | string;
}