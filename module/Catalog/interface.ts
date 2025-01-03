import { Grid, List } from "@/interfaces/global";
import { Category } from "../Category/interface";

export interface CatalogProps {
    courses: any;
    layout: "grid" | "list";
    onSearch?: () => void;
}