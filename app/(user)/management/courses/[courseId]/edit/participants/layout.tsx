import { Heading, ScrollArea, Text } from "@/components";
import { ChapterSkeleton } from "@/components/Skeleton";
import { getAllGroupsByCourseId } from "@/data/groups";
import { CourseEditGroups } from "@/module/CourseEditGroups";
import { CourseGroupCreation } from "@/module/CourseGroupCreation";
import { Suspense } from "react";
import page from "@/styles/page.module.css"
import { SidePanel } from "@/module/SidePanel";

interface ParticipantsLayoutProps {
    children: React.ReactNode,
    // chaptersList: React.ReactNode,
    params: {
        courseId: string,
        chapterId: string
    }
}

export default async function ParticipantsLayout({ children, params }: ParticipantsLayoutProps) {
    const { courseId, chapterId } = params;
    const groups = await getAllGroupsByCourseId(courseId)

    return (
        <>
            <div className={page["section-left"]}>
                {children}
            </div>
            <div className={page["section-right"]}>
                <SidePanel courseId={courseId} groups={groups} location="participants" />
            </div>
        </>
    );
}