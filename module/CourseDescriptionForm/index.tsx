"use client"

import * as z from "zod";
import toast from "react-hot-toast";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Textarea } from "@/components";
import { updateCourseDescription } from "@/actions/new-course";
import { CourseDescriptionSchema } from "@/schemas";
import csx from "@/styles/component.module.scss"
import { FormRowDetails, FormRowFields, FormRows } from "@/components/Form";
import { TriangleAlert } from "lucide-react";
import courseDesc from "./courseDesc.module.css"

export const CourseDescriptionForm = ({courseId, description, actions, onOpen, onPending}: CourseDescriptionFormProps) => { 
    // const router = useRouter()
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof CourseDescriptionSchema>>({
        resolver: zodResolver(CourseDescriptionSchema),
        defaultValues: {
            description: description ? description : ""
        }
    });

    // const descriptionState = form.getFieldState("description")
    // const descriptionStatus = !descriptionState.invalid ? "default" : "fail";


    const submitHandler = (values: z.infer<typeof CourseDescriptionSchema>) => {
        startTransition(() => {
            updateCourseDescription(courseId, values).then((data) => {

                if (data?.error) {
                    toast.error(data.error, { position: 'bottom-center'});
                }

                if (data?.success) {
                    form.reset();
                    onOpen(false)
                    toast.success(data.success, { position: 'bottom-center'});
                }

            }).catch((error) => toast.error(error.message))
        })
    }

    return (
        <>
            <Form {...form}>
                <form id="course-description-form" className={courseDesc.form} onSubmit={form.handleSubmit(submitHandler)}>                    
                    <FormRows className={courseDesc.rows}>
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem data-cols="1">
                                    <FormRowDetails>
                                        <FormLabel>Description</FormLabel>
                                        <FormMessage icon={<TriangleAlert />} />
                                    </FormRowDetails>
                                    <FormRowFields>
                                        <FormControl>
                                            <Textarea {...field} value={field.value} name="description" shade="200" placeholder="Add details here" resize="vertical" />
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