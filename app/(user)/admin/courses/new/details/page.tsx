import { getCategories } from "@/data/categories";
import CourseCreation from "@/module/CourseCreation";
import CourseCreation2 from "@/module/CourseCreation2";

const Page = async () => {
    const categories = await getCategories()
    
    return (
        <>
            <CourseCreation categories={categories} />
            {/* <CourseCreation2 /> */}
        </>
    );
}

export default Page;