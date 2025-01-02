"use client"

import Link from "next/link";
import {
    Button,
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    AlertDialogCancel,
    PlaylistItem
} from "@/components";
import { PlaylistProps } from "./interface";
import playlist from "./playlist.module.css";
import { useEffect, useState } from "react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { SortableItem } from "@/components"; // A component you'll need to create for sortable functionality
import { updateChaptersPositions } from "@/actions/chapter";
import { CSS } from "@dnd-kit/utilities";

const DraggablePlaylistItem = ({ item, isActive, edit }: any) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: item.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <li ref={setNodeRef} style={style} className={playlist["list-item"]}>
            <PlaylistItem
                courseId={item.courseId}
                item={item}
                edit={edit}
                isActive={isActive}
                dragHandleProps={{ listeners, attributes }} // Pass the drag handle props to PlaylistItem
            />
        </li>
    );
};

const Playlist = ({ courseId, data, target, edit = false, currentPath }: PlaylistProps) => {
    const [items, setItems] = useState(data || []);

    useEffect(() => {
        setItems(data)
    }, [data])

    console.log("PLAYLIST ITEMS: ", items)

    // Handle drag and drop sorting
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                delay: 250, // 250ms press delay before dragging
                tolerance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            setItems((prevItems) => {
                const oldIndex = prevItems.findIndex((item: any) => item.id === active.id);
                const newIndex = prevItems.findIndex((item: any) => item.id === over.id);
                const newItems = arrayMove(prevItems, oldIndex, newIndex);

                // Update the positions based on the new order
                newItems.forEach((item, index) => {
                    item.position = index + 1; // Assuming position starts at 1
                });

                console.log("newItems: ", newItems)

                // Send the updated order to the server
                updateChaptersPositions(newItems);

                return newItems;
            });
        }
    };

    return (
        <>
            {
                !edit &&
                <div className={playlist.container}>
                    {
                        data.length > 0 &&
                        <ul className={playlist.list}>
                            {
                                data.map((item: any) => {
                                    const isActive = currentPath?.includes(item.id);

                                    return (
                                        <li className={playlist["list-item"]} key={item.id}>
                                            {
                                                item.status !== "LOCKED" ?
                                                    <Link href={target ? `${target}/${item.id}` : item.id} className={playlist["list-item-wrapper"]}>
                                                        <PlaylistItem item={item} />
                                                    </Link>
                                                    :
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <div className={playlist["list-item-wrapper"]}>
                                                                <PlaylistItem item={item} />
                                                            </div>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Chapter Locked</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    To unlock this chapter you need to complete all available chapters
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel asChild>
                                                                    <div>
                                                                        <Button>Cancel</Button>
                                                                    </div>
                                                                </AlertDialogCancel>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                            }
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    }
                    {
                        data.length === 0 &&
                        <p>There are no chapters created yet</p>
                    }
                </div>
            }
            {
                edit &&
                <div className={playlist.container}>
                    {
                        items.length > 0 &&
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={items}
                            // items={items.map((item: any) => item.id)}
                            // strategy={verticalListSortingStrategy}
                            >
                                <ul className={playlist.list}>
                                    {
                                        items.map((item: any) => {
                                            const isActive = currentPath?.includes(item.id);
                                            console.log(item)
                                            return (
                                                <DraggablePlaylistItem
                                                    key={item.id}
                                                    item={{ ...item, courseId }}
                                                    edit={edit}
                                                    isActive={isActive}
                                                />
                                            );
                                        })
                                    }
                                </ul>
                            </SortableContext>
                        </DndContext>
                    }
                    {
                        items.length === 0 &&
                        <p>There are no chapters created yet</p>
                    }
                </div>
            }
        </>
    );
};

export { Playlist };
