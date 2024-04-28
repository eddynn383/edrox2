"use client"

import * as z from "zod";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Textarea } from "@/components";
import { updateCourseDescription } from "@/actions/new-course";
import { CourseDescriptionSchema } from "@/schemas";
import csx from "@/styles/component.module.scss"
import { revalidateTag } from "next/cache";
import router from "next/router";

export const CourseDescriptionForm = ({courseId, description, actions, onOpen}: CourseDescriptionFormProps) => { 
    const router = useRouter()

    const form = useForm<z.infer<typeof CourseDescriptionSchema>>({
        resolver: zodResolver(CourseDescriptionSchema),
        defaultValues: {
            description: description ? description : ""
        }
    });

    // const descriptionState = form.getFieldState("description")
    // const descriptionStatus = !descriptionState.invalid ? "default" : "fail";


    const submitHandler = (values: z.infer<typeof CourseDescriptionSchema>) => {
        updateCourseDescription(courseId, values).then((data) => {

            if (data?.error) {
                toast.error(data.error, { position: 'bottom-center'});
            }

            if (data?.success) {
                form.reset();
                // onOpen(false)
                toast.success(data.success, { position: 'bottom-center'});
            }

        }).catch((error) => toast.error(error.message))
    }

    return (
        <>
            <Form {...form}>
                <form className={csx["form"]} onSubmit={form.handleSubmit(submitHandler)}>
                    <div className={csx["form-rows"]}>

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem data-cols="1">
                                    <FormLabel>Description</FormLabel>
                                    <FormMessage icon="alert-triangle" />
                                    <FormControl>
                                        <Textarea {...field} value={field.value} name="description" shade="200" placeholder="Add details here" resize="vertical" />
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