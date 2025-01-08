"use client"

import { useState } from "react";
import { Button, Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components";
import { CourseChapterCreationProps } from "./interface";
import { CourseChapterCreationForm } from "@/module/CourseChapterCreationForm";
import { Spinner } from "@/components/Spinner";
import msx from "@/styles/module.module.scss"

const CourseChapterCreation = ({ courseId, children }: CourseChapterCreationProps) => {
    const [open, setOpen] = useState(false)
    const [isPending, setIsPending] = useState(false)

    // console.log(open)
    return (
        <div className={msx["chapters"]}>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>New chapter</DialogTitle>
                    </DialogHeader>
                    <div>
                        <CourseChapterCreationForm
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

export { CourseChapterCreation }