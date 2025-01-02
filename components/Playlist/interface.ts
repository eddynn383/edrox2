import { Chapter } from "@/interfaces/global";

interface PlaylistItemType {
    id: string;
    title: string;
    description: string;
}

export interface PlaylistProps {
    courseId?: string;
    items: Chapter[];
    showDescription?: boolean;
    currentPath?: string;
    onReorder: (items: Chapter[]) => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;

}