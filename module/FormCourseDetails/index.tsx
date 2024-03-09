"use client"

import * as z from "zod";
import { Suspense, useEffect, useState, useTransition } from "react";
import { 
    Form, 
    FormControl, 
    FormDescription, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage, 
    Input, 
    Label, 
    RadioGroup, 
    RadioGroupItem, 
    ScrollArea, 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue, 
    Textarea 
} from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NewCourseDetailsSchema } from "@/schemas";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { newCourse, updateCourse } from "@/actions/new-course";
import psx from "@/styles/page.module.scss";
import msx from "@/styles/module.module.scss";
import csx from "@/styles/component.module.scss";
import { FileUpload } from "../FileUpload";
import toast from "react-hot-toast";
import Metadata from "../Metadata";

interface FormCourseDetailsProps {
    courseId: string;
    categories?: any;
    defaultValues?: any;
}

const formSchema = z.object({
    imageUrl: z.string().min(1, {
        message: "Image is required",
    }),
});

const FormCourseDetails = ({ courseId, defaultValues, categories }: FormCourseDetailsProps) => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [priceType, setPriceType] = useState<"fixed" | "discount">("fixed");

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams() 

    // if (!step) {
    //     router.push(`${pathname}?id=${id}&step=1`) 
    // }

    console.log("defaultValues: ", defaultValues)

    const form = useForm<z.infer<typeof NewCourseDetailsSchema>>({
        resolver: zodResolver(NewCourseDetailsSchema),
        defaultValues
    });


    console.log(form.getValues())
    const submitHandler = (values: z.infer<typeof NewCourseDetailsSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            updateCourse(courseId, values).then((data) => {
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

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
        //   await axios.patch(`/api/courses/${courseId}`, values);
          toast.success("Course updated");
        //   toggleEdit();
          router.refresh();
        } catch {
          toast.error("Something went wrong");
        }
      }

    return (
        <>
            <div className={psx["body-content-left"]}>
                <ScrollArea>
                    <div className={msx["course-details-form"]}>
                        <Form {...form}>
                            <form className={csx["form"]} onSubmit={form.handleSubmit(submitHandler)}>
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem data-cols="2">
                                            <div className={csx["form-row-details"]}>
                                                <FormLabel>Description</FormLabel>
                                                {<FormDescription>Define the course description</FormDescription>}
                                                {<FormMessage icon="alert-triangle" />}
                                            </div>
                                            <FormControl>
                                                <Textarea {...field} value={field.value} name="description" shade="200" placeholder="Add details here" resize="vertical" />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormItem data-cols="2">
                                    <div className={csx["form-row-details"]}>
                                        <FormLabel>Image</FormLabel>
                                        {<FormDescription>Use the drag&drop area to upload your image</FormDescription>}
                                        {<FormMessage icon="alert-triangle" />}
                                    </div>
                                    <FormControl>
                                        <FileUpload endpoint="courseImage" onChange={
                                            (url) => {
                                                if (url) {
                                                    onSubmit({ imageUrl: url });
                                                }
                                            }}
                                        />
                                    </FormControl>
                                </FormItem>  
                                
                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => {
                                        
                                        return (
                                            <FormItem data-cols="2">
                                                <div className={csx["form-row-details"]}>
                                                    <FormLabel>Price</FormLabel>
                                                    {<FormDescription>Set up your course price</FormDescription>}
                                                    {<FormMessage icon="alert-triangle" />}
                                                </div>
                                                <div className={csx["form-row-items"]}>
                                                    <RadioGroup orientation="horizontal" defaultValue="fixed">
                                                        <div className={csx["radiogroup-item"]}>
                                                            <RadioGroupItem value="fixed" id="r1" mode="outline" shade="200" onChange={() => setPriceType("fixed")} />
                                                            <Label className={csx["radiobox-label"]} htmlFor="r1">Fixed price</Label>
                                                        </div>
                                                        <div className={csx["radiogroup-item"]}>
                                                            <RadioGroupItem value="discount" id="r2" mode="outline" shade="200" onChange={() => setPriceType("discount")} />
                                                            <Label className={csx["radiobox-label"]} htmlFor="r2">Discounted price</Label>
                                                        </div>
                                                    </RadioGroup>
                                                    {
                                                        priceType === "fixed" && 
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                shade="200"
                                                                type="text"
                                                                name="price"
                                                                placeholder="0"
                                                            />
                                                        </FormControl>                          
                                                    }
                                                    {
                                                        priceType === "discount" && 
                                                        <FormControl>
                                                            <>
                                                                <Input
                                                                    {...field}
                                                                    shade="200"
                                                                    type="text"
                                                                    name="price"
                                                                    placeholder="0"
                                                                />
                                                                <Input
                                                                    {...field}
                                                                    shade="200"
                                                                    type="text"
                                                                    name="discount"
                                                                    placeholder="0"
                                                                />
                                                            </>
                                                        </FormControl>                          
                                                    }
                                                </div>
                                            </FormItem>
                                        )
                                    }}
                                />
                                {/* {
                                    hasDiscount &&
                                    <FormField
                                        control={form.control}
                                        name="discountPrice"
                                        render={({ field }) => {
                                            
                                            return (
                                                <FormItem data-cols="2">
                                                    
                                                    <div className={csx["form-row-details"]}>
                                                        <FormLabel>Discount Price</FormLabel>
                                                        {<FormDescription>Add course discount</FormDescription>}
                                                        {<FormMessage icon="alert-triangle" />}
                                                    </div>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            shade="200"
                                                            type="text"
                                                            name="discountPrice"
                                                            placeholder="0"
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                }            */}
                                
                                <FormItem data-cols="2">
                                    <div className={csx["form-row-details"]}>
                                        <FormLabel>Metadata</FormLabel>
                                        {<FormDescription>Setup new fields if you want to add custom metadata to your course</FormDescription>}
                                        {<FormMessage icon="alert-triangle" />}
                                    </div>
                                    <Metadata />
                                </FormItem>              
                            </form>
                        </Form>
                    </div>
                </ScrollArea>
            </div>
            {/* <div className={psx["body-content-right"]}>
                
            </div> */}
        </>
    );
}
 
export default FormCourseDetails;


