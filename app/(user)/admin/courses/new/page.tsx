import { Suspense } from "react";
import { Button, PageTitle } from "@/components";
import { getCategories } from "@/data/categories";
import { getCourseById } from "@/data/courses";
import { getAllChaptersByCourseId } from "@/data/chapters";
import CourseCreation from "@/module/CourseCreation";
import CourseCreationControls from "@/module/CourseCreationControls";
import { Eraser } from "lucide-react";
import sx from "@/styles/module.module.scss"

interface NewCoursePageProps {
    searchParams: {
        id: string;
        step?: number;
    }
}

const Page = async ({ searchParams }: NewCoursePageProps) => {
    const categories = await getCategories()
    const course = await getCourseById(searchParams.id)
    const chapters = await getAllChaptersByCourseId(searchParams.id)
    const step = searchParams.step

    console.log("STEP: ", step)
    console.log("Categories: ", categories)
    console.log("Course: ", course)
    console.log("Chapters: ", chapters)

    if (!categories) {
        return <p>Categories not found!</p>
    }

    if (!course) {
        return <p>No courses found</p>
    }
    
    return (
        <div className={sx["page-body"]}>
            <section className={sx["page-toolbar"]}>
                <div className={sx["page-toolbar-left"]}>
                    <PageTitle title="New course"/>
                </div>
                <div className={sx["page-toolbar-right"]}>
                    <Button shade="200" size="M"><Eraser /> Reset</Button>
                </div>
            </section>
            <section className={sx["page-content"]}>
                <CourseCreation 
                    categories={categories} 
                    chapters={chapters}
                    defaultValues={{
                        title: course ? course.title : "",
                        url: course ? course.url : "",
                        description: course ? course.description : "",
                        category: course ? course.category.name : ""
                    }}  
                />
            </section>
            <section className={sx["page-controls"]}>
                <CourseCreationControls />
            </section>
        </div>

    );
}

export default Page;