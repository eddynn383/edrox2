"use client"

import * as z from "zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Textarea } from "@/components";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormRowDetails, FormRowFields, FormRows } from "@/components/Form";
import { NewCourseChapterSchema } from "@/schemas";
import { newInitChapter, updateChapter, useChapterById } from "@/actions/chapter";
import { useEffect, useTransition } from "react";
import chapterSx from "./chapter.module.css"

interface CourseChapterCreationFormProps {
    chapter?: any;
    actions?: any;
    courseId: string;
    onOpen?: any;
    edit?: boolean;
    onPendingChange?: (isPending: boolean) => void;
}

const CourseChapterCreationForm = ({ chapter, actions, courseId, onOpen, edit = false, onPendingChange }: CourseChapterCreationFormProps) => {
    const router = useRouter()
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof NewCourseChapterSchema>>({
        resolver: zodResolver(NewCourseChapterSchema),
        defaultValues: {
            name: chapter?.name || "",
            description: chapter?.description || ""
        }
    });

    const titleState = form.getFieldState("name")
    const titleStatus = !titleState.invalid ? "default" : "fail";

    const descriptionState = form.getFieldState("description")
    const descriptionStatus = !descriptionState.invalid ? "default" : "fail";

    useEffect(() => {
        if (onPendingChange) {
            onPendingChange(isPending);
        }
    }, [isPending, onPendingChange]);

    // const url = convertToURL(title)

    const submitHandler = (values: z.infer<typeof NewCourseChapterSchema>) => {
        startTransition(() => {
            if (!edit) {
                newInitChapter(values, courseId).then((data) => {

                    if (data?.error) {
                        toast.error(data.error, { position: 'bottom-center' })
                    }

                    if (data?.success) {
                        onOpen(false)
                        form.reset();
                        toast.success(data.success, { position: 'bottom-center' })
                    }

                }).catch(() => toast.error("Something went wrong!"))
            } else {
                updateChapter(chapter.id, values).then((data) => {

                    if (data?.error) {
                        toast.error(data.error, { position: 'bottom-center' })
                    }

                    if (data?.success) {
                        onOpen(false)
                        form.reset();
                        toast.success(data.success, { position: 'bottom-center' })
                    }

                }).catch(() => toast.error("Something went wrong!"))
            }
        })
    }

    return (
        <>
            <Form {...form}>
                <form id="chapter-creation-form" className={chapterSx.form} onSubmit={form.handleSubmit(submitHandler)}>
                    <FormRows className={chapterSx.rows}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => {
                                // setTitle(field.value)

                                return (
                                    <FormItem data-cols="1">
                                        <FormRowDetails>
                                            <FormLabel>Name</FormLabel>
                                            <FormMessage />
                                        </FormRowDetails>
                                        <FormRowFields>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    mode="outline"
                                                    shade="200"
                                                    type="text"
                                                    name="name"
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
                            name="description"
                            render={({ field }) => (
                                <FormItem data-cols="1">
                                    <FormRowDetails>
                                        <FormLabel>Description</FormLabel>
                                        <FormMessage />
                                    </FormRowDetails>
                                    <FormRowFields>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                value={field.value}
                                                name="description"
                                                mode="outline"
                                                shade="200"
                                                placeholder="Add details here"
                                                resize="vertical"
                                                status={descriptionStatus}
                                            />
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

export { CourseChapterCreationForm };