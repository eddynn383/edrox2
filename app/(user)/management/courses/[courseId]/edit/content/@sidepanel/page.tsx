import { Heading, ScrollArea, Text } from "@/components";
import { ChapterSkeleton } from "@/components/Skeleton";
import { getAllChaptersByCourseId } from "@/data/chapters";
import ChapterCreation from "@/module/ChapterCreation";
import CourseChapters from "@/module/CourseChapters";
import { Suspense } from "react";
import page from "@/styles/page.module.css"

type SearchParams = Promise<{ playlist: string }>

interface SidePanelPageProps {
    params: {
        courseId: string,
        chapterId: string
    },
    searchParams: SearchParams
}

const SidePanelPage = async (props: SidePanelPageProps) => {
    const { params, searchParams } = props;
    const playlist = (await searchParams).playlist === "on" ? true : false;
    const courseId = params.courseId
    const chapters = await getAllChaptersByCourseId(courseId)
    console.log("Published chapters: ", chapters)

    return (
        <div className={page.sidepanel} data-active={playlist}>
            <div className={page["section-header"]} >
                <Heading rank={2}>Chapters</Heading>
                <ChapterCreation courseId={courseId} />
            </div>
            <div className={page["section-body"]}>
                <ScrollArea>
                    <div className={page["section-inner"]}>
                        <Suspense fallback={<ChapterSkeleton />}>
                            <CourseChapters courseId={courseId} chapters={chapters} />
                        </Suspense>
                    </div>
                </ScrollArea>
            </div>
        </div>
    )

}

export default SidePanelPage;