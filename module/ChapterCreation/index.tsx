"use client"

import { useState } from "react";
import { Button, Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components";
import { ChapterCreationProps } from "./interface";
import { ChapterCreationForm } from "@/module/ChapterCreationForm"
import { Plus } from "lucide-react";
import ChaptersEditList from "../ChaptersEditList";
import msx from "@/styles/module.module.scss"
import { Spinner } from "@/components/Spinner";

const ChapterCreation = ({ chapters, courseId }: ChapterCreationProps) => {
    const [open, setOpen] = useState(false)
    const [isPending, setIsPending] = useState(false)

    // console.log(open)
    return (
        <div className={msx["chapters"]}>
            {/* <ChaptersEditList data={chapters} /> */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button mode="text" variant="primary" status="default" content="icon" size="S" >
                        <Plus />
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
                                        <Button>Cancel</Button>
                                    </DialogClose>
                                    <Button status="brand" variant="accent" type="submit">{isPending ? <Spinner /> : "Create"}</Button>
                                </DialogFooter>
                            }
                            onPendingChange={(isPending) => {
                                setIsPending(isPending)
                            }}
                            onOpen={setOpen}
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default ChapterCreation