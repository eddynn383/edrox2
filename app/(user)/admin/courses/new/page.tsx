import { Suspense } from "react";
import { Button, PageTitle } from "@/components";
import { getCategories } from "@/data/categories";
import { getCourseById } from "@/data/courses";
import CourseCreation from "@/module/CourseCreation";
import CourseCreationControls from "@/module/CourseCreationControls";
import { useSearchParams } from "next/navigation";
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
    const courseId = await getCourseById(searchParams.id)

    const step = searchParams.step

    console.log("STEP: ", step)

    if (!categories) {
        return <p>Not categories found!</p>
    }

    if (!courseId) {
        return <p>No courses id found</p>
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
                {
                    // step === 1 && 
                    <CourseCreation categories={categories} defaultValues={{
                        title: courseId ? courseId.title : "",
                        url: courseId ? courseId.url : "",
                        description: courseId ? courseId.description : "",
                        category: courseId ? courseId.category.name : ""
                    }}  />
                }
                {
                    step === 2 && <h2>Course Content</h2>
                }
                {
                    step === 3 && <h2>Course Rewards</h2>
                }
                {
                    step === 4 && <h2>Course Participants</h2>
                }
            </section>
            <section className={sx["page-controls"]}>
                <CourseCreationControls />
            </section>
        </div>

    );
}

export default Page;