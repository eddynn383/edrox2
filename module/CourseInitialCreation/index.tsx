"use client"

import * as z from "zod";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/Form";
import { newInitCourse } from "@/actions/new-course";
import { NewInitCourseSchema } from "@/schemas";
import sx from "@/styles/component.module.scss"

interface CourseInitialCreationProps {
    categories?: any;
    actions?: any;
}

const convertToURL = (title: string) => {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};

const CourseInitialCreation = ({categories, actions}: CourseInitialCreationProps) => { 
    const router = useRouter()
    const [title, setTitle] = useState<string>("") 

    const form = useForm<z.infer<typeof NewInitCourseSchema>>({
        resolver: zodResolver(NewInitCourseSchema),
        defaultValues: {
            title: "",
            url: "",
            category: ""
        }
    });


    const titleState = form.getFieldState("title")
    const titleStatus = !titleState.invalid ? "default" : "fail";
    
    const urlState = form.getFieldState("url")
    const urlStatus = !urlState.invalid ? "default" : "fail";
    
    const categoriesState = form.getFieldState("category")
    const categoriesStatus = !categoriesState.invalid ? "default" : "fail";

    const url = convertToURL(title)

    const submitHandler = (values: z.infer<typeof NewInitCourseSchema>) => {
        const newValues = {
            ...values,
            url
        }

        newInitCourse(newValues).then((data) => {
            const course = data
            const courseId = course.data.id

            if (data?.error) {
                toast.error(data.error, { position: 'bottom-center'})
            }

            if (data?.success) {
                form.reset();
                router.push(`/admin/courses/new?id=${courseId}&step=2`) 
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
                                            <p style={{"color": `${urlStatus !== "default" ? "var(--accent-fail-400)" : "var(--primary-text-600)"}`}}>/{url}</p>
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
                        name="category"
                        render={({ field }) => (
                            <FormItem data-cols="1">
                                <div className={sx["form-item-details"]} style={{"display": "flex", "gap": "8px", "justifyContent": "space-between"}}>
                                    <FormLabel>Category</FormLabel>
                                    <FormMessage icon="alert-triangle" />
                                </div>
                                <FormControl>
                                    <Select name="category" value={field.value} onValueChange={field.onChange} >
                                        <SelectTrigger mode="outline" size="M" shade="200" status={categoriesStatus} {...field}>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent side="top" shade="200">
                                            {categories.map((item: any) => (
                                                <SelectItem key={item.id} value={item.id}>
                                                    {item.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
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