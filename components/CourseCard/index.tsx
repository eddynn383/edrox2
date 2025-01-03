"use server"

// import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../Card"
import { getChaptersCountByCourseId, getChaptersSumDurationByCourseId } from "@/data/chapters"
import { Badge, Button, Cover, Label, Progress, Rating, Text } from "@/components"
import { getCourseRatingAvg } from "@/data/ratings"
import { CourseCardProps } from "./interface"
import { BookOpen, Clock, Layers, Play, ShoppingCart } from "lucide-react"
import csx from "@/styles/component.module.scss"
import card from "./card.module.css"
import { convertDuration } from "@/lib/utils"
import { getEnrolment } from "@/data/enrolment"
import { getProgress } from "@/data/progress"
import { Anchor as Link } from "../Link"

const CourseCard = async ({ cardId, data, detailsURL = "/catalog/course", view = "grid", mode = "solid", variant = "primary", shade = "100" }: CourseCardProps) => {
    const { image } = data
    const coverURL = image?.url ? image.url : "https://images.pexels.com/photos/2457284/pexels-photo-2457284.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"

    const avgRating = await getCourseRatingAvg(data.id)
    const totalChapters = await getChaptersCountByCourseId(data.id)
    const chaptersDuration = await getChaptersSumDurationByCourseId(data.id)
    const alreadyEnrolled = await getEnrolment(data.id)
    const progress = await getProgress(data.id)


    console.log("is already enrolled: ", alreadyEnrolled)
    // const duration = chaptersDuration ? chaptersDuration.duration : 0
    const totalDuration = convertDuration(chaptersDuration || 0)
    // console.log("Duration: ", chaptersDuration)
    // console.log("Chapters: ", totalChapters)
    console.log("Course data: ", data)
    console.log("avgRating data: ", avgRating)

    return (
        <Card className={card.container} mode={mode} variant={variant} shade={shade} view={view} padding="0" radius="200">
            <Link href={`${detailsURL}/${data.id}`} >
                <CardHeader className={card.header}>
                    <Cover className={card.cover} src={coverURL} alt={data.title} width={250} height={100} />
                </CardHeader>
                <CardContent className={card.content} padding="300" gap="200">
                    <div className={card["content-top"]}>
                        {data.category && <Badge>{data.category.name}</Badge>}
                        <Rating containerId={cardId} minified={true} score={avgRating || 0.0} showRatings={false} />
                    </div>
                    <div className={card["content-bottom"]}>
                        <div className={card.info}>
                            <CardTitle rank={2}>{data?.title}</CardTitle>
                            <CardDescription truncated>{data?.description}</CardDescription>
                        </div>
                        <ul className={card["metadata-list"]}>
                            <li className={card["metadata-list-item"]}>
                                <Layers />
                                <Text size="S">{totalChapters} Chapters</Text>
                            </li>
                            <li className={card["metadata-list-item"]}>
                                <Clock />
                                <Text size="S">{totalDuration}</Text>
                            </li>
                        </ul>
                    </div>

                </CardContent>
                {
                    !alreadyEnrolled &&
                    <CardFooter className={card.footer} padding="300" gap="200">
                        <div className={card["footer-left"]}>
                            {
                                data.price &&
                                <>
                                    {
                                        data.price.discountedPrice &&
                                        <>
                                            <span className={card["current-price"]}>{data.price.currency} {data.price.discountedPrice}</span>
                                            <span className={card["old-price"]}>({data.price.currency} {data.price.fullPrice})</span>
                                        </>
                                    }
                                    {
                                        !data.price.discountedPrice &&
                                        <span className={card["current-price"]}>{data.price.currency} {data.price.fullPrice}</span>
                                    }
                                </>
                            }
                            {
                                !data.price &&
                                <span className={card["current-price"]}>Free</span>
                            }
                        </div>
                        <div className={card["footer-right"]}>
                            <Button size="S" type="button" mode="text" variant="accent"><ShoppingCart />Add to cart</Button>
                        </div>
                    </CardFooter>
                }
                {
                    alreadyEnrolled &&
                    <CardFooter className={card.footer} padding="300" gap="400">
                        <div className={card["footer-left"]}>
                            <div className={card.progress}>
                                <Label>{progress} Completed</Label>
                                <Progress value={50} style={{ "width": "100%", "height": "4px" }} data-status={"success"} />
                            </div>
                        </div>
                        <div className={card["footer-right"]}>
                            <Button type="button" mode="text" variant="accent" size="S"><BookOpen />Open course</Button>
                        </div>
                    </CardFooter>
                }
            </Link>
        </Card>
    )
}

export { CourseCard }