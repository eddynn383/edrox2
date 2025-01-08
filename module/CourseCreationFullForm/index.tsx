"use client"

import * as z from "zod";
import toast from "react-hot-toast";
import { useCallback, useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, DatePicker, Dropzone, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea, UploadImage } from "@/components";
import { newCourse, updateCourse } from "@/actions/course";
import { CourseSchema, CourseImageSchema, NewCourseSchema } from "@/schemas";
import { FormActions, FormRowDetails, FormRowFields, FormRows } from "@/components/Form";
import courseSX from "./course.module.css"
import { getImageById } from "@/data/image";
import { newImage } from "@/actions/image";
import debounce from "lodash.debounce";
import { Course } from "@prisma/client";

export const CourseCreationFullForm = ({ className, course, categories, settings, actions, onOpen }: CourseCreationFullFormProps) => {
    const router = useRouter()
    const [isPending, startTransition] = useTransition();
    const [currentImageId, setCurrentImageId] = useState<string>();
    const [isSaving, setIsSaving] = useState(false);

    const form = useForm<z.infer<typeof CourseSchema>>({
        resolver: zodResolver(CourseSchema),
        defaultValues: {
            name: course.name || "",
            description: course.description || "",
            category: course.categoryId || "",
            subcategory: course.subcategory || "",
            image: course.imageId || "",
            startDate: course.startDate || "",
            endDate: course.endDate || ""
        }
    });

    const { watch } = form;
    const { isDirty, defaultValues } = form.formState;

    // console.log("IS DIRTY: ", isDirty)

    const formValues = watch();

    // Auto-save function
    // const autoSave = useCallback(
    //     debounce((values: z.infer<typeof NewCourseSchema>) => {
    //         if (isDirty) {
    //             console.log("Auto-saving form values:", values);
    //             setIsSaving(true);

    //             updateCourse(course.id, values)
    //                 .then((data) => {
    //                     if (data?.error) {
    //                         toast.error(data.error, { position: "bottom-center" });
    //                     }

    //                     if (data?.success) {
    //                         toast.success("Changes saved!", { position: "bottom-center" });
    //                     }
    //                 })
    //                 .catch((error) => toast.error(error.message))
    //                 .finally(() => setIsSaving(false));
    //         }
    //     }, 10000), // Debounce time: 1000ms (1 second)
    //     []
    // );

    // Trigger auto-save on form value changes
    useEffect(() => {
        // autoSave(formValues);
        if (!isDirty) return; // Only auto-save if there are changes

        const debouncedSave = debounce(() => {
            // console.log("Auto-saving form values:", formValues);
            setIsSaving(true);

            updateCourse(course.id, formValues)
                .then((data) => {
                    // const { course } = data
                    if (data?.error) {
                        toast.error(data.error, { position: "bottom-center" });
                    }

                    if (data?.success) {
                        // if (!course) return
                        // console.log("DATA: ", data)
                        toast.success("Changes saved!", { position: "bottom-center" });
                    }
                    form.reset()
                })
                .catch((error) => toast.error(error.message))
                .finally(() => setIsSaving(false));
        }, 10000); // Save after 10 seconds of inactivity

        debouncedSave();

        return () => debouncedSave.cancel();

        // console.log("UE AutoSave:", autoSave)
        // console.log("UE FormValues:", formValues)

        // Cleanup debounce on unmount
        // return () => autoSave.cancel();
    }, [formValues, isDirty]);

    // console.log("FORM: ", form);
    // console.log("COURSE: ", course);

    const nameState = form.getFieldState("name")
    const nameStatus = !nameState.invalid ? "default" : "fail";

    const descriptionState = form.getFieldState("description")
    const descriptionStatus = !descriptionState.invalid ? "default" : "fail";

    const categoriesState = form.getFieldState("category")
    const categoriesStatus = !categoriesState.invalid ? "default" : "fail";



    // console.log("default values: ", defaultValues);

    // const submitHandler = (values: z.infer<typeof NewCourseSchema>) => {
    //     console.log("submit is triggered");
    //     console.log(values)

    //     startTransition(() => {
    //         updateCourse(course.id, values).then((data) => {

    //             if (data?.error) {
    //                 toast.error(data.error, { position: 'bottom-center' });
    //             }

    //             if (data?.success) {
    //                 toast.success(data.success, { position: 'bottom-center' });
    //             }

    //         }).catch((error) => toast.error(error.message))
    //     })
    // }

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

    return (
        <>
            <Form {...form}>
                <form id="course-creation-form" className={courseSX.form}
                // onSubmit={form.handleSubmit(submitHandler)}
                >
                    {/* {isSaving && <p className="saving-indicator">Saving...</p>} */}
                    <FormRows>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => {
                                return (
                                    <FormItem data-cols="1">
                                        <FormRowDetails>
                                            <FormLabel required>Name</FormLabel>
                                            <FormMessage />
                                        </FormRowDetails>
                                        <FormRowFields>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    mode="outline"
                                                    shade="200"
                                                    sizes="L"
                                                    type="text"
                                                    name="title"
                                                    placeholder="Eg. Introduction in front-end technologies"
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
                                            <Textarea {...field} name="description" mode="outline" shade="200" sizes="L" placeholder="Add details here" resize="vertical" status={descriptionStatus} />
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
                                        // await getImageById(field?.value)
                                        // setCurrentImageId(field?.value || "")
                                        // const image = getImage(field?.value || "")

                                        // console.log("GET FIELD (COURSE FORM): ", field)

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
                                                        <SelectTrigger mode="outline" size="L" shade="200" status={categoriesStatus} {...field}>
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
                                                            sizes="L"
                                                            type="text"
                                                            name="subcategory"
                                                            placeholder="Eg. UX Design Principles"
                                                            status={nameStatus}
                                                        />
                                                    </FormControl>
                                                </FormRowFields>
                                            </FormItem>
                                        )
                                    }}
                                />
                            </FormRows>
                        </FormRows>
                        {
                            settings.date &&
                            <FormRows orientation="horizontal">
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
                                                        <DatePicker />
                                                    </FormControl>
                                                </FormRowFields>
                                            </FormItem>
                                        )
                                    }}
                                />
                            </FormRows>
                        }
                        {/* <FormActions direction="horizontal">
                            <Button type="submit" variant="accent" size="M" disabled={!isDirty}>Save</Button>
                        </FormActions> */}
                    </FormRows>
                </form>
            </Form>
        </>
    );
}