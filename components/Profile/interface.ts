import { Size } from "@/interfaces/global";

export interface ProfileProps {
    id?: string;
    size: Size;
    user: any;
    onLogout?: () => void;
}