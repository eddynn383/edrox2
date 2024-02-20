"use client"

// import {Avatar, Cover, Link, Rating} from "@/components";
import React from "react";
import { useRouter } from "next/navigation";
// import Link from "next/link";
// // import { getCoursePrice, getCourseRating, getUser } from "@/lib/getData";
// import defaultAvatar from "@/public/assets/images/avatar-placeholder.svg";
import { Avatar, Badge, Button, Cover, Rating } from "@/components";
import { CardContentProps, CardDescriptionProps, CardFooterProps, CardHeaderProps, CardProps, CardTitleProps, CourseCardProps } from "./interface";
import sx from "@/styles/component.module.scss";

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className = sx["card"], size = "M", variant = "primary", shade = "100", effect = "normal", ...props }, ref) => (
    <div ref={ref} className={className} data-size={size} data-variant={variant} data-shade={shade} data-effect={effect} {...props} />
))

Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(({ className = sx["card-header"], size = "M", ...props }, ref) => (
    <div ref={ref} className={className} data-size={size} {...props} />
))

CardHeader.displayName = "CardHeader"


const CardTitle = React.forwardRef<HTMLParagraphElement, CardTitleProps>(({ className = sx["card-title"], rank, ...props }, ref) => {
    let title;

    switch (rank) {
        case 1: title = <h1 ref={ref} className={className} {...props} />
            break;
        case 2: title = <h2 ref={ref} className={className} {...props} />
            break;
        case 3: title = <h3 ref={ref} className={className} {...props} />
            break;
        default: title = <h4 ref={ref} className={className} {...props} />
            break;
    }

    return title
})

CardTitle.displayName = "CardTitle"


const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(({ className = sx["card-description"], truncated = "false", ...props }, ref) => (
    <p ref={ref} className={className} data-truncated={truncated} {...props} />
))

CardDescription.displayName = "CardDescription"


const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(({ className = sx["card-content"], size = "M", ...props }, ref) => (
    <div ref={ref} className={className} data-size={size} {...props} />
))

CardContent.displayName = "CardContent"


const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(({ className = sx["card-footer"], size = "M", ...props }, ref) => (
    <div ref={ref} className={className} data-size={size} {...props} />
))

CardFooter.displayName = "CardFooter"


const CourseCard = ({ data, layout = "columns", variant = "primary", shade = "100", effect = "normal", size = "M" }: CourseCardProps) => {
    // const { id, image, title } = data;
    const router = useRouter()

    const image = data.image ? data.image : "https://images.pexels.com/photos/2457284/pexels-photo-2457284.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"

    function makeDiscount(price: number, discount: number, currency: string) {
        const smallPrice = parseFloat((price - (price / 100 * discount)).toFixed(2))

        return setValue(smallPrice, currency)
    }

    function currencySymbol(currency: string) {
        let symbol
        switch (currency) {
            case "USD": symbol = "$"
                break;
            case "EUR": symbol = "€"
                break;
            case "GBP": symbol = "£"
                break;
            default: symbol = "$"
                break;
        }

        return symbol
    }

    function setValue(value: number, currency: string) {
        if (value > 0) {
            return <span className={sx["red"]}>{currencySymbol(currency)}{value}</span>
        } else {
            return <span className={sx["green"]}>Free</span>
        }
    }

    // const avatarAlt = instructor?.name ? instructor.name : instructor?.email

    function addToCart() {
        console.log("added to cart!")
    }

    return (
        <Card className={`${sx["card"]} ${sx["card--course"]}`} data-layout={layout} data-variant={variant} data-shade={shade} data-effect={effect} data-size={size} onClick={() => router.push(`/catalog/course/${data.id}`)}>
            <CardHeader>
                <Cover src={image} alt={data.title} width={250} height={100} />
            </CardHeader>
            <CardContent>
                <div className={sx["card-content-top"]}>
                    {data.category && <Badge>{data.category.name}</Badge>}
                    <Rating score={4.5} />
                </div>
                <CardTitle rank={2}>{data?.title}</CardTitle>
                <CardDescription truncated>{data?.description}</CardDescription>
            </CardContent>
            <CardFooter>
                <Button type="button" onClick={addToCart}>Add to cart</Button>
            </CardFooter>
            {/* <div className={sx["card-bottom"]}>
                <div className={sx["card-bottom-top"]}>
                    <div className={sx["card-price-rating"]}>
                        {
                            price &&
                            <span className={sx["card-price"]}>
                                {price.discount && price.discount > 0 ? <span className={sx["card-price-discount"]}>{makeDiscount(price.value, price.discount, price.currency)}</span> : null}
                                <span className={sx["card-price-value"]}>{setValue(price.value, price.currency)}</span>
                            </span>
                        }
                        {
                            rating &&
                            <span className={sx["card-rating"]}>
                                <Rating score={rating.value} reviews={rating.reviews} />
                            </span>
                        }
                    </div>
                </div>
                <div className={sx["card-bottom-bottom"]}>
                    {
                        instructor &&
                        <span className={sx["card-instructor"]}>
                            <Avatar src={instructor.image ? instructor.image : defaultAvatar} alt={avatarAlt ? avatarAlt : ""} size="S" type="circle" />
                            {instructor.name ? <span className={sx["card-instructor-name"]}>{instructor.name}</span> : <span className={sx["card-instructor-email"]}>{instructor.email}</span>}
                        </span>
                    }
                </div>
            </div> */}
        </Card>
    )
}

export { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription, CourseCard }