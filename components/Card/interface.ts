// import { Roles } from "@prisma/client";

import { Instructor, Price, Rating, Size, Variant } from "@/interfaces/global";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    effect?: "normal" | "glass";
    variant?: Exclude<Variant, "accent">;
    size?: Size
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    rank: number
}

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export interface CourseCardProps {
    data: any;
    // image: string;
    // title: string;
    price: Price | null | undefined;
    rating: Rating | null | undefined;
    instructor: Instructor | null | undefined;
    // chapters: string;
    layout?: "columns" | "rows";
}

