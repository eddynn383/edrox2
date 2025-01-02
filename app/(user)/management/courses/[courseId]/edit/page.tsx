import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { courseId: string } }) => {

    redirect(`/management/courses/${params.courseId}/edit/details`);

}

export default Page;