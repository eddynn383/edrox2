import { Chapter, CourseSettings, Group } from "@prisma/client";


export interface SidePanelProps {
    courseId: string;
    chapters?: Chapter[];
    groups?: Group[];
    courseSettings?: CourseSettings | null;
    location: string;
}