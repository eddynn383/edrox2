import { Category } from "../Category/interface";

export interface CatalogProps {
    courses: any;
    categories: any;
    pageTitle?: string;
    onSearch?: () => void;
}