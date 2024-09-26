
import { Home } from "lucide-react";
import { Suspense } from "react";
import { getAllCourses } from "@/data/courses";
import { getAllCategories } from "@/data/categories";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, PageTitle } from "@/components";
import { CourseCreation } from "@/module/CourseCreation";
import { CoursesManager } from "@/module/CoursesManager";
import psx from "@/styles/page.module.scss";

interface CoursesPageProps {
    searchParams: { [key: string]: string }
}

const Page = async ({ searchParams }: CoursesPageProps) => {
    const courses = await getAllCourses();
    const categories = await getAllCategories();

    return (
        <>
            <section className={psx["body-toolbar"]}>
                <div className={psx["body-toolbar-row"]}>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/" title="Home"><Home /></BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Admin</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <div className={psx["body-toolbar-row"]}>
                    <div className={psx["body-toolbar-left"]}>
                        <PageTitle title="Courses Manager" />
                    </div>
                    <div className={psx["body-toolbar-right"]}>
                        <CourseCreation categories={categories} />
                    </div>
                </div>
            </section>
            <section className={psx["body-content"]}>
                <div className={psx["body-content-left"]}>
                    <Suspense fallback={<p>Loading courses table...</p>}>
                        <CoursesManager courses={courses} categories={categories} device={searchParams.viewport}/>
                    </Suspense>
                </div>
            </section>
        </>
    );
}

export default Page;