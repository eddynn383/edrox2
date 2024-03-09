import { VideoPlayer } from "@/components/Player";
import Playlist from "@/components/Playlist";
import { getPublishdedChaptersByCourseId } from "@/data/chapters";
import { getCourseById } from "@/data/courses";
import CourseDetails from "@/module/CourseDetails";
import psx from "@/styles/page.module.scss"

const Page = async ({ params }: { params: { courseId: string } }) => {
    // <span>{params.courseId}</span>

    const courseDetails = await getCourseById(params.courseId);
    const playlist = await getPublishdedChaptersByCourseId(params.courseId)

    return (
        <div className={psx["body"]}>
            <section className={psx["body-content"]}>
                <div className={psx["body-content-left"]}>
                    <CourseDetails data={courseDetails} />
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

export default Page;