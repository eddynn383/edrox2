"use client"

import * as z from "zod";
import { useEffect, useState, useTransition } from "react";
import { Alert, AlertDescription, Button, Icon, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea } from "@/components";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NewCourseSchema } from "@/schemas";
import { newCourse } from "@/actions/new-course";
import sx from "@/styles/component.module.scss"

interface CourseCreationProps {
    categories?: any
}

const CourseCreation = ({categories}: CourseCreationProps) => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();


    const form = useForm<z.infer<typeof NewCourseSchema>>({
        resolver: zodResolver(NewCourseSchema),
        defaultValues: {
            title: "",
            description: ""
            // category: "",
            // image: "",
        }
    });

    const submitHandler = (values: z.infer<typeof NewCourseSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            newCourse(values).then((data) => {
                console.log(data)
                if (data?.error) {
                    form.reset();
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

    // const { errors } = form.formState

    // console.log(errors)

    // useEffect(() => {
    //     console.log("ERROR: ", error)
    //     console.log("SUCCESS: ", success)
    // }, [error, success])

    // console.log(error)

    // CONTINUEEEEE HEEEREEEE!!!!!!!!!!!!!!!!!

    return (
        <>
            {
                error &&
                <Alert mode="text" status="fail">
                    <AlertDescription>
                        <Icon name="alert-circle" size={20} />
                        <span>{error}</span>
                    </AlertDescription>
                </Alert>
            }
            {
                success &&
                <Alert mode="text" status="success">
                    <AlertDescription>
                        <Icon name="check-circle" size={20} />
                        <span>{success}</span>
                    </AlertDescription>
                </Alert>
            }
            <Form {...form}>
                <form className="form" onSubmit={form.handleSubmit(submitHandler)}>
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem data-cols="2">
                                <div className={sx["form-item-details"]}>
                                    <FormLabel>Title</FormLabel>
                                    {!error && <FormDescription>Define the course title</FormDescription>}
                                    {error && <FormMessage icon="alert-triangle" />}
                                </div>
                                <FormControl>
                                    <Input
                                        {...field}
                                        shade="200"
                                        type="text"
                                        name="title"
                                        required={true}
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
                                <div className={sx["form-item-details"]}>
                                    <FormLabel>Description</FormLabel>
                                    {!error && <FormDescription>Define the course description</FormDescription>}
                                    {error && <FormMessage icon="alert-triangle" />}
                                </div>
                                <FormControl>
                                    <Textarea {...field} name="description" shade="200" placeholder="Add details here" />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="categories"
                        render={({ field }) => (
                            <FormItem data-cols="2">
                                <div className={sx["form-item-details"]}>
                                    <FormLabel>Category</FormLabel>
                                    {!error && <FormDescription>Choose one option from the list</FormDescription>}
                                    {error && <FormMessage icon="alert-triangle" />}
                                </div>
                                <FormControl>
                                    <div>
                                        <Select value={field.value} onValueChange={field.onChange} >
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
                        )}
                    />
                </form>
            </Form>
        </>
    );
}

export default CourseCreation;