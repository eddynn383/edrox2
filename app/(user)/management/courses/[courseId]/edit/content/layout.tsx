
import { getAllChaptersByCourseId } from "@/data/chapters";
import page from "@/styles/page.module.css"

type SearchParams = Promise<{ playlist: string }>

interface ChapterLayoutProps {
    children: React.ReactNode,
    sidepanel: React.ReactNode,
    params: {
        courseId: string,
        chapterId: string
    }
}


export default async function ChapterLayout(props: ChapterLayoutProps) {

    const { children, sidepanel } = props;

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

