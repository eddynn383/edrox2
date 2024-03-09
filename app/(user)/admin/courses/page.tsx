
import { getAllCourses } from "@/data/courses";
import { getAllCategories } from "@/data/categories";
import psx from "@/styles/page.module.scss";
import CoursesManager from "@/module/CoursesManager";

const Page = async () => {
    const courses = await getAllCourses();
    const categories = await getAllCategories();
    
    return (
        <div className={psx["body"]}>
            <section className={psx["body-content"]}>
                <div className={psx["body-content-left"]}>
                    <CoursesManager courses={courses} categories={categories}/>
                </div>
            </section>
        </div>
    );
}

export default Page;