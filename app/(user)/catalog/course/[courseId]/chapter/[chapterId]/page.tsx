import { VideoPlayer } from "@/components/Player";
import Playlist from "@/components/Playlist";
import { getPublishdedChaptersByCourseId } from "@/data/chapters";
import { getCourseById } from "@/data/courses";
import { ChapterDetails } from "@/module/ChapterDetails";
import psx from "@/styles/page.module.scss"

interface PageChapterIdProps {
    params: { 
        courseId: string,
        chapterId: string
    }
}


const PageChapterId = async ({ params }: PageChapterIdProps) => {
    // <span>{params.courseId}</span>

    const courseDetails = await getCourseById(params.courseId);
    const playlist = await getPublishdedChaptersByCourseId(params.courseId)

    return (
        <div className={psx["body"]}>
            <section className={psx["body-content"]}>
                <div className={psx["body-content-left"]}>
                    <ChapterDetails data={courseDetails} />
                </div>
                <div className={psx["body-content-right"]}>
                    <div className={psx["player"]}>
                        <Playlist data={playlist} />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default PageChapterId;