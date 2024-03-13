"use server"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../Card"
import { Badge, Button, Cover, Rating } from "@/components"
import { getCourseRatingAvg } from "@/data/ratings"
import { CourseCardProps } from "./interface"
import csx from "@/styles/component.module.scss"

const CourseCard = async ({ data, layout = "columns", variant = "primary", shade = "100", effect = "normal", size = "M" }: CourseCardProps) => {
    const image = data.image ? data.image : "https://images.pexels.com/photos/2457284/pexels-photo-2457284.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"

    const avgRating = await getCourseRatingAvg(data.id)

    console.log("Course data: ", data)

    return (
        <Card className={`${csx["card"]} ${csx["card--course"]}`} data-layout={layout} data-variant={variant} data-shade={shade} data-effect={effect} data-size={size}>
            <Link href={`/catalog/course/${data.id}`} >
                <CardHeader>
                    <Cover src={image} alt={data.title} width={250} height={100} />
                </CardHeader>
                <CardContent>
                    <div className={csx["card-content-top"]}>
                        {data.category && <Badge>{data.category.name}</Badge>}
                        {avgRating && <Rating score={avgRating} />}
                    </div>
                    <CardTitle rank={2}>{data?.title}</CardTitle>
                    <CardDescription truncated>{data?.description}</CardDescription>
                </CardContent>
                <CardFooter>
                    <Button type="button">Add to cart</Button>
                </CardFooter>
                {/* <div className={csx["card-bottom"]}>
                    <div className={csx["card-bottom-top"]}>
                        <div className={csx["card-price-rating"]}>
                            {
                                price &&
                                <span className={csx["card-price"]}>
                                    {price.discount && price.discount > 0 ? <span className={csx["card-price-discount"]}>{makeDiscount(price.value, price.discount, price.currency)}</span> : null}
                                    <span className={csx["card-price-value"]}>{setValue(price.value, price.currency)}</span>
                                </span>
                            }
                            {
                                rating &&
                                <span className={csx["card-rating"]}>
                                    <Rating score={rating.value} reviews={rating.reviews} />
                                </span>
                            }
                        </div>
                    </div>
                    <div className={csx["card-bottom-bottom"]}>
                        {
                            instructor &&
                            <span className={csx["card-instructor"]}>
                                <Avatar src={instructor.image ? instructor.image : defaultAvatar} alt={avatarAlt ? avatarAlt : ""} size="S" type="circle" />
                                {instructor.name ? <span className={csx["card-instructor-name"]}>{instructor.name}</span> : <span className={sx["card-instructor-email"]}>{instructor.email}</span>}
                            </span>
                        }
                    </div>
                </div> */}
            </Link>
        </Card>
    )
}

export { CourseCard }