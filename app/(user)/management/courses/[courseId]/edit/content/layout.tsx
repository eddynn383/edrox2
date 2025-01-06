
import { getAllChaptersByCourseId } from "@/data/chapters";
import { SidePanel } from "@/module/SidePanel";
import page from "@/styles/page.module.css"
import { headers } from "next/headers";

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

    const { children, sidepanel, params } = props;
    // const playlist = (await searchParams).playlist === "on" ? true : false;
    const courseId = params.courseId
    const chapters = await getAllChaptersByCourseId(courseId)

    const headersList = headers()
    const referer = headersList.get('referer')

    console.log("referer::", referer)

    return (
        <>
            <div className={page["section-left"]}>
                {children}
            </div>
            <div className={page["section-right"]}>
                {/* {sidepanel} */}
                <SidePanel courseId={courseId} chapters={chapters} location="content" />
            </div>
        </>
    );
}

