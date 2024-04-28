import { getAllCategories } from "@/data/categories";
import { getCourseById } from "@/data/courses";
import EditCourseForm from "@/module/EditCourseForm";
import { redirect } from "next/navigation";

interface NewCoursePageProps {
    params: {
        courseId: string;
        // step?: number;
    }
}

const Page = async ({ params }: NewCoursePageProps) => {
    
    redirect(`/admin/courses/edit/${params.courseId}/details`)
    // const course = await getCourseById(params.courseId)
    // const categories = await getAllCategories()

    // const defaultValues = {
    //     description: course ? course.description : "",
    //     // price: course ? course.price : 0,
    //     // discountPrice: course ? course.discountPrice : 0,
    // }
    // return (
    //     <EditCourseForm courseId={params.courseId} categories={categories} defaultValues={defaultValues}/>
    // )
}

export default Page;