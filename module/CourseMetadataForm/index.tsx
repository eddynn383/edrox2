"use client"

import * as z from "zod";
import toast from "react-hot-toast";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@/components";
import { updateCourseMetadata } from "@/actions/course";
import { CourseMetadataSchema } from "@/schemas";
import { FormRowDetails, FormRowFields, FormRows } from "@/components/Form";
import { TriangleAlert } from "lucide-react";
import courseSx from "./course-metadata.module.css"

export const CourseMetadataForm = ({ courseId, key, value, actions, onOpen, onPending }: CourseMetadataFormProps) => {
    // const router = useRouter()
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof CourseMetadataSchema>>({
        resolver: zodResolver(CourseMetadataSchema),
        defaultValues: {
            key: key ? key : "",
            value: value ? value : ""
        }
    });

    // const descriptionState = form.getFieldState("description")
    // const descriptionStatus = !descriptionState.invalid ? "default" : "fail";


    const submitHandler = (values: z.infer<typeof CourseMetadataSchema>) => {

        // console.log(values)

        startTransition(() => {
            updateCourseMetadata(courseId, values).then((data) => {

                // console.log("data after submit: ", data.data)

                if (data?.error) {
                    toast.error(data.error, { position: 'bottom-center' });
                }

                if (data?.success) {
                    form.reset();
                    onOpen(false)
                    toast.success(data.success, { position: 'bottom-center' });
                }

            }).catch((error) => toast.error(error.message))
        })
    }

    return (
        <>
            <Form {...form}>
                <form id="course-description-form" className={courseSx.form} onSubmit={form.handleSubmit(submitHandler)}>
                    <FormRows className={courseSx.rows}>
                        <FormField
                            control={form.control}
                            name="key"
                            render={({ field }) => (
                                <FormItem data-cols="1">
                                    <FormRowDetails>
                                        <FormLabel>Key</FormLabel>
                                        <FormMessage icon={<TriangleAlert />} />
                                    </FormRowDetails>
                                    <FormRowFields>
                                        <FormControl>
                                            <Input {...field} value={field.value} name="key" shade="200" placeholder="Eg. Location" />
                                        </FormControl>
                                    </FormRowFields>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="value"
                            render={({ field }) => (
                                <FormItem data-cols="1">
                                    <FormRowDetails>
                                        <FormLabel>Value</FormLabel>
                                        <FormMessage icon={<TriangleAlert />} />
                                    </FormRowDetails>
                                    <FormRowFields>
                                        <FormControl>
                                            <Input {...field} value={field.value} name="value" shade="200" placeholder="Eg. Craiova" />
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