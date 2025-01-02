"use client"

import * as z from "zod";
import toast from "react-hot-toast";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components";
import { newCourse, updateCourse } from "@/actions/course";
import { NewCourseSchema } from "@/schemas";
import { FormRowDetails, FormRowFields, FormRows } from "@/components/Form";
import courseSX from "./course.module.css"

export const CourseCreationForm = ({ className, course, categories, actions, onOpen }: CourseCreationFormProps) => {
    const router = useRouter()
    const [isPending, startTransition] = useTransition();
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
            startTransition(() => {
                updateCourse(course.id, values).then((data) => {

                    if (data?.error) {
                        toast.error(data.error, { position: 'bottom-center' });
                    }

                    if (data?.success) {
                        onOpen(false)
                        toast.success(data.success, { position: 'bottom-center' });
                    }

                }).catch((error) => toast.error(error.message))
            })
        }
        if (!course) {
            newCourse(values).then((data) => {
                const course = data
                const courseId = course.data.id

                if (data?.error) {
                    toast.error(data.error, { position: 'bottom-center' });
                }

                if (data?.success) {
                    onOpen(false)
                    form.reset();
                    router.push(`/management/courses/${courseId}/edit`);
                    toast.success(data.success, { position: 'bottom-center' });
                }

            }).catch((error) => toast.error(error.message))
        }
    }

    return (
        <>
            <Form {...form}>
                <form id="course-creation-form" className={courseSX.form} onSubmit={form.handleSubmit(submitHandler)}>
                    <FormRows className={courseSX.rows}>
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => {
                                return (
                                    <FormItem data-cols="1">
                                        <FormRowDetails>
                                            <FormLabel>Title</FormLabel>
                                            <FormMessage />
                                        </FormRowDetails>
                                        <FormRowFields>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    shade="200"
                                                    type="text"
                                                    name="title"
                                                    mode="outline"
                                                    placeholder="Eg. Introduction in front-end technologies"
                                                    status={titleStatus}
                                                />
                                            </FormControl>
                                        </FormRowFields>
                                    </FormItem>
                                )
                            }}
                        />
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem data-cols="1">
                                    <FormRowDetails>
                                        <FormLabel>Category</FormLabel>
                                        <FormMessage />
                                    </FormRowDetails>
                                    <FormRowFields>
                                        <FormControl>
                                            <Select name="category" value={field.value} onValueChange={field.onChange} >
                                                <SelectTrigger mode="outline" size="M" shade="200" status={categoriesStatus} {...field}>
                                                    <SelectValue placeholder="Select category" />
                                                </SelectTrigger>
                                                <SelectContent side="top" mode="outline" shade="200">
                                                    {categories.map((item: any) => (
                                                        <SelectItem key={item.id} value={item.id}>
                                                            {item.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormRowFields>
                                </FormItem>
                            )}
                        />
                    </FormRows>
                    {actions}
                </form>
            </Form>
        </>
    );
}