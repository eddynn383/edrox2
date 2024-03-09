import { Button, PageTitle, ScrollArea } from "@/components";
import { getAllChaptersByCourseId } from "@/data/chapters";
import ChapterCreation from "@/module/ChapterCreation";
import CourseCreationControls from "@/module/CourseCreationControls";
import psx from "@/styles/page.module.scss"
import { Eraser } from "lucide-react";


interface ContentLayoutProps { 
    children: React.ReactNode;
    params: {
        courseId: string;
        chapterId: string;
    };
}

const ContentLayout = async ({ children, params }: ContentLayoutProps) => {
    const chapters = await getAllChaptersByCourseId(params.courseId)

    return (
        <>
            <div className={psx["body-content-left"]}>
                <ScrollArea>
                    {children}
                </ScrollArea>
            </div>
            <div className={psx["body-content-right"]}>
                <ScrollArea>
                    <ChapterCreation chapters={chapters} courseId={params.courseId} />
                </ScrollArea>
            </div>
        </>
    )
}

export default ContentLayout;