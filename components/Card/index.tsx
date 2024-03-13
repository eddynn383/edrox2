"use client"
import React from "react";
import { CardContentProps, CardDescriptionProps, CardFooterProps, CardHeaderProps, CardProps, CardTitleProps } from "./interface";
import csx from "@/styles/component.module.scss";

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className = csx["card"], size = "M", variant = "primary", shade = "100", effect = "normal", ...props }, ref) => (
    <div ref={ref} className={className} data-size={size} data-variant={variant} data-shade={shade} data-effect={effect} {...props} />
))

Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(({ className = csx["card-header"], size = "M", ...props }, ref) => (
    <div ref={ref} className={className} data-size={size} {...props} />
))

CardHeader.displayName = "CardHeader"


const CardTitle = React.forwardRef<HTMLParagraphElement, CardTitleProps>(({ className = csx["card-title"], rank, ...props }, ref) => {
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


const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(({ className = csx["card-description"], truncated = "false", ...props }, ref) => (
    <p ref={ref} className={className} data-truncated={truncated} {...props} />
))

CardDescription.displayName = "CardDescription"


const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(({ className = csx["card-content"], size = "M", ...props }, ref) => (
    <div ref={ref} className={className} data-size={size} {...props} />
))

CardContent.displayName = "CardContent"


const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(({ className = csx["card-footer"], size = "M", ...props }, ref) => (
    <div ref={ref} className={className} data-size={size} {...props} />
))

CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription }