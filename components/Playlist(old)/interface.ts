import { Chapter } from "@/interfaces/global";

export interface PlaylistProps {
    courseId?: string;
    data: Chapter[];
    target?: string;
    edit?: boolean;
    currentPath?: string;
}