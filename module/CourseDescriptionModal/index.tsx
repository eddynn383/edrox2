"use client"

import { Button, Dialog, DialogBody, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components";
import { CourseDescriptionForm } from "../CourseDescriptionForm";
import { useState } from "react";
import { PlusCircle } from "lucide-react";

interface CourseDescriptionModalProps {
    id: string;
    value?: string;
}

export const CourseDescriptionModal = ({id, value}: CourseDescriptionModalProps) => {
    const [open, setOpen] = useState(false);

    return ( 
        <Dialog open={open} onOpenChange={setOpen}>
            {
                value &&
                <DialogTrigger asChild>
                    <Button mode="text" variant="accent" shade="200" status="default" size="M" content="icon">
                        Edit
                    </Button>
                </DialogTrigger>
            }
            {
                !value &&
                <DialogTrigger asChild>
                    <Button mode="text" variant="accent" shade="200" status="default" size="M" content="icon">
                        <PlusCircle />
                        Add description
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
                        <DialogTitle>Add description</DialogTitle>
                        <DialogDescription>Use the field below to add a course description</DialogDescription>
                    </DialogHeader>                       
                }
                <DialogBody>
                    <CourseDescriptionForm 
                        courseId={id}
                        description={value} 
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
                                    <Button variant="accent" type="submit">Save</Button>
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