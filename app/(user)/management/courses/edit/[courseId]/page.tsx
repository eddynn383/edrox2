import { Home, Plus } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, ScrollArea } from "@/components";
import { getCourseById } from "@/data/courses";
import { getAllCategories } from "@/data/categories";
import { CourseHeader } from "@/module/CourseHeader";
import { CourseSummary } from "@/module/CourseSummary";
import { CourseDetails } from "@/module/CourseDetails";
import { getAllChaptersByCourseId, getChaptersCountByCourseId, getChaptersSumDurationByCourseId } from "@/data/chapters";
import courseSx from "./course.module.css"
import { getMetadata } from "@/data/metadata";

interface NewCoursePageProps {
    params: {
        courseId: string;
    }
}

const Page = async ({ params }: NewCoursePageProps) => {
    const categories = await getAllCategories();
    const course = await getCourseById(params.courseId)
    const metadata = await getMetadata(params.courseId)
    const courseChapters = await getAllChaptersByCourseId(params.courseId)
    const countChapters = await getChaptersCountByCourseId(params.courseId)
    const sumOfChaptersDuration = await getChaptersSumDurationByCourseId(params.courseId)

    if (!course) {
        console.log("The course does not exist")
        return false
    }

    const chapters = {
        chaptersData: courseChapters || [],
        countChapters: countChapters || 0,
        sumOfChaptersDuration: sumOfChaptersDuration || 0
    }

    const cover = course.image ? course.image : ""

    return (
        <>
            <section className={courseSx.toolbar}>
                <div className={courseSx["toolbar-row"]}>
                    <div className={courseSx["toolbar-left"]}>
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/" title="Home"><Home /></BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/management/courses" title="Courses">Courses Manager</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Edit Course</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </div>
                <div className={courseSx["toolbar-row"]}>
                    <div className={courseSx["toolbar-left"]}>
                        <CourseHeader course={course} categories={categories} edit={true} />
                    </div>
                    <div className={courseSx["toolbar-right"]}>
                        <CourseSummary course={course} metadata={metadata} edit={true} />
                    </div>
                </div>
            </section>
            <ScrollArea>
                <CourseDetails courseId={params.courseId} tutors={course?.tutors} chapters={chapters} metadata={metadata} edit={true} />
            </ScrollArea>
        </>
    )
}

export default Page;