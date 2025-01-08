"use client"

import { updateChaptersPositions } from "@/actions/chapter";
import { PlaylistDnD } from "@/components";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import chaptersSX from "./course-chapters.module.css"
import { convertDuration } from "@/lib/utils";

const CourseEditChapters = ({ courseId, chapters }: CourseChaptersProps) => {
    const [items, setItems] = useState(chapters);
    const path = usePathname()

    console.log("Chapters in CourseEditChapters: ", chapters)
    console.log("Items in CourseEditChapters: ", items)

    useEffect(() => {
        setItems(chapters)
    }, [chapters])

    const handleReorder = (newItems: any) => {
        setItems(newItems);

        try {
            updateChaptersPositions(newItems);
            console.log('New order saved:', newItems);
        } catch (error) {
            console.error('Failed to save new order:', error);
        }
    };

    const handleEdit = (newItems: any) => {


    }

    const handleDelete = (newItems: any) => {

    }

    return (
        <div className={chaptersSX.container}>
            <div className={chaptersSX.body}>
                <PlaylistDnD courseId={courseId} items={items} location="content" onReorder={() => handleReorder(items)} onEdit={() => handleEdit(items)} onDelete={() => handleDelete(items)} />
            </div>
        </div>
    );
}

export { CourseEditChapters };