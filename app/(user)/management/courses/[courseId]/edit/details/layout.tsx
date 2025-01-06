import { getAllChaptersByCourseId } from "@/data/chapters";
import { SidePanel } from "@/module/SidePanel";
import { getCourseSettingsByCourseId } from "@/data/courses";
import page from "@/styles/page.module.css"

interface DetailsEditLayoutPropsp {
    children: React.ReactNode,
    settings: React.ReactNode,
    params: {
        courseId: string
    }
}

const DetailsEditLayout = async ({ children, settings, params }: DetailsEditLayoutPropsp) => {
    const courseId = params.courseId
    const chapters = await getAllChaptersByCourseId(courseId)
    const courseSettings = await getCourseSettingsByCourseId(courseId)
    return (
        <>
            <div className={page["section-left"]}>
                <div className={page["section-body"]}>
                    {children}
                </div>
            </div>
            <div className={page["section-right"]}>
                {/* {settings} */}
                <SidePanel courseId={courseId} chapters={chapters} courseSettings={courseSettings} location="details" />
            </div>
        </>
    );
}

export default DetailsEditLayout;

