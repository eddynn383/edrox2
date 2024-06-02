"use client"

import { Button, Dialog, DialogBody, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components";
import { useState } from "react";
import { Edit, PlusCircle } from "lucide-react";
import { ChapterCreationForm } from "../ChapterCreationForm";

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

interface ChapterModalProps {
    id: string;
    value?: Chapters;
}

export const ChapterModal = ({id, value}: ChapterModalProps) => {
    const [open, setOpen] = useState(false);

    return ( 
        <Dialog open={open} onOpenChange={setOpen}>
            {
                value &&
                <DialogTrigger asChild>
                    <Button mode="text" variant="primary" shade="200" status="default" size="M" content="icon-text">
                        <Edit />
                        Edit chapter
                    </Button>
                </DialogTrigger>
            }
            {
                !value &&
                <DialogTrigger asChild>
                    <Button mode="text" variant="accent" shade="200" status="default" size="M" content="icon">
                        <PlusCircle />
                        Add chapter
                    </Button>
                </DialogTrigger>
            }
            <DialogContent>
                { 
                    value &&  
                    <DialogHeader>
                        <DialogTitle>Edit Description</DialogTitle>
                        <DialogDescription>Use the field below to change the course description</DialogDescription>
                    </DialogHeader>                      
                }
                {
                    !value && 
                    <DialogHeader>                      
                        <DialogTitle>Create chapter</DialogTitle>
                        <DialogDescription>Use the fields below to create a new chapter</DialogDescription>
                    </DialogHeader>                       
                }
                <DialogBody>
                    <ChapterCreationForm 
                        courseId={id} 
                        actions={
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button shade="200" >Cancel</Button>
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