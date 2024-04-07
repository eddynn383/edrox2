import { Badge, Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, Button, Card, Cover, PageTitle, Rating, ScrollArea } from "@/components";
import { getChaptersCountByCourseId, getChaptersSumDurationByCourseId, getPublishdedChaptersByCourseId } from "@/data/chapters";
import { getCourseById } from "@/data/courses";
import { getCourseRatingAvg, getCourseRatingCount } from "@/data/ratings";
import { CourseDetails } from "@/module/CourseDetails";
import { BarChart, Clock, FileBadge, Heart, Home, ListChecks, Share, ShoppingCart } from "lucide-react";
import psx from "@/styles/page.module.scss"
import msx from "@/styles/module.module.scss"
// import useScreenSize from "@/hooks/useScreenSize";

interface PageCourseIdProps {
    params: { 
        courseId: string,
    }
}


const PageCourseId = async ({ params }: PageCourseIdProps) => {
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

    const chaptersData = {
        chapters: course?.chapters || [],
        countChapters: countChapters || 0,
        sumOfChaptersDuration: sumOfChaptersDuration || 0
    }

    // const deviceScreen = useScreenSize()
    // const deviceWidth = deviceScreen.width

    // const mobile = deviceWidth === 0 && device === "mobile" ? true : deviceWidth > 0 && deviceWidth < 768 ? true : false
    // const tablet = deviceWidth === 0 && device === "mobile" ? true : deviceWidth > 767 && deviceWidth < 1025 ? true : false

    console.log("chapters: ", chaptersData)

    if (!course) {
        console.log("Course not exists")
        return null
    }   

    return (
        <div className={psx["body"]}>
            <ScrollArea>
                <section className={psx["body-toolbar"]} data-page="course-details">
                    <div className={psx["body-toolbar-left"]}>
                        <div className={msx["course-details-card"]}>
                            <div className={msx["course-details-card-top"]}>
                                <Breadcrumb className={msx["course-details-breadcrumb-mobile"]}>
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
                                <Cover src={course.image} alt={course.title} width={388} height={236} />
                            </div>
                            <div className={msx["course-details-card-middle"]}>
                                <div className={msx["course-details-card-price"]}>
                                    <div className={msx["course-details-card-price-left"]}>
                                        <h4 className={msx["course-details-card-price-new"]}>
                                            {course.price?.currency} {course.price?.discountedPrice}
                                        </h4>
                                        <span className={msx["course-details-card-price-old"]}>
                                            {course.price?.currency} {course.price?.fullPrice}
                                        </span>
                                    </div>
                                    <div className={msx["course-details-card-price-right"]}>
                                        <Badge size="M" mode="text" status="fail">Weekly deals!</Badge>
                                    </div>
                                </div>
                                <div className={msx["course-details-card-metadata"]}>
                                    <ul className={msx["course-details-card-metadata-list"]}>
                                        <li className={msx["course-details-card-metadata-list-item"]}>
                                            <div className={msx["course-details-card-metadata-left"]}>
                                                <BarChart />
                                            </div>
                                            <div className={msx["course-details-card-metadata-right"]}>
                                                <span className={msx["course-details-card-metadata-label"]}>Skill</span>
                                                <span className={msx["course-details-card-metadata-value"]}>Advanced</span>
                                            </div>
                                        </li>
                                        <li className={msx["course-details-card-metadata-list-item"]}>
                                            <div className={msx["course-details-card-metadata-left"]}>
                                                <Clock />
                                            </div>
                                            <div className={msx["course-details-card-metadata-right"]}>
                                                <span className={msx["course-details-card-metadata-label"]}>Duration</span>
                                                <span className={msx["course-details-card-metadata-value"]}>15 Hours</span>
                                            </div>
                                        </li>
                                        <li className={msx["course-details-card-metadata-list-item"]}>
                                            <div className={msx["course-details-card-metadata-left"]}>
                                                <FileBadge />
                                            </div>
                                            <div className={msx["course-details-card-metadata-right"]}>
                                                <span className={msx["course-details-card-metadata-label"]}>Certificate</span>
                                                <span className={msx["course-details-card-metadata-value"]}>Digital</span>
                                            </div>
                                        </li>
                                        <li className={msx["course-details-card-metadata-list-item"]}>
                                            <div className={msx["course-details-card-metadata-left"]}>
                                                <ListChecks />
                                            </div>
                                            <div className={msx["course-details-card-metadata-right"]}>
                                                <span className={msx["course-details-card-metadata-label"]}>Prerequisites</span>
                                                <span className={msx["course-details-card-metadata-value"]}>None</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className={msx["course-details-card-bottom"]}>
                                <Button variant="accent" status="default" content="icon-text" style={{"flex": "1 1 0%"}}><ShoppingCart /> Add to cart</Button>
                                <Button variant="primary" shade="200" content="icon"><Heart /></Button>
                                <Button variant="primary" shade="200" content="icon"><Share /></Button>
                            </div>
                        </div>
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
                            <PageTitle title={course?.title}/>
                            <div className={msx["course-details-header-metadata"]}>
                                <Badge size="M">{course.category.name}</Badge>
                                <Rating score={parsedAvgRating} reviews={parsedCountRating} minified={true} />
                            </div>
                            <div>
                                <p>{course.description}</p>
                            </div>
                        </div>

                    </div>
                </section>
                <section className={psx["body-content"]}>
                    <div className={psx["body-content-left"]}>
                        <CourseDetails tutors={course?.tutors} chaptersData={chaptersData} />
                    </div>
                </section>
            </ScrollArea>
        </div>
    )
}

export default PageCourseId;