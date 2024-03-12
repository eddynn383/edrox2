"use client"

import * as z from "zod";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea } from "@/components";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/Form";
import { NewChapterSchema } from "@/schemas";
import { convertToURL } from "@/lib/utils";
import { newInitChapter } from "@/actions/new-chapter";
import csx from "@/styles/component.module.scss"

interface ChapterCreationFormProps {
    actions?: any;
    courseId: string;
    onOpen?: any
}



const ChapterCreationForm = ({actions, courseId, onOpen}: ChapterCreationFormProps) => { 
    const router = useRouter()
    const [title, setTitle] = useState<string>("") 

    const form = useForm<z.infer<typeof NewChapterSchema>>({
        resolver: zodResolver(NewChapterSchema),
        defaultValues: {
            title: "",
            description: ""
        }
    });


    const titleState = form.getFieldState("title")
    const titleStatus = !titleState.invalid ? "default" : "fail";
    
    const descriptionState = form.getFieldState("description")
    const descriptionStatus = !descriptionState.invalid ? "default" : "fail";

    // const url = convertToURL(title)

    const submitHandler = (values: z.infer<typeof NewChapterSchema>) => {
        // const newValues = {
        //     ...values,
        //     url
        // }

        newInitChapter(values, courseId).then((data) => {

            if (data?.error) {
                toast.error(data.error, { position: 'bottom-center'})
            }

            if (data?.success) {
                form.reset();
                onOpen(false)
                toast.success(data.success, { position: 'bottom-center'})
            }

        }).catch(() => toast.error("Something went wrong!"))
    }

    return (
        <>
            <Form {...form}>
                <form className="form" style={{"display": "grid", "gap": "16px"}} onSubmit={form.handleSubmit(submitHandler)}>
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => {
                            setTitle(field.value)
                            
                            return (
                                <FormItem data-cols="1">
                                    <div className={csx["form-row-details"]} style={{"display": "flex", "gap": "8px", "justifyContent": "space-between"}}>
                                        <FormLabel>Title</FormLabel>
                                        <FormMessage icon="alert-triangle" />
                                    </div>
                                    <FormControl>
                                        <>
                                            <Input
                                                {...field}
                                                shade="200"
                                                type="text"
                                                name="title"
                                                placeholder="Eg. Introduction in front-end technologies"
                                                status={titleStatus}
                                            />
                        
                                        </>
                                    </FormControl>
                                </FormItem>
                        )}}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem data-cols="1">
                                <div className={csx["form-row-details"]}>
                                    <FormLabel>Description</FormLabel>
                                    {<FormMessage icon="alert-triangle" />}
                                </div>
                                <FormControl>
                                    <Textarea {...field} value={field.value} name="description" shade="200" placeholder="Add details here" resize="vertical" status={descriptionStatus} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {actions}
                </form>
            </Form>
        </>
    );
}

export { ChapterCreationForm };