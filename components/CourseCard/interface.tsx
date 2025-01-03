import { Category, Price, Rating } from "@/interfaces/global";
import { CardProps } from "../Card/interface";
import { Image } from "@prisma/client";

export type Course = {
    id: string;
    title: string;
    description: string | null;
    image: Image;
    price: Price;
    rating: Rating;
    category: Category;
}


export interface CourseCardProps extends CardProps {
    cardId: string;
    data: Course;
    detailsURL?: string;
    // view?: "columns" | "rows";
}