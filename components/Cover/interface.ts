import { Size } from "@/interfaces/global";

export interface CoverProps extends React.HTMLAttributes<HTMLDivElement> {
    src?: any;
    alt: string;
    width?: any;
    height?: any;
    defSize?: boolean;
    size?: Size;
}