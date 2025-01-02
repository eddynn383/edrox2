import { Suspense } from "react";
import { Home } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, ScrollArea } from "@/components";
import { getChaptersCountByCourseId, getChaptersSumDurationByCourseId } from "@/data/chapters";
import { getCourseById } from "@/data/courses";
import { getCourseRatingAvg, getCourseRatingCount } from "@/data/ratings";
import { CourseDetails } from "@/module/CourseDetails";
import { CourseHeader } from "@/module/CourseHeader";
import { CourseSummary } from "@/module/CourseSummary";
import psx from "@/styles/page.module.scss";
import msx from "@/styles/module.module.scss";

type Params = Promise<{ courseId: string }>

interface PageCourseIdProps {
    params: Params
}


const PageCourseId = async (props: PageCourseIdProps) => {
    const params = await props.params
    const courseId = params.courseId
    const course = await getCourseById(courseId);
    const countChapters = await getChaptersCountByCourseId(courseId)
    const sumOfChaptersDuration = await getChaptersSumDurationByCourseId(courseId)

    // console.log("countChapters: ", countChapters)
    // console.log("sumOfCourseDuration: ", sumOfChaptersDuration)

    const avgRating = await getCourseRatingAvg(courseId)
    const countRating = await getCourseRatingCount(courseId)


    const parsedAvgRating = avgRating ? parseFloat(avgRating.toString()) : 0
    const parsedCountRating = countRating ? parseFloat(countRating.toString()) : 0

    const rating = {
        score: parsedAvgRating,
        reviews: parsedCountRating
    }

    const chapters = {
        chaptersData: course?.chapters || [],
        countChapters: countChapters || 0,
        sumOfChaptersDuration: sumOfChaptersDuration || 0
    }

    if (!course) {
        // console.log("Course not exists")
        return null
    }

    return (
        <>
            <ScrollArea>
                <section className={psx["body-toolbar"]} data-page="course-details">
                    <div className={psx["body-toolbar-left"]}>
                        <Suspense fallback={<p>Loading course summary...</p>}>
                            <CourseSummary course={course} metadata={[]} />
                        </Suspense>
                    </div>
                    <div className={psx["body-toolbar-right"]}>
                        <div className={msx["course-details-header"]}>
                            <Breadcrumb className={msx["course-details-breadcrumb-desktop"]}>
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/" title="Home"><Home /></BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/catalog" title="Catalog">Catalog</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>Course details</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                            <CourseHeader course={course} rating={rating} />
                        </div>
                    </div>
                </section>
                <section className={psx["body-content"]}>
                    <div className={psx["body-content-left"]}>
                        <Suspense fallback={<p>Loading course details...</p>}>
                            <CourseDetails courseId={courseId} tutors={course?.tutors} chapters={chapters} metadata={[]} />
                        </Suspense>
                    </div>
                </section>
            </ScrollArea>
        </>
    )
}

export default PageCourseId;