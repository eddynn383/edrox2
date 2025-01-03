import { ContentForm } from "../ContentForm";
import msx from "@/styles/module.module.scss";

interface ChapterDetailsProps {
    chapterId: string;
    courseId: string;
    data: any;
    edit: boolean;
}

const ChapterDetails = async ({ data, courseId, chapterId, edit = false }: ChapterDetailsProps) => {

    return (
        <div className={msx["chapter-details-body"]}>
            <ContentForm courseId={courseId} chapterId={chapterId} currentChapter={data} edit={edit} chapters={undefined} children={undefined} />
        </div>
    );
}

export { ChapterDetails };