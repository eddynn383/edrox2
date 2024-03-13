// import { Roles } from "@prisma/client";

import { Category, Instructor, Price, Rating, Shade, Size, Variant } from "@/interfaces/global";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    effect?: "normal" | "glass";
    variant?: Exclude<Variant, "accent">;
    shade?: Shade;
    size?: Size
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: Size;
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: Size;
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: Size;
}

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    rank: number
}

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
    truncated?: boolean
}

