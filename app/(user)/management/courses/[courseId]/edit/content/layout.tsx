import { Heading, ScrollArea, Text } from "@/components";
import { ChapterSkeleton } from "@/components/Skeleton";
import { getAllChaptersByCourseId } from "@/data/chapters";
import { delayData } from "@/lib/utils";
import ChapterCreation from "@/module/ChapterCreation";
import CourseChapters from "@/module/CourseChapters";
import page from "@/styles/page.module.css"
import { Suspense } from "react";

type SearchParams = Promise<{ playlist: string }>

interface ChapterLayoutProps {
    children: React.ReactNode,
    sidepanel: React.ReactNode,
    params: {
        courseId: string,
        chapterId: string
    }
}


const ChapterLayout = async (props: ChapterLayoutProps) => {

    const { params, children, sidepanel } = await props;

    const courseId = params.courseId;
    const chapters = await getAllChaptersByCourseId(courseId)

    return (
        <>
            <div className={page["section-left"]}>
                {children}
            </div>
            <div className={page["section-right"]}>
                {sidepanel}
            </div>
        </>
    );
}

export default ChapterLayout;