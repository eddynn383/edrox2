// import { Roles } from "@prisma/client";

import { Category, Instructor, Price, Rating, Shade, Variant } from "@/interfaces/global";

type Size = "0" | "100" | "200" | "300" | "400" | "500" | "600"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: Exclude<Variant, "accent"> | "ghost";
    shade?: Shade;
    padding?: Size;
    radius?: Size;
    gap?: Size;
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    padding?: Size;
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
    padding?: Size;
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    padding?: Size;
}

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    rank: number
}

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
    truncated?: boolean
}

