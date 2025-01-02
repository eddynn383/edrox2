"use client"

import { updateChaptersPositions } from "@/actions/chapter";
import { Playlist } from "@/components";
import { useState } from "react";
import { usePathname } from "next/navigation";

const CourseChapters = async ({ courseId, chapters }: CourseChaptersProps) => {
    const [items, setItems] = useState(chapters);
    const path = usePathname()

    const handleReorder = async (newItems: any) => {
        setItems(newItems);

        try {
            updateChaptersPositions(newItems);
            console.log('New order saved:', newItems);
        } catch (error) {
            console.error('Failed to save new order:', error);
        }
    };

    const handleEdit = async (newItems: any) => {


    }

    const handleDelete = async (newItems: any) => {

    }

    return (
        <Playlist courseId={courseId} items={items} currentPath={path} onReorder={handleReorder} onEdit={handleEdit} onDelete={handleDelete} />
    );
}

export default CourseChapters;