
import { Button, Input, Textarea } from "@/components";
import { NewCourseSchema } from "@/schemas";


async function createCourse(formData: FormData) {
    "use server"
    const form = Object.fromEntries(formData.entries())

    const data1 = NewCourseSchema.safeParse(form)
    // const data2 = NewCourseSchema.parse(form)
    if (!data1.success) {
        console.log(data1.error.message)
    }
    // console.log(data2)
}

const CourseCreation2 = () => {


    // const form = useForm<z.infer<typeof NewCourseSchema>>({
    //     resolver: zodResolver(NewCourseSchema),
    //     defaultValues: {
    //         title: "",
    //         description: ""
    //         // category: "",
    //         // image: "",
    //     }
    // });

    return (
        <>
            <form className="form" action={createCourse}>
                <Input name="title" shade="200" type="text" placeholder="Eg. Introduction in front-end technologies" />
                <Textarea name="description" shade="200" placeholder="Add details here" />
                <Button variant="accent" status="default" mode="solid" size="M" type="submit">Send</Button>
            </form>
        </>
    );
}

export default CourseCreation2;