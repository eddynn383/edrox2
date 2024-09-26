"use client"

import * as z from "zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Textarea } from "@/components";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormRowDetails, FormRowFields, FormRows } from "@/components/Form";
import { NewChapterSchema } from "@/schemas";
import { newInitChapter } from "@/actions/chapter";
import chapter from "./chapter.module.css"

interface ChapterCreationFormProps {
    actions?: any;
    courseId: string;
    onOpen?: any
}



const ChapterCreationForm = ({actions, courseId, onOpen}: ChapterCreationFormProps) => { 
    const router = useRouter()
    // const [title, setTitle] = useState<string>("")

    const form = useForm<z.infer<typeof NewChapterSchema>>({
        resolver: zodResolver(NewChapterSchema),
        defaultValues: {
            title: "",
            description: ""
        }
    });


    const titleState = form.getFieldState("title")
    const titleStatus = !titleState.invalid ? "default" : "fail";
    
    const descriptionState = form.getFieldState("description")
    const descriptionStatus = !descriptionState.invalid ? "default" : "fail";

    // const url = convertToURL(title)

    const submitHandler = (values: z.infer<typeof NewChapterSchema>) => {

        newInitChapter(values, courseId).then((data) => {

            if (data?.error) {
                toast.error(data.error, { position: 'bottom-center'})
            }

            if (data?.success) {
                onOpen(false)
                form.reset();
                toast.success(data.success, { position: 'bottom-center'})
            }

        }).catch(() => toast.error("Something went wrong!"))
    }

    return (
        <>
            <Form {...form}>
                <form id="chapter-creation-form" className={chapter.form} onSubmit={form.handleSubmit(submitHandler)}>
                    <FormRows className={chapter.rows}>
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => {
                                // setTitle(field.value)
                                
                                return (
                                    <FormItem data-cols="1">
                                        <FormRowDetails>
                                            <FormLabel>Title</FormLabel>
                                            <FormMessage />
                                        </FormRowDetails>
                                        {/* <div className={formsx["row-details"]} style={{"display": "flex", "gap": "8px", "justifyContent": "space-between"}}>
                                        </div> */}
                                        <FormRowFields>
                                            <FormControl>                                        
                                                <Input
                                                    {...field}
                                                    shade="200"
                                                    type="text"
                                                    name="title"
                                                    placeholder="Eg. Introduction in front-end technologies"
                                                    status={titleStatus}
                                                />
                                            </FormControl>
                                        </FormRowFields>
                                    </FormItem>
                            )}}
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
                                    {/* <div className={csx["form-row-details"]}>
                                    </div> */}
                                    <FormRowFields>
                                        <FormControl>
                                            <Textarea {...field} value={field.value} name="description" shade="200" placeholder="Add details here" resize="vertical" status={descriptionStatus} />
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

export { ChapterCreationForm };