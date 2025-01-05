"use client"

import React from "react"
import { Breadcrumb, PageTitle, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, Text, Cover, Badge, Rating } from "@/components"
import header from "./page-header.module.css"
import { Category, Image } from "@/interfaces/global";

interface PageHeaderProps {
    title: string;
    description?: string;
    image?: Image;
    category?: Category;
    rating?: any;
    breadcrumb?: any[];
    actions?: any[] | React.ReactElement[];
    device?: "desktop" | "table" | "mobile";
}

export const PageHeader = ({ title, description, image, category, rating, breadcrumb, actions, device = "desktop" }: PageHeaderProps) => {

    return (
        <div className={header.container} data-device={device}>
            <div className={header.row} data-comp="breadcrumb">
                <Breadcrumb>
                    <BreadcrumbList>
                        {breadcrumb?.map((item) => (
                            <React.Fragment key={item.id}>
                                {
                                    item.href &&
                                    <BreadcrumbItem key={item.id}>
                                        <BreadcrumbLink {...item}>{item.children}</BreadcrumbLink>
                                    </BreadcrumbItem>
                                }
                                {
                                    item.separator === "true" &&
                                    <BreadcrumbSeparator key={`${item.id + "-separator"}`} id={`${item.id + "-separator"}`} />
                                }
                                {
                                    !item.href &&
                                    <BreadcrumbItem key={item.id}>
                                        <BreadcrumbPage {...item}>{item.children}</BreadcrumbPage>
                                    </BreadcrumbItem>
                                }
                            </React.Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            {
                image &&
                <div className={header.row} data-comp="image">
                    <Cover src={image.url} alt="cover-image" width={400} height={200} style={{ "width": "100%" }} />
                </div>
            }
            <div className={header.row}>
                <div className={header.left}>
                    <div className={header.row} data-comp="title">
                        <div className={header.left}>
                            <PageTitle title={title} />
                        </div>
                    </div>
                    {
                        (category || rating) &&
                        <div className={header.row} data-comp="category-rating">
                            <div className={header.left}>
                                {
                                    category &&
                                    <Badge>{category.name}</Badge>
                                }
                            </div>
                            <div className={header.right}>
                                {
                                    rating &&
                                    <Rating containerId={rating?.id} score={rating?.score} reviews={rating?.reviews} minified={true} />
                                }
                            </div>
                        </div>
                    }
                    {
                        description &&
                        <div className={header.row} data-comp="description-actions">
                            <div className={header.left}>
                                <div className={header.description}>
                                    <Text size="M">{description}</Text>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                {
                    actions &&
                    <div className={header.right}>
                        {actions?.map((action) => (
                            <div key={action.id}>
                                {action.element}
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}