import { Size } from "@/interfaces/global";

export interface TextProps extends React.HTMLAttributes<HTMLSpanElement | HTMLParagraphElement> {
    children: React.ReactNode;
    type?: "paragraph" | "span" | "heading";
    size?: Size | "H1" | "H2" | "H3" | "H4" | "H5";
    weight?: "300" | "400" | "600" | "700";
    uppercase?: boolean;
    truncate?: {
        lines?: number;
        length?: string;
    } | null
}