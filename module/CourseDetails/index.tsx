import { VideoPlayer } from "@/components/Player";
import msx from "@/styles/module.module.scss";

interface CourseDetailsProps {
    data: any;
}

const CourseDetails = ({ data }: CourseDetailsProps) => {
    return ( 
        <div className={msx["course-details"]}>
            <VideoPlayer playbackId={""} courseId={data.courseId} chapterId={data.chapterId} isLocked={false} completeOnEnd={false} title={data.title} />
            <h2>{data?.title}</h2>
            <p>{data?.description}</p>
        </div>
    );
}
 
export default CourseDetails;