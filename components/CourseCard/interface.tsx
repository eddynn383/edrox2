import { Category, Price, Rating } from "@/interfaces/global";
import { CardProps } from "../Card/interface";
import { Image } from "@prisma/client";

export type Course = {
    id: string;
    name: string;
    description: string | null;
    image: Image;
    price: Price;
    rating: Rating;
    category: Category;
    status?: string;
}


export interface CourseCardProps extends CardProps {
    cardId: string;
    data: Course;
    detailsURL?: string;
    orientation?: "vertical" | "horizontal";
}