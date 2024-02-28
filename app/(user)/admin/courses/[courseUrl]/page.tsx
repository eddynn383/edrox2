import { getCourseById } from "@/data/courses";

const Page = async ({ params }: { params: { courseId: string } }) => {
    // <span>{params.courseId}</span>

    const courseDetails = await getCourseById(params.courseId);
    // const playlist = await getPublishdedChaptersByCourseId(params.courseId)

    console.log(courseDetails)

    return (
        <div>
            {params.courseId}
        </div>
        // <div className={sx["page-body"]}>
        //     <section className={sx["page-content"]}>
        //         <div className={sx["course-details"]}>
        //             <div className={sx["course-details-left"]}>
        //                 <VideoPlayer playbackId={""} courseId={""} chapterId={""} isLocked={false} completeOnEnd={false} title={""} />
        //                 <h2>{courseDetails?.title}</h2>
        //                 <p>{courseDetails?.description}</p>
        //             </div>
        //             <div className={sx["course-details-right"]}>
        //                 <div className={sx["player"]}>
        //                     <Playlist data={playlist} />
        //                 </div>
        //             </div>
        //         </div>
        //     </section>
        // </div>
    )
}

export default Page;