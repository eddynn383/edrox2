import { Mode, Status } from "@/interfaces/global";

export interface AlertProps {
    id?: string;
    style?: React.CSSProperties;
    mode?: Mode;
    status: Status;
    position?: "static" | "absolute";
    action?: any;
    delay?: number;
    children?: any;
}