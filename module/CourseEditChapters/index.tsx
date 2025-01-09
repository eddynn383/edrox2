"use client"

import { deleteChapter, updateChaptersPositions } from "@/actions/chapter";
import { Button, DialogClose, DialogFooter, PlaylistDnD } from "@/components";
import { useEffect, useState } from "react";
import { DataEditModal } from "../DataEditModal";
import { CourseChapterCreationForm } from "../CourseChapterCreationForm";
import { getChapterById } from "@/data/chapters";
import { Spinner } from "@/components/Spinner";
import chaptersSX from "./course-chapters.module.css"

const CourseEditChapters = ({ courseId, chapters }: CourseChaptersProps) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [items, setItems] = useState(chapters);
    const [chapter, setChapter] = useState<any>();
    const [isPending, setIsPending] = useState(false)

    // console.log("Chapters in CourseEditChapters: ", chapters)
    // console.log("Items in CourseEditChapters: ", items)

    useEffect(() => {
        setItems(chapters)
    }, [chapters])

    const handleReorder = (newItems: any) => {
        setItems(newItems);

        try {
            updateChaptersPositions(newItems);
            // console.log('New order saved:', newItems);
        } catch (error) {
            console.error('Failed to save new order:', error);
        }
    };

    const handleEdit = async (id: string) => {
        console.log("Edited Item: ", id)
        // setChapterId(id)
        try {
            const chapterData = await getChapterById(id); // Fetch chapter data
            if (chapterData) {
                setChapter(chapterData);
                console.log("Fetched Chapter: ", chapterData);
            } else {
                console.error("Chapter not found");
            }
        } catch (error) {
            console.error("Error fetching chapter:", error);
        }

        setOpenDialog(true)
    }

    const handleDelete = async (id: string) => {
        console.log("Deleted Item: ", id)
        try {
            const deletedChapter = deleteChapter(id);

            console.log("DELETED CHAPTER: ", deletedChapter)
        } catch (error) {
            console.error("Error deleting chapter:", error);
        }
    }

    const onCancel = () => {
        setOpenDialog(false)
        setChapter(null);
    }


    return (
        <div className={chaptersSX.container}>
            <div className={chaptersSX.body}>
                <PlaylistDnD courseId={courseId} items={items} location="content" onReorder={handleReorder} onEdit={handleEdit} onDelete={handleDelete} />
                {
                    <DataEditModal
                        title="Edit Chapter"
                        children={
                            <CourseChapterCreationForm
                                courseId={courseId}
                                chapter={chapter}
                                actions={
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button>Cancel</Button>
                                        </DialogClose>
                                        <Button status="brand" variant="accent" type="submit">{isPending ? <Spinner /> : "Update"}</Button>
                                    </DialogFooter>
                                }
                                onPendingChange={(isPending) => {
                                    setIsPending(isPending)
                                }}
                                onOpen={setOpenDialog}
                                edit={true}
                            />
                        }
                        // actions={
                        //     <>
                        //         <Button onClick={onCancel}>Cancel</Button>
                        //         <Button onClick={onEdit}>Edit</Button>
                        //     </>
                        // }
                        open={openDialog}
                        setOpen={() => setOpenDialog(false)}
                    />
                }
            </div>
        </div>
    );
}

export { CourseEditChapters };