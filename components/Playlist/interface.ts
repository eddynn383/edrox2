import { Chapter } from "@/interfaces/global";

export interface PlaylistProps {
    courseId?: string;
    items: Chapter[];
    showDescription?: boolean;
    currentPath?: string;
}