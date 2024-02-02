"use client"

// import {Avatar, Cover, Link, Rating} from "@/components";
import React from "react";
import { Avatar } from "@/components/Avatar";
import { Cover } from "@/components/Cover";
import Link from "next/link";
import { Rating } from "@/components/Rating";
// import { getCoursePrice, getCourseRating, getUser } from "@/lib/getData";
import defaultAvatar from "@/public/assets/images/avatar-placeholder.svg";
import { CardContentProps, CardDescriptionProps, CardFooterProps, CardHeaderProps, CardProps, CardTitleProps, CourseCardProps } from "./interface";
import sx from "@/styles/component.module.scss";

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, size="M", variant="primary", effect="normal", ...props }, ref) => (
    <div ref={ref} className={sx["card"]} data-size={size} data-variant={variant} data-effect={effect} {...props} />
))

Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(({ className, ...props }, ref) => (
    <div ref={ref} className={sx["card_header"]} {...props} />
))

CardHeader.displayName = "CardHeader"


const CardTitle = React.forwardRef<HTMLParagraphElement, CardTitleProps>(({ className, rank, ...props }, ref) => {
    let title;

    switch(rank) {
        case 1: title = <h1 ref={ref} className={sx["card_title"]} {...props} />
            break;
        case 2: title = <h2 ref={ref} className={sx["card_title"]} {...props} />
            break;
        case 3: title = <h3 ref={ref} className={sx["card_title"]} {...props} />
            break;
        default: title = <h4 ref={ref} className={sx["card_title"]} {...props} />
            break;
    }
    
    
    return title
})

CardTitle.displayName = "CardTitle"


const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(({ className, ...props }, ref) => (
    <p ref={ref} className={sx["card_description"]} {...props} />
))

CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(({ className, ...props }, ref) => (
    <div ref={ref} className={sx["card_content"]} {...props} />
))

CardContent.displayName = "CardContent"


const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(({ className, ...props }, ref) => (
    <div ref={ref} className={sx["card_footer"]} {...props} />
))

CardFooter.displayName = "CardFooter"


const CourseCard = ({ data, price, rating, instructor, layout = "columns" }: CourseCardProps) => {
    const { id, image, title } = data;

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

    const avatarAlt = instructor?.name ? instructor.name : instructor?.email

    return (
        <Link href={`/catalog/${id}`} >
            <Card className={sx["card--course"]} data-layout={layout}>
                <div className={sx["card-top"]}>
                    <Cover src={image} alt={title} width={250} height={100} />
                </div>
                <div className={sx["card-bottom"]}>
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
                        <h3 className={sx["card-title"]}>{data.title}</h3>
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
                </div>
            </Card>
        </Link>
    )
}

export { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription, CourseCard }