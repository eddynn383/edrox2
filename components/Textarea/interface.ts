import { Shade, Size, Status } from "@/interfaces/global";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    shade?: Shade;
    sizes?: Size;
    status?: Status;
}