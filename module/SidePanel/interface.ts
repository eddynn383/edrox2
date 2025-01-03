import { Chapter } from "@prisma/client";


export interface SidePanelProps {
    courseId: string;
    chapters: Chapter[];
    show: boolean;
}