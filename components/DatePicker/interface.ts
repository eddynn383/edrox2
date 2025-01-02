import { Size } from "@/interfaces/global";

export interface DatePickerProps {
    type?: "single" | "multiple" | "range" | undefined;
    size?: Size;
}