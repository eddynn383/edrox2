import { Size, Status, Mode } from "@/interfaces/global";

type Shape = "square" | "rounded"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    mode?: Mode;
    status?: Status;
    shape?: Shape;
    size?: Size;
    href?: string;
    selected?: boolean;
}