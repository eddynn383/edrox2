"use client"

import { useState } from "react";
import { Button, Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components";
import { ChapterCreationProps } from "./interface";
import { ChapterCreationForm } from "@/module/ChapterCreationForm"
import { Plus } from "lucide-react";
import ChaptersEditList from "../ChaptersEditList";
import msx from "@/styles/module.module.scss"

const ChapterCreation = ({ chapters, courseId }: ChapterCreationProps) => {
    const [open, setOpen] = useState(false)

    // console.log(open)
    return ( 
        <div className={msx["chapters"]}>
            <h2 className={msx["chapters-title"]}>Chapters</h2>
            <ChaptersEditList data={chapters} />
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button mode="solid" variant="primary" shade="200" status="default" size="M" >
                        <Plus /> Add chapter
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>New chapter</DialogTitle>
                    </DialogHeader>
                    <div>
                        <ChapterCreationForm 
                            courseId={courseId} 
                            actions={
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button shade="200" >Cancel</Button>
                                    </DialogClose>
                                    <Button variant="accent" type="submit">Create</Button>
                                </DialogFooter>
                            } 
                            onOpen={setOpen}
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default ChapterCreation