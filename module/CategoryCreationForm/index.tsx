"use client"

import * as z from "zod";
import toast from "react-hot-toast";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components";
import { newCourse, updateCourse } from "@/actions/course";
import { NewCategorySchema, NewCourseSchema } from "@/schemas";
import { FormRowDetails, FormRowFields, FormRows } from "@/components/Form";
import categorySX from "./category.module.css"
import { newCategory, updateCategory } from "@/actions/categories";

export const CategoryCreationForm = ({ className, category, actions, onOpen, onPendingChange }: CategoryCreationFormProps) => {
    const router = useRouter()
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof NewCategorySchema>>({
        resolver: zodResolver(NewCategorySchema),
        defaultValues: {
            name: category?.name || ""
        }
    });

    const nameState = form.getFieldState("name")
    const nameStatus = !nameState.invalid ? "default" : "fail";

    useEffect(() => {
        if (onPendingChange) {
            onPendingChange(isPending);
        }
    }, [isPending, onPendingChange]);

    const submitHandler = (values: z.infer<typeof NewCategorySchema>) => {
        if (category) {
            startTransition(() => {
                updateCategory(category.id, values).then((data) => {

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
        if (!category) {
            newCategory(values).then((data) => {
                const category = data

                if (data?.error) {
                    toast.error(data.error, { position: 'bottom-center' });
                }

                if (data?.success) {
                    onOpen(false)
                    form.reset();
                    toast.success(data.success, { position: 'bottom-center' });
                }

            }).catch((error) => toast.error(error.message))
        }
    }

    return (
        <>
            <Form {...form}>
                <form id="course-creation-form" className={categorySX.form} onSubmit={form.handleSubmit(submitHandler)}>
                    <FormRows className={categorySX.rows}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => {
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
                                                    shade="200"
                                                    type="text"
                                                    name="name"
                                                    placeholder="Eg. Business"
                                                    status={nameStatus}
                                                />
                                            </FormControl>
                                        </FormRowFields>
                                    </FormItem>
                                )
                            }}
                        />
                    </FormRows>
                    {actions}
                </form>
            </Form>
        </>
    );
}