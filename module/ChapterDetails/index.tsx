"use client"

import { RichTextEditor } from "@/components";
import { ContentForm } from "../ContentForm";
import msx from "@/styles/module.module.scss";
import { Editor, useEditor } from "@tiptap/react";
import { useBlockEditor } from "@/hooks/useBlockEditor";

interface ChapterDetailsProps {
    chapterId: string;
    courseId: string;
    data: any;
}

const ChapterDetails = ({ data, courseId, chapterId }: ChapterDetailsProps) => {

    console.log("ChapterDetails: ", data)

    // const editor = useEditor({
    //     editable: false,
    //     content: data.content,
    // });

    return (
        <div className={msx["chapter-details-body"]}>
            {/* <RichTextEditor editor={editor} /> */}
            {/* <ContentForm courseId={courseId} chapterId={chapterId} currentChapter={data} edit={edit} chapters={undefined} children={undefined} /> */}
        </div>
    );
}

export { ChapterDetails };