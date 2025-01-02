"use client"
import React from "react";
import { CardContentProps, CardDescriptionProps, CardFooterProps, CardHeaderProps, CardProps, CardTitleProps } from "./interface";
import { Heading } from "@/components"
import csx from "@/styles/component.module.scss";
import card from "./card.module.css"

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className = card.container, variant = "primary", mode = "solid", shade = "100", padding = "200", radius = "200", gap = "0", view = "portrait", ...props }, ref) => (
    <div ref={ref} className={className} data-variant={variant} data-mode={mode} data-shade={shade} data-padding={padding} data-radius={radius} data-gap={gap} data-view={view} {...props} />
))

Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(({ className = card.header, padding = "0", radius = "0", gap = "0", ...props }, ref) => (
    <div ref={ref} className={className} data-padding={padding} data-radius={radius} data-gap={gap} {...props} />
))

CardHeader.displayName = "CardHeader"


const CardTitle = React.forwardRef<HTMLParagraphElement, CardTitleProps>(({ className = card.title, rank, ...props }, ref) => {
    let title;

    // switch (rank) {
    //     case 1: title = <h1 ref={ref} className={className} {...props} />
    //         break;
    //     case 2: title = <h2 ref={ref} className={className} {...props} />
    //         break;
    //     case 3: title = <h3 ref={ref} className={className} {...props} />
    //         break;
    //     default: title = <h4 ref={ref} className={className} {...props} />
    //         break;
    // }

    return (
        <>
            <Heading rank={rank} size="S" {...props} />
        </>
    )
})

CardTitle.displayName = "CardTitle"


const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(({ className = card.description, truncated = "false", ...props }, ref) => (
    <p ref={ref} className={className} data-truncated={truncated} {...props} />
))

CardDescription.displayName = "CardDescription"


const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(({ className = card.content, padding = "0", radius = "0", gap = "0", ...props }, ref) => (
    <div ref={ref} className={className} data-padding={padding} data-radius={radius} data-gap={gap} {...props} />
))

CardContent.displayName = "CardContent"


const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(({ className = card.footer, padding = "0", radius = "0", gap = "0", ...props }, ref) => (
    <div ref={ref} className={className} data-padding={padding} data-radius={radius} data-gap={gap} {...props} />
))

CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription }