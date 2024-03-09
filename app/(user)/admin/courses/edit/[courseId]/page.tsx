import { redirect } from "next/navigation";

interface NewCoursePageProps {
    params: {
        courseId: string;
        // step?: number;
    }
}

const Page = async ({ params }: NewCoursePageProps) => {
    
    redirect(`/admin/courses/edit/${params.courseId}/details`)
}

export default Page;