import { getChapterById } from "@/data/chapters";
import msx from "@/styles/module.module.scss"
import { Button } from "@/components";
import { Heading, Type, Image as ImageIcon, Film } from "lucide-react";

interface NewCoursePageProps {
    params: {
        courseId: string;
        chapterId: string;
    }
}

// const renderInput = () => {
//     return <input type="file" />
// }

const ChapterContentActions = () => {
    return (
        <div className={msx["chapters-content-actions"]}>
            <Button content="icon"><Heading /></Button>
            <Button content="icon"><Type /></Button>
            <Button content="icon">
                <ImageIcon />
            </Button>
            <Button content="icon"><Film /></Button>
        </div>
    )
}

const Page = async ({ params }: NewCoursePageProps) => {
    console.log("COURSE ID: ", params.courseId)
    console.log("CHAPTER ID: ", params.chapterId)
    
    // const chapters = await getAllChaptersByCourseId(params.courseId)
    const chapter = await getChapterById(params.chapterId)

    return (
        <div className={msx["chapters-content"]}>
            <div className={msx["chapters-content-details"]}>
                <h2>{chapter?.title}</h2>   
                <p>{chapter?.description}</p>
            </div>
            <ChapterContentActions />
        </div>

    );
}

export default Page;