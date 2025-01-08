"use client"

import { updateChaptersPositions } from "@/actions/chapter";
import { Heading, Playlist } from "@/components";
import { useState } from "react";
import { usePathname } from "next/navigation";
import chaptersSX from "./course-chapters.module.css"
import { convertDuration } from "@/lib/utils";

const CourseViewChapters = ({ courseId, chapters }: CourseViewChaptersProps) => {
    const { data, count, duration } = chapters
    const [items, setItems] = useState(data);
    const path = usePathname()

    const handleReorder = (newItems: any) => {
        setItems(newItems);

        try {
            updateChaptersPositions(newItems);
            // console.log('New order saved:', newItems);
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
            <div className={chaptersSX.header}>
                <Heading rank={2}>Course content</Heading>
                <span className={chaptersSX.metadatas}>
                    <span className={chaptersSX.metadata}>{count}{count === 1 ? " Chapter" : " Chapters"}</span>
                    <span className={chaptersSX.metadata}>{convertDuration(duration)}</span>
                </span>
            </div>
            <div className={chaptersSX.body}>
                <Playlist courseId={courseId} items={items} currentPath={path} />
            </div>
        </div>
    );
}

export default CourseViewChapters;