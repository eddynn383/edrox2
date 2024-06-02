import { setContent } from "@/data/content";
import { ContentForm } from "../ContentForm";
import msx from "@/styles/module.module.scss";

interface ChapterDetailsProps {
    chapterId: string;
    courseId: string;
    data: any;
    edit: boolean;
}

const ChapterDetails = async ({ data, courseId, chapterId, edit=false }: ChapterDetailsProps) => {

    return ( 
        <div className={msx["chapter-details-body"]}>
            <ContentForm courseId={courseId} chapterId={chapterId} currentData={data} edit={edit} />
        </div>
    );
}
 
export { ChapterDetails };