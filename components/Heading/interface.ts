import { Size } from "@/interfaces/global";

type Rank = 1 | 2 | 3 | 4 | 5 | 6

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children?: React.ReactNode;
    size?: Exclude<Size, "XS" | "XL" | "2XL" | "3XL" | "4XL" | "5XL">;
    rank: Rank;
    uppercase?: boolean;
    truncate?: {
        lines?: number;
        length?: string;
    } | null
}