export type Variant = "primary" | "secondary" | "accent";
export type Mode = "solid" | "outline" | "text";
export type Status = "default" | "success" | "fail" | "warning" | "info" | "neutral";
export type Size = "XS" | "S" | "M" | "L" | "XL" | "2XL" | "3XL" | "4XL" | "5XL";
export type Shade = "100" | "200";
export type Content = "text" | "icon" | "icon-text-icon" | "icon-text" | "text-icon";   

export type Price = {
    id: string; 
    value: number; 
    currency: string; 
    discount: number | null | undefined;
}

export type Rating = {
    id: string; 
    value: number; 
    reviews: number;
}

export type Instructor = {
    id: string; 
    name: string | null; 
    email: string | null;
    image: string | null; 
    imageLarge: string | null; 
    createdAt: Date; 
    updatedAt: Date;
}