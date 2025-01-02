import { ScrollArea, Text } from "@/components";
import { ChapterSkeleton } from "@/components/Skeleton";
import { getAllChaptersByCourseId } from "@/data/chapters";
import ChapterCreation from "@/module/ChapterCreation";
import CourseChapters from "@/module/CourseChapters";
import page from "@/styles/page.module.css"
import { Suspense } from "react";

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
    const chapters = await getAllChaptersByCourseId(courseId)

    return (
        <>
            <div className={page["section-left"]}>
                {children}
            </div>
            <div className={page["section-right"]}>
                <div className={page["section-header"]} >
                    <Text type="heading" size="H2">Groups</Text>
                    <ChapterCreation courseId={courseId} />
                </div>
                <div className={page["section-body"]}>
                    <ScrollArea>
                        <div className={page.inner}>
                            <Suspense fallback={<ChapterSkeleton />}>
                                <CourseChapters courseId={courseId} chapters={chapters} />
                            </Suspense>
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </>
    );
}