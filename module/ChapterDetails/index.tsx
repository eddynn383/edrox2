import { VideoPlayer } from "@/components/Player";
import msx from "@/styles/module.module.scss";

interface ChapterDetailsProps {
    data: any;
}

const ChapterDetails = ({ data }: ChapterDetailsProps) => {
    return ( 
        <div className={msx["chapter-details-body"]}>
            <VideoPlayer playbackId={""} courseId={data.courseId} chapterId={data.chapterId} isLocked={false} completeOnEnd={false} title={data.title} />
            <h2>{data?.title}</h2>
            <p>{data?.description}</p>
        </div>
    );
}
 
export { ChapterDetails };