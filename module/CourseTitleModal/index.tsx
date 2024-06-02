"use client"

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button, Dialog, DialogBody, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components";
import { CourseCreationForm } from "../CourseCreationForm";

type Value = {
    course?: any;
    categories: any;
}

interface CourseTitleModalProps {
    id: string;
    value: Value;
}

export const CourseTitleModal = ({id, value}: CourseTitleModalProps) => {
    const [open, setOpen] = useState(false);

    const {course, categories} = value;

    return ( 
        <Dialog open={open} onOpenChange={setOpen}>
                {
                    course &&
                    <DialogTrigger asChild>
                        <Button mode="text" variant="accent" shade="200" status="default" size="M" content="icon">
                            Edit
                        </Button>
                    </DialogTrigger>
                }
                {
                    !course &&
                    <DialogTrigger asChild>
                        <Button mode="text" variant="accent" shade="200" status="default" size="M" content="icon">
                            <PlusCircle />
                            Create
                        </Button>
                    </DialogTrigger>
                }
            <DialogContent>                
                { 
                    course &&  
                    <DialogHeader>        
                        <DialogTitle>Edit course</DialogTitle>
                        <DialogDescription>Use the fields below to edit the course</DialogDescription>          
                    </DialogHeader>                      
                }
                {
                    !course && 
                    <DialogHeader>                        
                        <DialogTitle>Create course</DialogTitle>
                        <DialogDescription>Use the field below to add a course description</DialogDescription>
                    </DialogHeader>                       
                }
                <DialogBody>
                    <CourseCreationForm 
                        course={course}
                        categories={categories} 
                        actions={
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button shade="200" >Cancel</Button>
                                </DialogClose>
                                { 
                                    course &&  
                                    <Button variant="accent" type="submit">Update</Button>
                                }
                                { 
                                    !course &&  
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