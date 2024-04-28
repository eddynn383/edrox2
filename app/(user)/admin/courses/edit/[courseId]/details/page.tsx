import { getAllCategories } from "@/data/categories";
import { getCourseById } from "@/data/courses";
import FormCourseDetails from "@/module/FormCourseDetails";

const Page = async ({ params }: { params: { courseId: string } }) => {

    const course = await getCourseById(params.courseId)
    const categories = await getAllCategories()

    const defaultValues = {
        description: course ? course.description : "",
        image: course ? course.image : ""
        // price: course ? course.price : 0,
        // discountPrice: course ? course.discountPrice : 0,
    }
    
    return (
        // <FormCourseDetails courseId={params.courseId} categories={categories} defaultValues={defaultValues} />
        <h1>details</h1>
    );
}

export default Page;