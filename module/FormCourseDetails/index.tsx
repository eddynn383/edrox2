"use client"

import * as z from "zod";
import { Suspense, useEffect, useState, useTransition } from "react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea } from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NewCourseSchema } from "@/schemas";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { newCourse } from "@/actions/new-course";
import sxc from "@/styles/component.module.scss"
import sxm from "@/styles/module.module.scss"

interface FormCourseDetailsProps {
    categories?: any;
    defaultValues?: any;
}

const FormCourseDetails = ({ defaultValues, categories }: FormCourseDetailsProps) => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const step = searchParams.get('step')

    console.log(pathname)
    console.log(searchParams.get("url"))

    if (!step) {
        router.push(`${pathname}?id=${id}&step=1`) 
    }

    console.log("defaultValues: ", defaultValues)

    const form = useForm<z.infer<typeof NewCourseSchema>>({
        resolver: zodResolver(NewCourseSchema),
        defaultValues
    });

    console.log(form.getValues())
    const submitHandler = (values: z.infer<typeof NewCourseSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            newCourse(values).then((data) => {
                console.log(data)

                if (data?.error) {
                    setError(data.error)
                }

                if (data?.success) {
                    form.reset();
                    setSuccess(data.success)
                }
                console.log("error", error)
                console.log("success", success)
            }).catch(() => setError("Something went wrong!"))
        })
    }

    return (
        <>
            <div className={sxm["page-content-left"]}>
                <Form {...form}>
                    <form className="form" onSubmit={form.handleSubmit(submitHandler)}>
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem data-cols="2">
                                    <div className={sxc["form-item-details"]}>
                                        <FormLabel>Title</FormLabel>
                                        {<FormDescription>Define the course title</FormDescription>}
                                        {<FormMessage icon="alert-triangle" />}
                                    </div>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            shade="200"
                                            type="text"
                                            name="title"
                                            placeholder="Eg. Introduction in front-end technologies"
                                        // status={!success && !error ? "default" : success && !error ? "success" : !success && error ? "error" : "default"}
                                        />

                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem data-cols="2">
                                    <div className={sxc["form-item-details"]}>
                                        <FormLabel>Description</FormLabel>
                                        {<FormDescription>Define the course description</FormDescription>}
                                        {<FormMessage icon="alert-triangle" />}
                                    </div>
                                    <FormControl>
                                        <Textarea {...field} value={field.value} name="description" shade="200" placeholder="Add details here" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => {
                                console.log(field.value)

                                return (
                                <FormItem data-cols="2">
                                    <div className={sxc["form-item-details"]}>
                                        <FormLabel>Category</FormLabel>
                                        {<FormDescription>Choose one option from the list</FormDescription>}
                                        {<FormMessage icon="alert-triangle" />}
                                    </div>
                                    <FormControl>
                                        <div>
                                            <Select name="category" value={field.value} onValueChange={field.onChange} >
                                                <SelectTrigger mode="outline" size="M" shade="200">
                                                    <SelectValue placeholder="Select category" />
                                                </SelectTrigger>
                                                <SelectContent side="top" shade="200">
                                                    {categories.map((item: any) => (
                                                        <SelectItem key={item.id} value={item.name}>
                                                            {item.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}}
                        />
                    </form>
                </Form>
            </div>
            <div className={sxm["page-content-right"]}>
                <p>Right Panels</p>
            </div>
        </>
    );
}
 
export default FormCourseDetails;