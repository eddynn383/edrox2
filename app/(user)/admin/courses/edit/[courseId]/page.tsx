import { Home, Plus } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, Button, Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Playlist } from "@/components";
import { getCourseById } from "@/data/courses";
import { getAllCategories } from "@/data/categories";
import { CourseImage } from "@/module/CourseImage";
import { CourseHeader } from "@/module/CourseHeader";
import { CourseSummary } from "@/module/CourseSummary";
import psx from "@/styles/page.module.scss";
import msx from "@/styles/module.module.scss";
import { ChapterCreationForm } from "@/module/ChapterCreationForm";
import { CourseDetails } from "@/module/CourseDetails";
import { getChaptersCountByCourseId, getChaptersSumDurationByCourseId } from "@/data/chapters";

interface NewCoursePageProps {
    params: {
        courseId: string;
    }
}

const Page = async ({ params }: NewCoursePageProps) => {
    const categories = await getAllCategories();
    const course = await getCourseById(params.courseId)
    const countChapters = await getChaptersCountByCourseId(params.courseId)
    const sumOfChaptersDuration = await getChaptersSumDurationByCourseId(params.courseId)

    if (!course) {
        console.log("The course does not exist")
        return false
    }

    const chapters = {
        chaptersData: course?.chapters || [],
        countChapters: countChapters || 0,
        sumOfChaptersDuration: sumOfChaptersDuration || 0
    }

    const cover = course.image ? course.image : ""

    return (
        <div className={psx["body"]}>
            <section className={psx["body-toolbar"]}>
                <div className={psx["body-toolbar-row"]}>
                    <div className={psx["body-toolbar-left"]}>
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/" title="Home"><Home /></BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/admin/courses" title="Courses">Courses</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Course Creation</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </div>
                <div className={psx["body-toolbar-row"]}>
                    <div className={psx["body-toolbar-left"]}>
                        <div style={{"display": "flex", "alignItems": "center", "gap": "12px"}}>
                            <CourseHeader course={course} categories={categories} edit={true} />
                        </div>
                    </div>
                    <div className={psx["body-toolbar-right"]}>
                        <CourseSummary course={course} edit={true} /> 
                    </div>
                </div>
            </section>
            <section className={psx["body-content"]}>
                <div className={psx["body-content-left"]}>
                    <CourseDetails courseId={params.courseId} tutors={course?.tutors} chapters={chapters} edit={true} />
                </div>
            </section>
        </div>
    )
}

export default Page;