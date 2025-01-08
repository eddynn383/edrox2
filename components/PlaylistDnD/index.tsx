"use client"

import {
    PlaylistItemDnD,
    Text
} from "@/components";
import { PlaylistDnDProps } from "./interface";
import playlist from "./playlist.module.css";
import { useEffect, useRef, useState } from "react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { usePathname } from "next/navigation";

const PlaylistDnD = ({ items, courseId, location, showDescription = false, onReorder, onEdit, onDelete }: PlaylistDnDProps) => {
    const [isSorting, setIsSorting] = useState(false);
    const [activeItemId, setActiveItemId] = useState<string | null>(null);
    const componentRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname()
    // Handle drag and drop sorting
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

    useEffect(() => {
        console.log("ITEMS IN PLAYLIST DND: ", items)
    }, [items])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (componentRef.current && !componentRef.current.contains(event.target as Node)) {
                setIsSorting(false);
                setActiveItemId(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = items.findIndex((item) => item.id === active.id);
            const newIndex = items.findIndex((item) => item.id === over.id);
            onReorder && onReorder(arrayMove(items, oldIndex, newIndex));
        }
    };

    return (
        <div className={playlist.container} ref={componentRef}>
            <ul className={playlist.list}>
                {
                    items &&
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={items}
                            strategy={verticalListSortingStrategy}
                        // items={items.map((item: any) => item.id)}
                        // strategy={verticalListSortingStrategy}
                        >
                            {
                                items.map((item: any, idx) => {
                                    const isActive = pathname?.includes(item.id);
                                    console.log(item)
                                    return (
                                        <li key={idx} className={playlist["list-item"]} data-active={isActive}>
                                            <PlaylistItemDnD
                                                id={item.id}
                                                name={item.name}
                                                description={item.description}
                                                href={`/management/courses/${courseId}/edit/${location}/${item.id}`}
                                                isSorting={isSorting}
                                                showDescription={showDescription}
                                                onEdit={onEdit}
                                                onDelete={onDelete}
                                                onLongPress={() => setIsSorting(true)}
                                            />
                                        </li>
                                    );
                                })
                            }
                        </SortableContext>
                    </DndContext>
                }
                {
                    (items === null || items.length === 0) &&
                    <li className={playlist["list-item"]}>
                        <Text size="S" type="paragraph" >There are no chapters created yet</Text>
                    </li>
                }
                {isSorting && (
                    <li className={playlist["list-item"]}>
                        <Text size="S" type="paragraph" >Sorting mode active. Drag items to reorder.</Text>
                    </li>
                )}
            </ul>
        </div>
    );
};

export { PlaylistDnD };
