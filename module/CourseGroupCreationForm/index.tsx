"use client"

import * as z from "zod";
import toast from "react-hot-toast";
import { useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Textarea } from "@/components";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormRowDetails, FormRowFields, FormRows } from "@/components/Form";
import { NewCourseGroupSchema } from "@/schemas";
import { newCourseGroup } from "@/actions/group";
import group from "./group.module.css"

interface CourseGroupCreationFormProps {
    actions?: any;
    courseId: string;
    onOpen?: any;
    onPendingChange?: (isPending: boolean) => void;
}

const CourseGroupCreationForm = ({ actions, courseId, onOpen, onPendingChange }: CourseGroupCreationFormProps) => {
    const router = useRouter()
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof NewCourseGroupSchema>>({
        resolver: zodResolver(NewCourseGroupSchema),
        defaultValues: {
            name: "",
            description: ""
        }
    });

    const nameState = form.getFieldState("name")
    const nameStatus = !nameState.invalid ? "default" : "fail";

    const descriptionState = form.getFieldState("description")
    const descriptionStatus = !descriptionState.invalid ? "default" : "fail";

    useEffect(() => {
        if (onPendingChange) {
            onPendingChange(isPending);
        }
    }, [isPending, onPendingChange]);

    // const url = convertToURL(title)

    const submitHandler = (values: z.infer<typeof NewCourseGroupSchema>) => {

        startTransition(() => {
            newCourseGroup(values, courseId).then((data) => {

                if (data?.error) {
                    toast.error(data.error, { position: 'bottom-center' })
                }

                if (data?.success) {
                    onOpen(false)
                    form.reset();
                    toast.success(data.success, { position: 'bottom-center' })
                }

            }).catch(() => toast.error("Something went wrong!"))
        })
    }

    return (
        <>
            <Form {...form}>
                <form id="group-creation-form" className={group.form} onSubmit={form.handleSubmit(submitHandler)}>
                    <FormRows className={group.rows}>
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
                                                    placeholder="Eg. Design Team"
                                                    status={nameStatus}
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

export { CourseGroupCreationForm };