import { Button, Form, Input, ScrollArea, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea } from "@/components";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormRowDetails, FormRowFields, FormRows } from "@/components/Form";
import { getAllCategories } from "@/data/categories";
import { editCourseById, getCourseById, getCourseSettingsByCourseId } from "@/data/courses"
import { CourseCreationFullForm } from "@/module/CourseCreationFullForm";
import { CourseSchema } from "@/schemas";
import page from "@/styles/page.module.css"

// const saveCourse = async (formData: FormData) => {
//     "use server"

//     console.log(formData)

//     const parsed = CourseSchema.safeParse({
//         id: formData.get('id'),
//         title: formData.get('title'),
//         categoryId: formData.get('category'),
//         description: formData.get('description') || "",
//     });

//     console.log(parsed)

//     if (!parsed.success) {
//         return {
//             errors: parsed.error.flatten().fieldErrors
//         }
//     }

//     const { id, ...data } = parsed.data;

//     // const form = Object.fromEntries(formData.entries())
//     console.log("my data: ", data)

//     await editCourseById(id, data)


//     // console.log(form)
// }

const Page = async ({ params }: { params: { courseId: string } }) => {
    const { courseId } = params;
    console.log(courseId)

    let course = await getCourseById(courseId);

    console.log("Course: ", course)

    let description = course?.description;
    const categories = await getAllCategories()

    const settings = await getCourseSettingsByCourseId(courseId)

    console.log("SETTIGNS IN DETAILS: ", settings)
    // if (!course) {
    //     return; 
    // }

    // const form = useForm<z.infer<typeof NewCourseSchema>>({
    //     resolver: zodResolver(NewCourseSchema),
    //     defaultValues: {
    //         title: course ? course.title : "",
    //         category: course ? course.categoryId : ""
    //     }
    // });




    return (
        <ScrollArea>
            <div className={page.inner}>
                <CourseCreationFullForm
                    course={course}
                    categories={categories}
                    settings={settings}
                />
            </div>
        </ScrollArea>
    )

}

export default Page;