"use client"

import { Button, Dialog, DialogBody, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components";
import { Plus } from "lucide-react";
import { CourseCreationForm } from "../CourseCreationForm";
import { CourseCreationProps } from "./interface";
import { useState } from "react";
import dialog from "@/components/Dialog/dialog.module.css"

export const CourseCreation = ({categories}: CourseCreationProps) => {
    const [open, setOpen] = useState(false);

    return ( 
        <Dialog 
            open={open} 
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <Button mode="solid" variant="accent" status="default" size="M" >
                    <Plus /> New
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New Course</DialogTitle>
                    <DialogDescription>Use the fields below to create a new course</DialogDescription>
                </DialogHeader>
                <DialogBody>
                    <CourseCreationForm 
                        className={dialog.form}
                        categories={categories} 
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
                </DialogBody>
            </DialogContent>
        </Dialog>
    );
}