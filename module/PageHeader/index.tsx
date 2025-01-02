"use client"

import React from "react"
import { Breadcrumb, PageTitle, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, Text } from "@/components"
import header from "./page-header.module.css"

interface PageHeaderProps {
    title: string;
    description?: string;
    breadcrumb?: any[];
    actions?: any[] | React.ReactElement[];
}

export const PageHeader = ({ title, description, breadcrumb, actions }: PageHeaderProps) => {

    return (
        <div className={header.container}>
            <div className={header.row}>
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
            <div className={header.row}>
                <div className={header.left}>
                    <PageTitle title={title} />
                    {
                        description &&
                        <div className={header.description}>
                            <Text size="M">{description}</Text>
                        </div>
                    }
                </div>
                <div className={header.right}>
                    {actions?.map((action) => (
                        <div key={action.id}>
                            {action.element}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}