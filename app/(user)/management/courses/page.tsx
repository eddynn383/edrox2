
import { Filter, Home } from "lucide-react";
import { Suspense } from "react";
import { getAllCourses } from "@/data/courses";
import { getAllCategories } from "@/data/categories";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, PageTitle, ScrollArea } from "@/components";
import { CourseCreation } from "@/module/CourseCreation";
import { CoursesManager } from "@/module/CoursesManager";
import psx from "@/styles/page.module.scss";
import page from "@/styles/page.module.css"
import { PageHeader } from "@/module/PageHeader";
import { PageBody } from "@/module/PageBody";

type SearchParams = Promise<{ [key: string]: string }>

interface CoursesPageProps {
    searchParams: SearchParams
}

const Page = async (props: CoursesPageProps) => {
    const courses = await getAllCourses();
    const categories = await getAllCategories();
    const searchParams = await props.searchParams


    console.log("courses: ", courses)
    const PageTitle = "Course Management"

    const PageDescription = "Create, manage, and publish your courses here."


    const PageBreadcrumb = [{
        id: "b1",
        href: "/",
        title: "Home",
        children: <Home />,
        separator: "true"
    }, {
        id: "b2",
        title: "Admin",
        children: "Admin",
        separator: "false"
    }]

    const PageActions = [{
        id: "a1",
        element: <CourseCreation categories={categories} />
    }]

    return (
        <>
            <PageHeader title={PageTitle} description={PageDescription} breadcrumb={PageBreadcrumb} actions={PageActions} />
            <PageBody>
                <div className={psx["body-content-left"]}>
                    <Suspense fallback={<p>Loading courses table...</p>}>
                        <CoursesManager courses={courses} categories={categories} device={searchParams.viewport} />
                    </Suspense>
                </div>
            </PageBody>
        </>
    );
}

export default Page;