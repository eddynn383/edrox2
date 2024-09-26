"use server"

import { BarChart, Clock, FileBadge, Heart, Home, ListChecks, PlayCircle, Share, ShoppingCart } from "lucide-react";
import { Badge, Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, Button, Card } from "@/components";
import { CourseImage } from "../CourseImage";
import { Course, Metadata } from "@/interfaces/global";
import msx from "@/styles/module.module.scss"
import { CourseEnrolment } from "../CourseEnrolment";
import { getEnrolment, setEnrolment } from "@/data/enrolment";
import courseSx from "./course-summary.module.css"
import { MetadataList } from "../MetadataList";
import { MetadataModal } from "../MetadataModal";

interface CourseSummaryProps {
    course: Course;
    metadata: Metadata[];
    edit?: boolean;
}

export const CourseSummary = async ({ course, metadata, edit=false }: CourseSummaryProps) => {
    console.log("course", course)
    
    const {id, image, price} = course
    const alreadyEnrolled = await getEnrolment(id)

    return ( 
        <Card className={courseSx.container}>
            {
                !edit &&
                <>
                
                    <div className={courseSx.top}>
                        <Breadcrumb className={courseSx.breadcrumb} data-device="mobile">
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
                        <CourseImage courseId={id} cover={image}/>
                    </div>
                    <div className={courseSx.middle}>
                        <div className={courseSx.price}>
                            <div className={courseSx.left}>
                                <h4 className={courseSx.new}>
                                    {price?.currency} {price?.discountedPrice}
                                </h4>
                                <span className={courseSx.old}>
                                    {price?.currency} {price?.fullPrice}
                                </span>
                            </div>
                            <div className={courseSx.right}>
                                <Badge size="M" mode="text" status="fail">Weekly deals!</Badge>
                            </div>
                        </div>
                        <div className={courseSx.metadata} data-state="view">
                            <div className={courseSx.bottom}>
                                {
                                    metadata && 
                                    <MetadataList data={metadata} edit={edit} />
                                }
                            </div>
                        </div>
                    </div>
                    <div className={courseSx.bottom}>
                        <div className={courseSx.actions}>
                            {
                                price && <Button variant="accent" status="default" content="icon-text" style={{"flex": "1 1 0%"}} aria-label="Add to cart"><ShoppingCart /> Add to cart</Button>

                            }
                            {
                                !price && <CourseEnrolment courseId={id} isEnrolled={!!alreadyEnrolled} />
                            }
                            <Button variant="primary" shade="200" content="icon" aria-label="Add to favorites"><Heart /></Button>
                            <Button variant="primary" shade="200" content="icon" aria-label="Share"><Share /></Button>
                        </div>
                    </div>
                </>
            }
            {
                edit &&
                <>
                
                    <div className={courseSx.top}>
                        <Breadcrumb className={courseSx.breadcrumb} data-device="mobile">
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
                        <CourseImage courseId={id} cover={image} edit={true} />
                    </div>
                    <div className={courseSx.middle}>
                        <div className={courseSx.price}>
                            <div className={courseSx.left}>
                                <h4 className={courseSx.new}>
                                    {price?.currency} {price?.discountedPrice}
                                </h4>
                                <span className={courseSx.old}>
                                    {price?.currency} {price?.fullPrice}
                                </span>
                            </div>
                            <div className={courseSx.right}>
                                <Badge size="M" mode="text" status="fail">Weekly deals!</Badge>
                            </div>
                        </div>
                        <div className={courseSx.metadata}>
                            <div className={courseSx.top}>
                                <h4 className={courseSx.title}>Metadata</h4>
                                <MetadataModal id={id} />
                            </div>
                            <div className={courseSx.bottom}>
                                {
                                    metadata && 
                                    <MetadataList data={metadata} edit={edit} />
                                }
                            </div>
                        </div>
                    </div>
                    {/* <div className={courseSx.bottom}>
                    </div> */}
                </>
            }
        </Card>
    );
}