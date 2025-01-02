"use client"

import * as z from "zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Switch } from "@/components";
import { newCourse, updateCourse, updateCourseSettings } from "@/actions/course";
import { CourseSettingsSchema, NewCourseSchema } from "@/schemas";
import { FormDescription, FormRowDetails, FormRowFields, FormRows } from "@/components/Form";
import courseSX from "./course.module.css"

export const CourseSettingsForm = ({ id, settings }: CourseSettingsFormProps) => {
    const router = useRouter()
    const [isPending, startTransition] = useTransition();
    const { date, repetition, price, seats, tags } = settings

    const form = useForm<z.infer<typeof CourseSettingsSchema>>({
        resolver: zodResolver(CourseSettingsSchema),
        defaultValues: {
            date: date || false,
            repetition: repetition || false,
            price: price || false,
            seats: seats || false,
            tags: tags || false
        }
    });

    const submitHandler = (values: z.infer<typeof CourseSettingsSchema>) => {
        console.log("====== FORM WAS UPDATED =======")

        updateCourseSettings(id, values)

        // .then((data) => {



        // }).catch((error) => toast.error(error.message))

        console.log(values)
        // if (course) {
        //     startTransition(() => {
        //         updateCourse(course.id, values).then((data) => {

        //             if (data?.error) {
        //                 toast.error(data.error, { position: 'bottom-center' });
        //             }

        //             if (data?.success) {
        //                 onOpen(false)
        //                 toast.success(data.success, { position: 'bottom-center' });
        //             }

        //         }).catch((error) => toast.error(error.message))
        //     })
        // }
        // if (!course) {
        //     newCourse(values).then((data) => {
        //         const course = data
        //         const courseId = course.data.id

        //         if (data?.error) {
        //             toast.error(data.error, { position: 'bottom-center' });
        //         }

        //         if (data?.success) {
        //             form.reset();
        //             router.push(`/management/courses/${courseId}/edit`);
        //             toast.success(data.success, { position: 'bottom-center' });
        //         }

        //     }).catch((error) => toast.error(error.message))
        // }
    }

    return (
        <>
            <Form {...form}>
                <form id="course-creation-form" className={courseSX.form} onChange={form.handleSubmit(submitHandler)}>
                    <FormRows >
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => {
                                return (
                                    <FormItem orientation="horizontal">
                                        <FormRowDetails>
                                            <FormLabel>Date</FormLabel>
                                            <FormDescription>Define a start and date for the course</FormDescription>
                                            <FormMessage />
                                        </FormRowDetails>
                                        <FormRowFields>
                                            <FormControl>
                                                <Switch
                                                    name="date"
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormRowFields>
                                    </FormItem>
                                )
                            }}
                        />
                        <FormField
                            control={form.control}
                            name="repetition"
                            render={({ field }) => {
                                return (
                                    <FormItem orientation="horizontal">
                                        <FormRowDetails>
                                            <FormLabel>Repetition</FormLabel>
                                            <FormDescription>Define when the learner can repeat the course</FormDescription>
                                            <FormMessage />
                                        </FormRowDetails>
                                        <FormRowFields>
                                            <FormControl>
                                                <Switch
                                                    name="repetition"
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormRowFields>
                                    </FormItem>
                                )
                            }}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => {
                                return (
                                    <FormItem orientation="horizontal">
                                        <FormRowDetails>
                                            <FormLabel>Price</FormLabel>
                                            <FormDescription>Define the course price and discount</FormDescription>
                                            <FormMessage />
                                        </FormRowDetails>
                                        <FormRowFields>
                                            <FormControl>
                                                <Switch
                                                    name="price"
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormRowFields>
                                    </FormItem>
                                )
                            }}
                        />
                        <FormField
                            control={form.control}
                            name="seats"
                            render={({ field }) => {
                                return (
                                    <FormItem orientation="horizontal">
                                        <FormRowDetails>
                                            <FormLabel>Seats</FormLabel>
                                            <FormDescription>Define the amount of seats available for the course</FormDescription>
                                            <FormMessage />
                                        </FormRowDetails>
                                        <FormRowFields>
                                            <FormControl>
                                                <Switch
                                                    name="seats"
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormRowFields>
                                    </FormItem>
                                )
                            }}
                        />
                        <FormField
                            control={form.control}
                            name="tags"
                            render={({ field }) => {
                                return (
                                    <FormItem orientation="horizontal">
                                        <FormRowDetails>
                                            <FormLabel>Tags</FormLabel>
                                            <FormDescription>Define the tags used for search</FormDescription>
                                            <FormMessage />
                                        </FormRowDetails>
                                        <FormRowFields>
                                            <FormControl>
                                                <Switch
                                                    name="tags"
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormRowFields>
                                    </FormItem>
                                )
                            }}
                        />
                    </FormRows>
                    {/* {actions} */}
                </form>
            </Form>
        </>
    );
}