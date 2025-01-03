
import { getAllChaptersByCourseId } from "@/data/chapters";
import { SidePanel } from "@/module/SidePanel";

type SearchParams = Promise<{ playlist: string }>

interface SidePanelPageProps {
    params: {
        courseId: string,
        chapterId: string
    },
    searchParams: SearchParams
}

export default async function SidePanelPage(props: SidePanelPageProps) {
    const { params, searchParams } = props;
    const playlist = (await searchParams).playlist === "on" ? true : false;
    const courseId = params.courseId
    const chapters = await getAllChaptersByCourseId(courseId)
    console.log("Published chapters: ", chapters)

    return (
        <SidePanel courseId={courseId} chapters={chapters} show={playlist} />
    )

}