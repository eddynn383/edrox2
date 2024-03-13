"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight as ChevronRightLucide, MoreHorizontal as MoreHorizontalLucide } from "lucide-react"
import csx from "@/styles/component.module.scss"

const Breadcrumb = React.forwardRef<
    HTMLElement,
    React.ComponentPropsWithoutRef<"nav"> & {
        separator?: React.ReactNode
    }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />)

Breadcrumb.displayName = "Breadcrumb"



const BreadcrumbList = React.forwardRef<
    HTMLOListElement,
    React.ComponentPropsWithoutRef<"ol">
>(({ className=csx["breadcrumb-list"], ...props }, ref) => (
    <ol ref={ref} className={className} {...props} />
))

// cn(
//     "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
//     className
// )

BreadcrumbList.displayName = "BreadcrumbList"



const BreadcrumbItem = React.forwardRef<
    HTMLLIElement,
    React.ComponentPropsWithoutRef<"li">
>(({ className=csx["breadcrumb-list-item"], ...props }, ref) => (
    <li ref={ref} className={className} {...props} />
))

// cn("inline-flex items-center gap-1.5", className)

BreadcrumbItem.displayName = "BreadcrumbItem"



const BreadcrumbLink = React.forwardRef<
    HTMLAnchorElement,
    React.ComponentPropsWithoutRef<"a"> & {
        asChild?: boolean
    }
>(({ asChild, className=csx["breadcrumb-link"], ...props }, ref) => {
    const Comp = asChild ? Slot : "a"

    return (
        <Comp
            ref={ref}
            className={className}
            {...props}
        />
    )
})

// cn("transition-colors hover:text-foreground", className)

BreadcrumbLink.displayName = "BreadcrumbLink"



const BreadcrumbPage = React.forwardRef<
    HTMLSpanElement,
    React.ComponentPropsWithoutRef<"span">
>(({ className=csx["breadcrumb-page"], ...props }, ref) => (
    <span
        ref={ref}
        role="link"
        aria-disabled="true"
        aria-current="page"
        className={className}
        {...props}
    />
))

// cn("font-normal text-foreground", className)

BreadcrumbPage.displayName = "BreadcrumbPage"



const BreadcrumbSeparator = ({
    children,
    className=csx["breadcrumb-list-item-separator"],
    ...props
}: React.ComponentProps<"li">) => (
    <li
        role="presentation"
        aria-hidden="true"
        className={className}
        {...props}
    >
        {children 
        || <ChevronRightLucide />
        }
    </li>
)

// cn("[&>svg]:size-3.5", className)

BreadcrumbSeparator.displayName = "BreadcrumbSeparator"



const BreadcrumbEllipsis = ({
    className=csx["breadcrumb-ellipsis"],
    ...props
}: React.ComponentProps<"span">) => (
    <span
        role="presentation"
        aria-hidden="true"
        className={className}
        {...props}
    >
        <MoreHorizontalLucide />
        <span className="sr-only">More</span>
    </span>
)

// cn("flex h-9 w-9 items-center justify-center", className)

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
