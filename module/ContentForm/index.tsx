"use client";

import * as z from "zod";
import qs from "query-string";
import toast from "react-hot-toast";
import { PanelRightClose, PanelRightOpen } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBlockEditor } from "@/hooks/useBlockEditor";
import { startTransition, useEffect, useRef, useState } from "react";
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, ScrollArea, Text } from "@/components";
import { RichTextEditor } from "@/components/RichTextEditor";
import { Toolbar } from "@/components/RichTextEditor/components/Toolbar";
import { ChapterSelection } from "../ChapterSelection";
import { FormActions, FormRowFields, FormRows } from "@/components/Form";
import { ContentCourseChapterSchema } from "@/schemas";
import { updateContentChapter } from "@/actions/chapter";
import chapter from "./chapter.module.css";
import page from "@/styles/page.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface ContentFormProps {
    courseId: string;
    chapterId: string;
    chapters: any;
    currentChapter: any;
    edit: boolean;
    children: React.ReactNode;
}

export const ContentForm = ({ courseId, chapterId, chapters, currentChapter, edit = false, children }: ContentFormProps) => {
    const [isContentChanged, setContentChanged] = useState(false);
    const [playlist, setPlaylist] = useState<string>("");
    const content = currentChapter.content || "";
    const router = useRouter();
    const path = usePathname();
    const searchParams = useSearchParams()
    const playlistValue = searchParams.get('playlist');

    const formActionsRef = useRef<HTMLDivElement | null>(null);
    const [formActionsHeight, setFormActionsHeight] = useState(0);



    // console.log("path: ", path)
    // console.log("playlist: ", playlist)

    const form = useForm<z.infer<typeof ContentCourseChapterSchema>>({
        resolver: zodResolver(ContentCourseChapterSchema),
        defaultValues: {
            content: currentChapter ? content : "",
        }
    });

    // Set up the editor using useBlockEditor hook
    const { editor } = useBlockEditor({
        initialContent: currentChapter ? content : "",
        onUpdate: (newContent) => {
            // console.log("newContent: ", newContent)
            form.setValue("content", newContent);
            setContentChanged(newContent !== content)
        }
    });

    const submitHandler = (values: z.infer<typeof ContentCourseChapterSchema>) => {

        // console.log("Values: ", values)

        startTransition(() => {
            updateContentChapter(courseId, chapterId, values)
                .then((data) => {
                    if (data?.error) {
                        toast.error(data.error, { position: "bottom-center" });
                    }

                    if (data?.success) {
                        toast.success(data.success, { position: "bottom-center" });
                    }
                })
                .catch((error) => toast.error(error.message));
        });
    };

    const playlistHandler = () => {
        if (playlist === "on") {
            const url = qs.stringifyUrl({
                url: path,
                query: {
                    playlist: "off",
                }
            }, { skipEmptyString: true, skipNull: true });

            router.push(url);
        } else {
            const url = qs.stringifyUrl({
                url: path,
                query: {
                    playlist: "on",
                }
            }, { skipEmptyString: true, skipNull: true });

            router.push(url);
        }
    }

    useEffect(() => {
        if (formActionsRef.current) {
            setFormActionsHeight(formActionsRef.current.clientHeight);
            // console.log("FormActions Height:", formActionsRef.current.clientHeight);
        }
    }, []);

    useEffect(() => {
        if (playlistValue) {
            // console.log("palylist is updated")
            setPlaylist(playlistValue);
        }
    }, [playlistValue])

    // console.log(playlist)
    return (
        <>
            <div className={page["section-header"]}>
                <Toolbar editor={editor} />
                <div style={{ "display": "flex", "gap": "8px" }}>

                    {
                        playlist === "off" &&
                        <ChapterSelection courseId={courseId} chapters={chapters} chapterId={chapterId} />
                    }
                    <Button content="icon" size="S" onClick={playlistHandler}>
                        {
                            playlist === "on" &&
                            <PanelRightClose />
                        }
                        {
                            playlist === "off" &&
                            <PanelRightOpen />
                        }
                    </Button>
                </div>
            </div>
            <div className={page["section-body"]}>
                <Form {...form}>
                    <form id="course-creation-form" className={chapter.form} style={{ "height": "100%" }} onSubmit={form.handleSubmit(submitHandler)} >
                        <FormRows className={chapter.rows} style={{ "height": `calc(100% - ${formActionsHeight}px)` }}>
                            <ScrollArea>
                                <FormField
                                    control={form.control}
                                    name="content"
                                    render={({ field }) => {

                                        // console.log(field.)

                                        return (
                                            <FormItem data-cols="1">
                                                <FormRowFields>
                                                    <FormControl>
                                                        <RichTextEditor editor={editor} />
                                                    </FormControl>
                                                </FormRowFields>
                                            </FormItem>
                                        );
                                    }}
                                />
                            </ScrollArea>
                        </FormRows>
                        <FormActions direction="horizontal" container={true} ref={formActionsRef}>
                            <Button variant="accent" type="submit" size="M" disabled={!isContentChanged}>
                                Update
                            </Button>
                        </FormActions>
                    </form>
                </Form>
            </div>
            {/* {children} */}
        </>
    );
};
