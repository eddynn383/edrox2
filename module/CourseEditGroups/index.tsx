"use client"

import { updateChaptersPositions } from "@/actions/chapter";
import { PlaylistDnD } from "@/components";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { convertDuration } from "@/lib/utils";
import { CourseEditGroupsProps } from "./interface";
import groupsSX from "./course-groups.module.css"

const CourseEditGroups = ({ courseId, groups }: CourseEditGroupsProps) => {

    console.log("groups: ", groups)
    const altGroups = groups.map((group: any) => {
        return { ...group, description: `${group._count.users} people assigned` }
    })

    console.log("altGroups: ", altGroups)

    const [items, setItems] = useState(altGroups);

    console.log("Chapters in CourseEditGroups: ", groups)
    console.log("Items in CourseEditGroiups: ", items)

    useEffect(() => {
        setItems(altGroups)
    }, [groups])

    const handleEdit = (newItems: any) => {


    }

    const handleDelete = (newItems: any) => {

    }

    return (
        <div className={groupsSX.container}>
            <div className={groupsSX.body}>
                <PlaylistDnD courseId={courseId} items={items} location="participants" showDescription onEdit={() => handleEdit(items)} onDelete={() => handleDelete(items)} />
            </div>
        </div>
    );
}

export { CourseEditGroups };