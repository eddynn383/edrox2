"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight as ChevronRightLucide, MoreHorizontal as MoreHorizontalLucide } from "lucide-react"
import { BreadcrumbEllipsisProps, BreadcrumbItemProps, BreadcrumbLinkProps, BreadcrumbListProps, BreadcrumbPageProps, BreadcrumbProps, BreadcrumbSeparatorProps } from "./interface"
import breadcrumb from "./breadcrumb.module.css"

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />)

Breadcrumb.displayName = "Breadcrumb"



const BreadcrumbList = React.forwardRef<HTMLOListElement, BreadcrumbListProps>(({ className=breadcrumb.list, ...props }, ref) => (
    <ol ref={ref} className={className} {...props} />
))

BreadcrumbList.displayName = "BreadcrumbList"



const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(({ className=breadcrumb.item, ...props }, ref) => (
    <li ref={ref} className={className} {...props} />
))

BreadcrumbItem.displayName = "BreadcrumbItem"



const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(({ asChild, className=breadcrumb.link, ...props }, ref) => {
    const Comp = asChild ? Slot : "a"

    return (
        <Comp ref={ref} className={className} {...props} />
    )
})

BreadcrumbLink.displayName = "BreadcrumbLink"



const BreadcrumbPage = React.forwardRef<HTMLSpanElement, BreadcrumbPageProps>(({ className=breadcrumb.page, ...props }, ref) => (
    <span
        ref={ref}
        role="link"
        aria-disabled="true"
        aria-current="page"
        className={className}
        {...props}
    />
))

BreadcrumbPage.displayName = "BreadcrumbPage"



const BreadcrumbSeparator = ({ children, className=breadcrumb.separator, ...props }: BreadcrumbSeparatorProps) => (
    <li role="presentation" aria-hidden="true" className={className} {...props} >
        {children || <ChevronRightLucide />}
    </li>
)

BreadcrumbSeparator.displayName = "BreadcrumbSeparator"



const BreadcrumbEllipsis = ({ className=breadcrumb.ellipsis, ...props }: BreadcrumbEllipsisProps) => (
    <span role="presentation" aria-hidden="true" className={className} {...props} >
        <MoreHorizontalLucide />
        <span className="sr-only">More</span>
    </span>
)

BreadcrumbEllipsis.displayName = "BreadcrumbElipssis"

export {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
    BreadcrumbEllipsis,
}
