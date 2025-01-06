"use client"

import toast from "react-hot-toast";
import { useEffect } from "react";
import { Link, DatePicker, Dropzone, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea, UploadImage } from "@/components";
import { FormRowDetails, FormRowFields, FormRows } from "@/components/Form";
import courseSX from "./course.module.css"
import { newImage } from "@/actions/image";
import { useDebouncedCourseSave } from "@/hooks/useAutoSave";
import { useCourseForm } from "@/hooks/useCourseForm";
import { Plus } from "lucide-react";

export const CourseCreationFullForm2 = ({ className, course, categories, settings, actions, onOpen }: CourseCreationFullFormProps) => {

    const { form, formValues } = useCourseForm(course)

    const { debouncedSave } = useDebouncedCourseSave(form)

    const { isDirty } = form.formState;

    useEffect(() => {
        if (!isDirty) return; // Only auto-save if there are changes

        debouncedSave(course.id);

        return () => debouncedSave.cancel();
    }, [formValues]);

    const titleState = form.getFieldState("title")
    const titleStatus = !titleState.invalid ? "default" : "fail";

    const descriptionState = form.getFieldState("description")
    const descriptionStatus = !descriptionState.invalid ? "default" : "fail";

    const categoriesState = form.getFieldState("category")
    const categoriesStatus = !categoriesState.invalid ? "default" : "fail";



    // console.log("default values: ", defaultValues);

    const uploadImage = async (image: any) => {

        newImage(image).then((data) => {

            // console.log("COURSE FORM IMAGE: ", data.data.id)

            form.setValue("image", data.data.id, { shouldDirty: true })

            if (data?.error) {
                toast.error(data.error, { position: 'bottom-center' });
            }

            if (data?.success) {
                toast.success(data.success, { position: 'bottom-center' });

            }

        }).catch((error) => toast.error(error.message))
    }

    const addSubCategoryHandlder = () => {

    }

    return (
        <>
            <Form {...form}>
                <form id="course-creation-form" className={courseSX.form}>
                    <FormRows>
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => {
                                return (
                                    <FormItem data-cols="1">
                                        <FormRowDetails>
                                            <FormLabel required>Title</FormLabel>
                                            <FormMessage />
                                        </FormRowDetails>
                                        <FormRowFields>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    mode="outline"
                                                    shade="200"
                                                    sizes="M"
                                                    type="text"
                                                    name="title"
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
                                            <Textarea {...field} name="description" mode="outline" shade="200" sizes="M" placeholder="Add details here" resize="vertical" status={descriptionStatus} />
                                        </FormControl>
                                    </FormRowFields>
                                </FormItem>
                            )}
                        />
                        <FormRows orientation="horizontal">
                            <FormRows orientation="horizontal">
                                <FormField
                                    control={form.control}
                                    name="image"
                                    render={({ field }) => {

                                        return (
                                            <FormItem data-cols="1" style={{ width: "100%" }}>
                                                <FormRowDetails>
                                                    <FormLabel>Preview image</FormLabel>
                                                    <FormMessage />
                                                </FormRowDetails>
                                                <FormRowFields>
                                                    <FormControl>
                                                        <Dropzone
                                                            endpoint="courseImage"
                                                            onChange={(image) => {

                                                                // console.log(image)
                                                                uploadImage(image)

                                                            }}
                                                            currentImage={field?.value}
                                                        />
                                                    </FormControl>
                                                </FormRowFields>
                                            </FormItem>
                                        )
                                    }}
                                />
                            </FormRows>
                            <FormRows>
                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem data-cols="1">
                                            <FormRowDetails>
                                                <FormLabel required>Category</FormLabel>
                                                <FormMessage />
                                            </FormRowDetails>
                                            <FormRowFields>
                                                <FormControl>
                                                    <Select name="category" value={field.value} onValueChange={field.onChange} >
                                                        <SelectTrigger mode="outline" size="M" shade="200" status={categoriesStatus} {...field}>
                                                            <SelectValue placeholder="None" />
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
                                <FormField
                                    control={form.control}
                                    name="subcategory"
                                    render={({ field }) => {
                                        return (
                                            <FormItem data-cols="1">
                                                <FormRowDetails>
                                                    <FormLabel>Subcategory</FormLabel>
                                                    <FormMessage />
                                                </FormRowDetails>
                                                <FormRowFields>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            mode="outline"
                                                            shade="200"
                                                            sizes="M"
                                                            type="text"
                                                            name="subcategory"
                                                            placeholder="Eg. UX Design Principles"
                                                            status={titleStatus}
                                                        />
                                                    </FormControl>
                                                </FormRowFields>
                                            </FormItem>
                                        )
                                    }}
                                />
                                <Link onClick={addSubCategoryHandlder} ><Plus /> Add subcategory</Link>
                            </FormRows>
                        </FormRows>
                        <FormRows orientation="horizontal">
                            <FormRows orientation="vertical">
                                <FormField
                                    control={form.control}
                                    name="startDate"
                                    render={({ field }) => {
                                        return (
                                            <FormItem data-cols="1">
                                                <FormRowDetails>
                                                    <FormLabel>Start Date</FormLabel>
                                                    <FormMessage />
                                                </FormRowDetails>
                                                <FormRowFields>
                                                    <FormControl>
                                                        <DatePicker type="range" />
                                                    </FormControl>
                                                </FormRowFields>
                                            </FormItem>
                                        )
                                    }}
                                />
                            </FormRows>
                            <FormRows orientation="vertical">
                                <FormField
                                    control={form.control}
                                    name="endDate"
                                    render={({ field }) => {
                                        return (
                                            <FormItem data-cols="1">
                                                <FormRowDetails>
                                                    <FormLabel>End Date</FormLabel>
                                                    <FormMessage />
                                                </FormRowDetails>
                                                <FormRowFields>
                                                    <FormControl>
                                                        <DatePicker type="single" />
                                                    </FormControl>
                                                </FormRowFields>
                                            </FormItem>
                                        )
                                    }}
                                />
                            </FormRows>
                        </FormRows>
                    </FormRows>
                </form>
            </Form>
        </>
    );
}