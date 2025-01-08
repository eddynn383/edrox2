import { getCourseById } from "@/data/courses";
import { redirect, notFound } from "next/navigation";

const Page = async ({ params }: { params: { courseId: string } }) => {

    const course = await getCourseById(params.courseId)

    if (!course) {
        notFound();
    }

    redirect(`/management/courses/${params.courseId}/edit/details`);

}

export default Page;