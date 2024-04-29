import { BarChart, Clock, FileBadge, Heart, Home, ListChecks, Share, ShoppingCart } from "lucide-react";
import { Badge, Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, Button, Card } from "@/components";
import { CourseImage } from "../CourseImage";
import { Course } from "@/interfaces/global";
import msx from "@/styles/module.module.scss"

interface CourseSummaryProps {
    course: Course;
    edit?: boolean;
}

export const CourseSummary = ({ course, edit=false }: CourseSummaryProps) => {

    const {id, image, price} = course

    return ( 
        <Card className={msx["course-details-card"]}>
            {
                !edit &&
                <>
                
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
                        <CourseImage courseId={id} cover={image}/>
                    </div>
                    <div className={msx["course-details-card-middle"]}>
                        <div className={msx["course-details-card-price"]}>
                            <div className={msx["course-details-card-price-left"]}>
                                <h4 className={msx["course-details-card-price-new"]}>
                                    {price?.currency} {price?.discountedPrice}
                                </h4>
                                <span className={msx["course-details-card-price-old"]}>
                                    {price?.currency} {price?.fullPrice}
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
                        <div className={msx["course-details-card-actions"]}>
                            <Button variant="accent" status="default" content="icon-text" style={{"flex": "1 1 0%"}} aria-label="Add to cart"><ShoppingCart /> Add to cart</Button>
                            <Button variant="primary" shade="200" content="icon" aria-label="Add to favorites"><Heart /></Button>
                            <Button variant="primary" shade="200" content="icon" aria-label="Share"><Share /></Button>
                        </div>
                    </div>
                </>
            }
            {
                edit &&
                <>
                
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
                        <CourseImage courseId={id} cover={image} edit={true} />
                    </div>
                    <div className={msx["course-details-card-middle"]}>
                        <div className={msx["course-details-card-price"]}>
                            <div className={msx["course-details-card-price-left"]}>
                                <h4 className={msx["course-details-card-price-new"]}>
                                    {price?.currency} {price?.discountedPrice}
                                </h4>
                                <span className={msx["course-details-card-price-old"]}>
                                    {price?.currency} {price?.fullPrice}
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
                    </div>
                </>
            }
        </Card>
    );
}