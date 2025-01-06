import { Chapter, CourseSettings } from "@prisma/client";


export interface SidePanelProps {
    courseId: string;
    chapters?: Chapter[];
    courseSettings?: CourseSettings | null;
    location: string;
}