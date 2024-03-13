import { Badge, Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, Button, Card, Cover, PageTitle, Rating, ScrollArea } from "@/components";
import { getPublishdedChaptersByCourseId } from "@/data/chapters";
import { getCourseById } from "@/data/courses";
import { getCourseRatingAvg, getCourseRatingCount } from "@/data/ratings";
import { CourseDetails } from "@/module/CourseDetails";
import { BarChart, Clock, FileBadge, Heart, Home, ListChecks, Share, ShoppingCart } from "lucide-react";
import psx from "@/styles/page.module.scss"
import msx from "@/styles/module.module.scss"

interface PageCourseIdProps {
    params: { 
        courseId: string,
    }
}


const PageCourseId = async ({ params }: PageCourseIdProps) => {
    const courseId = params.courseId
    const course = await getCourseById(courseId);
    const avgRating = await getCourseRatingAvg(courseId)
    const countRating = await getCourseRatingCount(courseId)


    const parsedAvgRating = avgRating ? parseFloat(avgRating.toString()) : 0
    const parsedCountRating = countRating ? parseFloat(countRating.toString()) : 0

    if (!course) {
        console.log("Course not exists")
        return null
    }   

    // console.log("COURSE: ", course)
    // console.log("AVG rating: " + avgRating)
    // console.log("Count rating: " + countRating)
    return (
        <div className={psx["body"]}>
            <ScrollArea>
                <section className={psx["body-toolbar"]}>
                    <div className={psx["body-toolbar-left"]}>
                        <div className={msx["course-details-header"]}>
                            <Breadcrumb>
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
                                <Badge size="L">{course.category.name}</Badge>
                                <Rating score={parsedAvgRating} reviews={parsedCountRating} />
                            </div>
                            <div>
                                <p>{course.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className={psx["body-toolbar-right"]}>
                        <div className={msx["course-details-card"]}>
                            <div className={msx["course-details-card-top"]}>
                                <Cover src={course.image} alt={course.title} width={388} height={236} />
                            </div>
                            <div className={msx["course-details-card-middle"]}>
                                <div className={msx["course-details-card-price"]}>
                                    <div className={msx["course-details-card-price-left"]}>
                                        <h3 className={msx["course-details-card-price-new"]}>
                                            {course.price?.currency} {course.price?.discountedPrice}
                                        </h3>
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
                </section>
                <section className={psx["body-content"]}>
                    <div className={psx["body-content-left"]}>
                        <CourseDetails tutors={course?.tutors} chapters={course.chapters} />
                    </div>
                </section>
            </ScrollArea>
        </div>
    )
}

export default PageCourseId;