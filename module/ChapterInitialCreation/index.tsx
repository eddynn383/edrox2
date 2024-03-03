"use client"

import * as z from "zod";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea } from "@/components";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/Form";
import { newInitCourse } from "@/actions/new-course";
import { NewInitChapterSchema } from "@/schemas";
import sx from "@/styles/component.module.scss"
import { convertToURL } from "@/lib/utils";
import { newInitChapter } from "@/actions/new-chapter";

interface ChapterInitialCreationProps {
    actions?: any;
    courseId: string;
    onOpen?: any
}



const CourseInitialCreation = ({actions, courseId, onOpen}: ChapterInitialCreationProps) => { 
    const router = useRouter()
    const [title, setTitle] = useState<string>("") 

    const form = useForm<z.infer<typeof NewInitChapterSchema>>({
        resolver: zodResolver(NewInitChapterSchema),
        defaultValues: {
            title: "",
            url: "",
            description: ""
        }
    });


    const titleState = form.getFieldState("title")
    const titleStatus = !titleState.invalid ? "default" : "fail";
    
    const urlState = form.getFieldState("url")
    const urlStatus = !urlState.invalid ? "default" : "fail";
    
    const descriptionState = form.getFieldState("description")
    const descriptionStatus = !descriptionState.invalid ? "default" : "fail";

    const url = convertToURL(title)

    const submitHandler = (values: z.infer<typeof NewInitChapterSchema>) => {
        const newValues = {
            ...values,
            url
        }

        newInitChapter(newValues, courseId).then((data) => {
            // const course = data
            // const courseId = course.data.id

            if (data?.error) {
                toast.error(data.error, { position: 'bottom-center'})
            }

            if (data?.success) {
                form.reset();
                onOpen(false)
                // router.push(`/admin/courses/new?id=${courseId}&step=2`) 
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
                                    <div className={sx["form-item-details"]} style={{"display": "flex", "gap": "8px", "justifyContent": "space-between"}}>
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
                                            <p style={{"color": `${urlStatus !== "default" ? "var(--accent-fail-400)" : "var(--primary-text-600)"}`}}>/chapters/{url ? url : "..."}</p>
                                        </>
                                    </FormControl>
                                </FormItem>
                        )}}
                    />
                    <FormField
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                            <FormItem data-cols="1">
                                <FormControl>
                                    <input 
                                        {...field}
                                        type="text"
                                        name="url"
                                        hidden
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem data-cols="1">
                                <div className={sx["form-item-details"]}>
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

export default CourseInitialCreation;