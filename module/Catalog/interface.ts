import { Category } from "../Category/interface";

export interface CatalogProps {
    courses: any;
    categories: any;
    selectedCategory: string;
    pageTitle?: string;
    onSearch?: () => void;
}