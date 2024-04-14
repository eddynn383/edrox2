
import { getAllCourses } from "@/data/courses";
import { getAllCategories } from "@/data/categories";
import psx from "@/styles/page.module.scss";
import CoursesManager from "@/module/CoursesManager";

interface CoursesPageProps {
    searchParams: { [key: string]: string }
}

const Page = async ({ searchParams }: CoursesPageProps) => {
    const courses = await getAllCourses();
    const categories = await getAllCategories();
    
    console.log("Courses Params: ", searchParams)

    return (
        <div className={psx["body"]}>
            <section className={psx["body-content"]}>
                <div className={psx["body-content-left"]}>
                    <CoursesManager courses={courses} categories={categories} device={searchParams.viewport}/>
                </div>
            </section>
        </div>
    );
}

export default Page;