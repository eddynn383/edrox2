"use client"

import { useState } from "react";
import { Button, Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components";
import { CourseGroupCreationProps } from "./interface";
import { CourseGroupCreationForm } from "@/module/CourseGroupCreationForm";
import { Plus } from "lucide-react";
import { Spinner } from "@/components/Spinner";
import msx from "@/styles/module.module.scss"

const CourseGroupCreation = ({ courseId, children }: CourseGroupCreationProps) => {
    const [open, setOpen] = useState(false)
    const [isPending, setIsPending] = useState(false)

    // console.log(open)
    return (
        <div className={msx["groups"]}>
            {/* <ChaptersEditList data={chapters} /> */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>New group</DialogTitle>
                    </DialogHeader>
                    <div>
                        <CourseGroupCreationForm
                            courseId={courseId}
                            actions={
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button mode="text">Cancel</Button>
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

export { CourseGroupCreation }