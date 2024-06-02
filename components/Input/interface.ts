import { Mode, Shade, Size, Status } from "@/interfaces/global";
import { Name } from "../Icon/interface";
import { CSSProperties, ReactElement } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    mode?: Exclude<Mode, "text">;
    shade?: Shade;
    sizes?: Size;
    status?: Status;
    iconBefore?: ReactElement;
    iconAfter?: ReactElement;
    outerStyle?: CSSProperties | undefined;
}
