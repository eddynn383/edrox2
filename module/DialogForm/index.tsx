"use client"


// How to use it

// <DialogForm 
//     title="Edit Course"
//     description="Use the fields below to edit the course"
//     trigger={
//         <Button mode="text" variant="accent" shade="200" status="default" size="M" content="icon">
//             Edit via dialog form
//         </Button>
//     }
//     form={
//         <CourseCreationForm 
//             course={course}
//             categories={categories} 
//             actions={
//                 <DialogFooter>
//                     <DialogClose asChild>
//                         <Button shade="200" >Cancel</Button>
//                     </DialogClose>
//                     <Button variant="accent" type="submit">Update</Button>
//                 </DialogFooter>
//             }
//         />
//     }
// />


import { useCallback, useState } from "react";
import { Dialog, DialogBody, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface DialogFormProps {
    title: string;
    description?: string;
    form?: any;
    trigger: any;
}

export const DialogForm = ({ title, description, form, trigger }: DialogFormProps) => {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    const isOpen = searchParams.get('modal') === "true"

    const test = searchParams.get('modal')
    // console.log(test)

    // console.log(isOpen)

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )

    return (
        <Dialog open={isOpen} onOpenChange={() => router.push(pathname + "?" + createQueryString("modal", "true"))}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogBody>
                    {form}
                </DialogBody>
            </DialogContent>
        </Dialog>
    );
}