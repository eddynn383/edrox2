"use client"

import { EditorContent, Editor } from "@tiptap/react"
import { FloatingMenu } from './components/FloatingMenu';
import { BubbleMenu } from './components/BubbleMenu';
import richtext from "./richtext.module.css"
interface RichTextEditorProps {
    editor: Editor | null;
    // content: any;
    position?: number;
    onUpdate?: (value: any) => void;
    onBlur?: (id: string, value: any, isEmpty: boolean) => void;
    onClick?: () => void;
}

export const RichTextEditor = ({ editor, position = 0, onUpdate, onBlur, ...props }: RichTextEditorProps) => {

    // console.log("content: ", content)

    if (!editor) {
        return null
    }

    return (
        <div className={richtext.editor} {...props}>
            <EditorContent className={richtext.content} editor={editor} />
            <FloatingMenu editor={editor} />
            <BubbleMenu editor={editor} />
        </div>
    );

}