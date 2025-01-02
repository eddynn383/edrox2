import { Mode, Shade, Size, Status } from "@/interfaces/global";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    mode?: Mode;
    shade?: Shade;
    sizes?: Size;
    status?: Status;
    resize?: "vertical" | "horizontal" | "both";
    value?: string;
}