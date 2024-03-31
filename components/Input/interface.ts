import { Mode, Shade, Size, Status } from "@/interfaces/global";
import { Name } from "../Icon/interface";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    mode?: Exclude<Mode, "text">;
    shade?: Shade;
    sizes?: Size;
    status?: Status;
    iconBefore?: Name;
    iconAfter?: Name;
}
