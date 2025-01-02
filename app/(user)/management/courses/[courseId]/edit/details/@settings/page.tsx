import { ScrollArea, Switch } from "@/components";
import { getCourseSettingsByCourseId } from "@/data/courses";
import { CourseSettingsForm } from "@/module/CourseSettingsForm";
import page from "@/styles/page.module.css";

const Page = async ({ params }: { params: { courseId: string } }) => {
    const { courseId } = params


    console.log("courseSettings Course ID: ", courseId)

    const courseSettings = await getCourseSettingsByCourseId(courseId)

    console.log("courseSettings: ", courseSettings)

    if (!courseSettings) {
        return <p>Settings are not defined!</p>
    }

    return (
        <ScrollArea>
            <div className={page.inner}>
                <CourseSettingsForm id={courseSettings.id} settings={courseSettings} />
            </div>
        </ScrollArea>
    )
}

export default Page;