
import { getAllChaptersByCourseId } from "@/data/chapters";
import { SidePanel } from "@/module/SidePanel";
import page from "@/styles/page.module.css"

type SearchParams = Promise<{ playlist: string }>

type ChapterLayoutProps = {
    children: React.ReactNode,
    params: {
        courseId: string,
        chapterId: string
    }
}

const ChapterLayout = async (props: ChapterLayoutProps) => {

    const { children, params } = props;
    // const playlist = (await searchParams).playlist === "on" ? true : false;
    const courseId = params.courseId
    const chapters = await getAllChaptersByCourseId(courseId)

    return (
        <>
            <div className={page["section-left"]}>
                {children}
            </div>
            <div className={page["section-right"]}>
                <SidePanel courseId={courseId} chapters={chapters} location="content" />
            </div>
        </>
    );
}

export default ChapterLayout;

