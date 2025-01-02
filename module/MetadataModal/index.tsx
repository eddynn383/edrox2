"use client"

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button, Dialog, DialogBody, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components";
import { CourseMetadataForm } from "../CourseMetadataForm";

type Chapter = {
    id: string;
    title: string;
    description: string | null;
    isPublished: boolean;
    status: string;
    duration: number;
    isFree: boolean;
}

type Chapters = {
    chaptersData: Chapter[];
    countChapters: number;
    sumOfChaptersDuration: number;
}

interface MetadataModalProps {
    id: string;
    value?: Chapters;
}

export const MetadataModal = ({ id, value }: MetadataModalProps) => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {
                value &&
                <DialogTrigger asChild>
                    <Button mode="text" variant="accent" status="default" size="M" content="icon">
                        Edit metadata
                    </Button>
                </DialogTrigger>
            }
            {
                !value &&
                <DialogTrigger asChild>
                    <Button mode="text" variant="accent" status="default" size="M" content="icon">
                        <PlusCircle />
                        Add metadata
                    </Button>
                </DialogTrigger>
            }
            <DialogContent>
                {
                    !value &&
                    <DialogHeader>
                        <DialogTitle>Add metadata</DialogTitle>
                        <DialogDescription>Use the fields below to create a new chapter</DialogDescription>
                    </DialogHeader>
                }
                <DialogBody>
                    <CourseMetadataForm
                        courseId={id}
                        actions={
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button>Cancel</Button>
                                </DialogClose>
                                {
                                    value &&
                                    <Button variant="accent" type="submit">Update</Button>
                                }
                                {
                                    !value &&
                                    <Button variant="accent" type="submit">Create</Button>
                                }
                            </DialogFooter>
                        }
                        onOpen={setOpen}
                    />
                </DialogBody>
            </DialogContent>
        </Dialog>
    );
}