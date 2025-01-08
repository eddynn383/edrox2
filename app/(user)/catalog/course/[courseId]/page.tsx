import { Suspense } from "react";
import { Home } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, Heading, Playlist, ScrollArea } from "@/components";
import { getChaptersCountByCourseId, getChaptersSumDurationByCourseId } from "@/data/chapters";
import { getCourseById } from "@/data/courses";
import { getCourseRatingAvg, getCourseRatingCount } from "@/data/ratings";
import { CourseDetails } from "@/module/CourseViewDetails";
import { CourseHeader } from "@/module/CourseHeader";
import { CourseSummary } from "@/module/CourseSummary";
import psx from "@/styles/page.module.scss";
import page from "@/styles/page.module.css";
import msx from "@/styles/module.module.scss";
import { PageHeader } from "@/module/PageHeader";
import { SidePanelToggle } from "@/module/ActionButtons";
import { PageBody } from "@/module/PageBody";
import { ChapterSkeleton } from "@/components/Skeleton";
import CourseViewChapters from "@/module/CourseViewChapters";

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
        data: course?.chapters || [],
        count: countChapters || 0,
        duration: sumOfChaptersDuration || 0
    }

    if (!course) {
        // console.log("Course not exists")
        return null
    }

    const PageBreadcrumb = [{
        id: "b1",
        href: "/",
        title: "Home",
        children: <Home />,
        separator: "true"
    }, {
        id: "b2",
        href: "/catalog",
        title: "Catalog",
        children: "Catalog",
        separator: "true"
    }, {
        id: "b3",
        title: "Course details",
        children: "Course details",
        separator: "false"
    }]

    return (
        <>

            {/* <section className={psx["body-toolbar"]} data-page="course-details">
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
                </section> */}
            <div className={page["course-details"]} data-device="desktop">
                <div className={page.left}>
                    <PageHeader title={course.name || ""} category={course.category} rating={rating} description={course.description || ""} breadcrumb={PageBreadcrumb} device="desktop" />
                    <PageBody orientation="vertical">
                        <div className={page.inner}>
                            <Suspense fallback={<ChapterSkeleton />}>
                                <CourseViewChapters courseId={courseId} chapters={chapters} />
                            </Suspense>
                        </div>
                    </PageBody>
                </div>
                <div className={page.right}>
                    <CourseSummary course={course} metadata={[]} />
                </div>
            </div>
            <div className={page["course-details"]} data-device="mobile">
                <ScrollArea>
                    <PageHeader title={course.name || ""} category={course.category} rating={rating} description={course.description || ""} breadcrumb={PageBreadcrumb} image={course?.image || undefined} device="mobile" />
                    <PageBody orientation="vertical">
                        <Suspense fallback={<p>Loading course details...</p>}>
                            {/* <CourseDetails courseId={courseId} tutors={course?.tutors} chapters={chapters} metadata={[]} /> */}
                        </Suspense>
                    </PageBody>
                </ScrollArea>
            </div>

            {/* </ScrollArea> */}
        </>
    )
}

export default PageCourseId;