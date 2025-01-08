import { Button } from "@/components";
import { getAllChaptersByCourseId } from "@/data/chapters";
import { ChapterSelection } from "@/module/ChapterSelection";
import { PanelRightOpen } from "lucide-react";
import { CourseChapterCreation } from "@/module/CourseChapterCreation";
import page from "@/styles/page.module.css"

interface NewChapterPageProps {
    params: {
        courseId: string;
        chapterId: string;
    },
    searchParams: { [key: string]: string }
}

export default async function ContentPage({ params, searchParams }: NewChapterPageProps) {
    const courseId = params.courseId
    const chapters = await getAllChaptersByCourseId(courseId)
    // console.log("Published chapters: ", chapters)

    return (
        <div className={page["courses-content"]}>
            {/* <div className={page["section-header"]}>
                <ChapterSelection courseId={courseId} chapters={chapters} />
                <Button content="icon" size="S"><PanelRightOpen /></Button>
            </div> */}
            <div className={page["section-body"]}>
                <div className={page.empty}>
                    <p>Choose the following option to create content</p>
                    <div className={page["empty-actions"]}>
                        <CourseChapterCreation courseId={courseId}>
                            <Button variant="accent" status="brand">Create Chapter</Button>
                        </CourseChapterCreation>
                        <Button>Create Quiz</Button>
                    </div>
                </div>
            </div>
        </div>
    )

}