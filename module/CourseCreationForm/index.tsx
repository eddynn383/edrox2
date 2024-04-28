"use client"

import * as z from "zod";
import toast from "react-hot-toast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components";
import { newCourse, updateCourse } from "@/actions/new-course";
import { NewCourseSchema } from "@/schemas";
import csx from "@/styles/component.module.scss"

export const CourseCreationForm = ({course, categories, actions, onOpen}: CourseCreationFormProps) => { 
    const router = useRouter()
    const [title, setTitle] = useState<string>("") 

    const form = useForm<z.infer<typeof NewCourseSchema>>({
        resolver: zodResolver(NewCourseSchema),
        defaultValues: {
            title: course ? course.title : "",
            category: course ? course.categoryId : ""
        }
    });

    const titleState = form.getFieldState("title")
    const titleStatus = !titleState.invalid ? "default" : "fail";

    
    const categoriesState = form.getFieldState("category")
    const categoriesStatus = !categoriesState.invalid ? "default" : "fail";

    const submitHandler = (values: z.infer<typeof NewCourseSchema>) => {
        if (course) {
            updateCourse(course.id, values).then((data) => {
    
                if (data?.error) {
                    toast.error(data.error, { position: 'bottom-center'});
                }
    
                if (data?.success) {
                    form.reset();
                    // onOpen(false);
                    toast.success(data.success, { position: 'bottom-center'});
                }
    
            }).catch((error) => toast.error(error.message))
        }
        if (!course) {
            newCourse(values).then((data) => {
                const course = data
                const courseId = course.data.id

                if (data?.error) {
                    toast.error(data.error, { position: 'bottom-center'});
                }

                if (data?.success) {
                    form.reset();
                    router.push(`/admin/courses/edit/${courseId}/details`);
                    toast.success(data.success, { position: 'bottom-center'});
                }

            }).catch((error) => toast.error(error.message))
        }
    }

    return (
        <>
            <Form {...form}>
                <form className={csx["form"]} onSubmit={form.handleSubmit(submitHandler)}>
                    <div className={csx["form-rows"]}>

                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => {
                                setTitle(field.value)
                                
                                return (
                                    <FormItem data-cols="1">
                                        <div className={csx["form-row-details"]} style={{"display": "flex", "gap": "8px", "justifyContent": "space-between"}}>
                                            <FormLabel>Title</FormLabel>
                                        </div>
                                        <FormControl>
                                            <div className={csx["form-field"]}>
                                                <Input
                                                    {...field}
                                                    shade="200"
                                                    type="text"
                                                    name="title"
                                                    placeholder="Eg. Introduction in front-end technologies"
                                                    status={titleStatus}
                                                />
                                                <FormMessage icon="alert-triangle" />
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                )
                            }}
                        />
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem data-cols="1">
                                    <div className={csx["form-row-details"]} style={{"display": "flex", "gap": "8px", "justifyContent": "space-between"}}>
                                        <FormLabel>Category</FormLabel>
                                    </div>
                                    <FormControl>
                                        <div className={csx["form-field"]}>
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
                                            <FormMessage icon="alert-triangle" />
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    {actions}
                </form>
            </Form>
        </>
    );
}