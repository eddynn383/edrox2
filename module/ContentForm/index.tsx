"use client"

import { deleteContent, newContent, updateContent } from "@/actions/content";
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, RichTextEditor, Text } from "@/components";
import { PlusCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import csx from "@/styles/component.module.scss"
import s from "./chapter.module.css"
import { ContentToolbar } from "../ContentToolbar";

const demo = [
    {   
        type: "image",
        value: "https://images.pexels.com/photos/20451108/pexels-photo-20451108/free-photo-of-moda-om-oameni-femeie.jpeg",
        position: 0
    },
    {   
        type: "text",
        value: "<h1>This is a title section</h1>",
        position: 1
    },
    {   
        type: "text",
        value: "<p>this is first paragraph</p>",
        position: 2
    }
]

type ContentData = {
    id: string;
    type: string;
    value: string;
    position: number;
}

interface ContentFormProps {
    courseId: string;
    chapterId: string;
    currentData: any;
    edit: boolean;
}

// const autoFocusFirstFoucusable = (element) => {
//     if (element) {
//         findFirstFocusable(element)?.focus();
//     }
// }

export const ContentForm = ({courseId, chapterId, currentData, edit=false}: ContentFormProps) => {
    console.log(currentData)
    const [content, setContent] = useState<ContentData[]>(currentData)
    const richTextRef = useRef(null)

    console.log("chapter ID: ", chapterId)
    console.log(content)

    const updateChapterData = async (id: string, data: any, isEmpty: boolean) => {
        if(isEmpty) {
            await deleteContent(id, courseId, chapterId)
        }
        if (!isEmpty) {
            await updateContent(id, courseId, chapterId, data)
        }
    }

    useEffect(() => {
        setContent(currentData)
    }, [currentData])

    if (!content) {
        return (
            <div>
                <p>Ops! There is not content defined for this course!</p>
            </div>
        )
    }

    if (content) {
        console.log("Has content: ", content)
        return ( 
            <div className={s["content"]}>
                <div className={s["list"]}>
                    <RichTextEditor edit={edit}
                    // key={item.position} position={item.position}  content={item} onBlur={updateChapterData}  
                    />
                    {/* {
                        content?.map((item) => {
                            console.log("item: ", item)

                            return (
                            )
                        })
                    } */}
                </div>
                {
                    // edit &&
                    // <ContentToolbar />

                    // <Button mode="solid" variant="accent" content="icon-text" onClick={async () => await newContent(courseId, chapterId)}>
                    //     <PlusCircle />
                    //     <Text size="M">Add section</Text>
                    // </Button>
                }
            </div>

        );
    }
}