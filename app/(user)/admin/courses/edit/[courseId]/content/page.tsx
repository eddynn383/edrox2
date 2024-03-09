import { getAllChaptersByCourseId } from "@/data/chapters";
import msx from "@/styles/module.module.scss"

const Page = async ({ params }: { params: { courseId: string } }) => {
    
    return (
        <div className={msx["chapters-content"]}>
            <p>Select a course to continuee</p>
        </div>
    );
}

export default Page;