import { Category, Price, Rating } from "@/interfaces/global";
import { CardProps } from "../Card/interface";

export type Course = {
    id: string;
    title: string;
    description: string | null;
    image: string | null;
    price: Price;
    rating: Rating;
    category: Category;
}


export interface CourseCardProps extends CardProps {
    cardId: string;
    data: Course;
    layout?: "columns" | "rows";
}