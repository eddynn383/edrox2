"use client"

import * as z from "zod";
import { useState, useTransition } from "react";
import {
    Button,
    Dropzone,
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    ScrollArea,
    Textarea
} from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ProfileSchema } from "@/schemas";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { updateProfile } from "@/actions/users";
import psx from "@/styles/page.module.scss";
import msx from "@/styles/module.module.scss";
import csx from "@/styles/component.module.scss";
import toast from "react-hot-toast";
import { FormRowDetails, FormRowFields, FormRows } from "@/components/Form";

interface FormProfileProps {
    userId: string;
    defaultValues?: any;
}

const formSchema = z.object({
    imageUrl: z.string().min(1, {
        message: "Image is required",
    }),
});

const FormProfile = ({ userId, defaultValues }: FormProfileProps) => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    // console.log("defaultValues: ", defaultValues)

    const form = useForm<z.infer<typeof ProfileSchema>>({
        resolver: zodResolver(ProfileSchema),
        defaultValues
    });


    // console.log(form.getValues())
    const submitHandler = (values: z.infer<typeof ProfileSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            updateProfile(userId, values).then((data) => {
                // console.log(data)
                if (data?.error) {
                    setError(data.error)
                }

                if (data?.success) {
                    form.reset();
                    setSuccess(data.success)
                }
                // console.log("error", error)
                // console.log("success", success)
            }).catch(() => setError("Something went wrong!"))
        })
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            //   await axios.patch(`/api/courses/${courseId}`, values);
            // toast.success("Course updated");
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
                                <FormRows>
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem data-cols="2">
                                                <FormRowDetails>
                                                    <FormLabel>Full name</FormLabel>
                                                    {<FormMessage />}
                                                </FormRowDetails>
                                                <FormRowFields>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            shade="200"
                                                            type="text"
                                                            name="name"
                                                            placeholder="Zack Affron"
                                                        // status={titleStatus}
                                                        />
                                                    </FormControl>
                                                </FormRowFields>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem data-cols="2">
                                                <FormRowDetails>
                                                    <FormLabel>Email</FormLabel>
                                                    {<FormMessage />}
                                                </FormRowDetails>
                                                <FormRowFields>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            shade="200"
                                                            type="email"
                                                            name="email"
                                                            placeholder="user@example.com"
                                                        // status={titleStatus}
                                                        />
                                                    </FormControl>
                                                </FormRowFields>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="bio"
                                        render={({ field }) => (
                                            <FormItem data-cols="2">
                                                <FormRowDetails>
                                                    <FormLabel>Bio</FormLabel>
                                                    {<FormMessage />}
                                                </FormRowDetails>
                                                <FormRowFields>
                                                    <FormControl>
                                                        <Textarea
                                                            {...field}
                                                            shade="200"
                                                            name="bio"
                                                            placeholder="Type here..."
                                                            resize="vertical"
                                                        // status={titleStatus}
                                                        />
                                                    </FormControl>
                                                </FormRowFields>
                                            </FormItem>
                                        )}
                                    />
                                    <FormItem data-cols="2">
                                        <FormRowDetails>
                                            <FormLabel>Image</FormLabel>
                                            {<FormDescription>Use the drag&drop area to upload your image</FormDescription>}
                                            {<FormMessage />}
                                        </FormRowDetails>
                                        <FormRowFields>
                                            <FormControl>
                                                <>
                                                    {/* <FileUpload endpoint="profilePicture" onChange={
                                                    (url) => {
                                                        if (url) {
                                                            onSubmit({ imageUrl: url });
                                                        }
                                                    }}
                                                /> */}
                                                    {/* <Dropzone
                                                        currentImage={{ url: "", key: "" }}
                                                        endpoint="profilePicture"
                                                        onChange={
                                                            (url) => {
                                                                if (url) {
                                                                    // onSubmit({ imageUrl: url });
                                                                    // console.log("this is profile image url: ", url)
                                                                }
                                                            }
                                                        }
                                                    /> */}
                                                </>
                                            </FormControl>
                                        </FormRowFields>
                                    </FormItem>
                                </FormRows>
                                <div className={csx["form-actions"]}>
                                    <Button type="submit" variant="primary">Reset</Button>
                                    <Button type="submit" variant="accent">Save</Button>
                                </div>
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

export default FormProfile;


