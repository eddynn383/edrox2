import { Button, Form, Input, ScrollArea, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea } from "@/components";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormRowDetails, FormRowFields, FormRows } from "@/components/Form";
import { getAllCategories } from "@/data/categories";
import { editCourseById, getCourseById, getCourseSettingsByCourseId } from "@/data/courses"
import { CourseCreationFullForm } from "@/module/CourseCreationFullForm";
import { CourseCreationFullForm2 } from "@/module/CourseCreationFullForm2";
import { CourseSchema } from "@/schemas";
import page from "@/styles/page.module.css"

interface CourseDetailsPage {
    params: { courseId: string }
}

export default async function CourseDetailsPage({ params }: CourseDetailsPage) {
    const { courseId } = params;
    // console.log(courseId)

    const course = await getCourseById(courseId);

    // console.log("Course: ", course)

    // let description = course?.description;
    const categories = await getAllCategories()

    const settings = await getCourseSettingsByCourseId(courseId)

    // console.log("SETTIGNS IN DETAILS: ", settings)

    return (
        <ScrollArea>
            <div className={page.inner}>
                {/* <CourseCreationFullForm
                    course={course}
                    categories={categories}
                    settings={settings}
                /> */}
                <CourseCreationFullForm2
                    course={course}
                    categories={categories}
                    settings={settings}
                />
            </div>
        </ScrollArea>
    )

}