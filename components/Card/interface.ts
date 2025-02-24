// import { Roles } from "@prisma/client";

import { Category, Instructor, Mode, Size as SizeT, Price, Rating, Shade, Variant } from "@/interfaces/global";

type Size = "0" | "100" | "200" | "300" | "400" | "500" | "600";
type Rank = 1 | 2 | 3 | 4 | 5 | 6;

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: Exclude<Variant, "accent"> | "ghost";
    mode: Exclude<Mode, "text">;
    shade?: Shade;
    padding?: Size;
    radius?: Size;
    gap?: Size;
    orientation?: "vertical" | "horizontal";
    align?: "center" | "start" | "end";
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    padding?: Size;
    radius?: Size;
    gap?: Size;
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
    padding?: Size;
    radius?: Size;
    gap?: Size;
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    padding?: Size;
    radius?: Size;
    gap?: Size;
}

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    rank: Rank;
    size?: "S" | "M" | "L";
}

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
    truncated?: boolean
}

