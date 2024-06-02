import { Size, Status, Mode, Shape } from "@/interfaces/global";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    mode?: Mode;
    status?: Status;
    shape?: Shape;
    size?: Size;
    href?: string;
    selected?: boolean;
}