import { getAllChaptersByCourseId, getChapterById } from "@/data/chapters";
import { ContentForm } from "@/module/ContentForm";

interface ChapterIdLayoutProps {
    children: React.ReactNode,
    params: {
        courseId: string,
        chapterId: string
    }
}

const ChapterIdLayout = async ({ children, params }: ChapterIdLayoutProps) => {

    const courseId = params.courseId
    const chapterId = params.chapterId
    const chapters = await getAllChaptersByCourseId(courseId)
    const chapter = await getChapterById(chapterId)


    if (!chapter) {
        return <p>This course doesn&apos;t exists</p>
    }

    return (
        <ContentForm courseId={courseId} chapterId={chapterId} chapters={chapters} currentChapter={chapter} edit={false}>
            {children}
        </ContentForm>
    );
}

export default ChapterIdLayout;