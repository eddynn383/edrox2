"use client"

import { useEditor, useCurrentEditor, EditorContent, EditorProvider, FloatingMenu, BubbleMenu, Editor} from "@tiptap/react"
import Focus from '@tiptap/extension-focus'
import StarterKit from '@tiptap/starter-kit'
import csx from "@/styles/component.module.scss"
import { Button } from "../Button";
import { Bold, Heading1, Heading2, Heading3, Heading4, Heading5, Italic, Text } from "lucide-react";
import richtext from "./richtext.module.css"
import { useEffect, useMemo, useRef, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

interface ToolbarProps {
    editor: Editor | null;
}

type Content = {
    id: string;
    type: string;
    value: string;
    position: number;
}

interface RichTextEditorProps {
    edit: boolean; 
    content: Content;
    position?: number;
    onUpdate?: (value: any) => void;
    onBlur?: (id: string, value: any, isEmpty: boolean) => void;
}

const Toolbar = ({ editor }: ToolbarProps) => {

    if (!editor) {
        return null;
    }

    

    return (
        <div className={richtext.toolbar}>
            <Button mode="solid" variant="primary" shade="200" size="S" content="icon" selected={editor.isActive("bold") ? true : false} disabled={!editor.can().chain().focus().toggleBold().run()} onClick={() => editor.chain().focus().toggleBold().run()}>
                <Bold />
            </Button>
            <Button mode="solid" variant="primary" shade="200" size="S" content="icon" selected={editor.isActive("italic") ? true : false} disabled={!editor.can().chain().focus().toggleItalic().run()} onClick={() => editor.chain().focus().toggleItalic().run()}>
                <Italic />
            </Button>
            <Button mode="solid" variant="primary" shade="200" size="S" content="icon" selected={editor.isActive("heading", { level: 1 }) ? true : false} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
                <Heading1 /> 
            </Button>
            <Button mode="solid" variant="primary" shade="200" size="S" content="icon" selected={editor.isActive("heading", { level: 2 }) ? true : false} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
                <Heading2 /> 
            </Button>
            <Button mode="solid" variant="primary" shade="200" size="S" content="icon" selected={editor.isActive("heading", { level: 3 }) ? true : false} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
                <Heading3 /> 
            </Button>
            <Button mode="solid" variant="primary" shade="200" size="S" content="icon" selected={editor.isActive("heading", { level: 4 }) ? true : false} onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}>
                <Heading4 /> 
            </Button>
            <Button mode="solid" variant="primary" shade="200" size="S" content="icon" selected={editor.isActive("heading", { level: 5 }) ? true : false} onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}>
                <Heading5 /> 
            </Button>
            <Button mode="solid" variant="primary" shade="200" size="S" content="icon" selected={editor.isActive("paragraph") ? true : false} onClick={() => editor.chain().focus().setParagraph().run()}>
                <Text /> 
            </Button>
            {/* <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                className={editor.isActive("strike") ? "is-active" : ""}
            >
                strike
            </button>
            <button
                onClick={() => editor.chain().focus().toggleCode().run()}
                disabled={!editor.can().chain().focus().toggleCode().run()}
                className={editor.isActive("code") ? "is-active" : ""}
            >
                code
            </button>
            <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
                clear marks
            </button>
            <button onClick={() => editor.chain().focus().clearNodes().run()}>
                clear nodes
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
            >
                h1
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
            >
                h2
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
            >
                h3
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                className={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
            >
                h4
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                className={editor.isActive("heading", { level: 5 }) ? "is-active" : ""}
            >
                h5
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                className={editor.isActive("heading", { level: 6 }) ? "is-active" : ""}
            >
                h6
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive("bulletList") ? "is-active" : ""}
            >
                bullet list
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive("orderedList") ? "is-active" : ""}
            >
                ordered list
            </button>
            <button
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={editor.isActive("codeBlock") ? "is-active" : ""}
            >
                code block
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={editor.isActive("blockquote") ? "is-active" : ""}
            >
                blockquote
            </button>
            <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                horizontal rule
            </button>
            <button onClick={() => editor.chain().focus().setHardBreak().run()}>
                hard break
            </button>
            <button
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}
            >
                undo
            </button>
            <button
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}
            >
                redo
            </button>
            <button
                onClick={() => editor.chain().focus().setColor("#958DF1").run()}
                className={
                editor.isActive("textStyle", { color: "#958DF1" }) ? "is-active" : ""
                }
            >
                purple
            </button> */}
        </div>
    )
}

type ContentData = {
    type: string;
    value: string;
    position: number;
}

export const RichTextEditor = ({ edit, content, position=0, onUpdate, onBlur, ...props }: RichTextEditorProps) => {
    const [data, setData] = useState<ContentData>(content)
    const [focus, setFocus] = useState(false)
    const [active, setActive] = useState(false)
    const richTextRef = useRef<HTMLDivElement>(null)
    // const debouncedValue = useDebounce(value);

    // console.log("Debounced: ", debouncedValue)



    const editor = useEditor({
        content: data.value,
        editable: edit,
        autofocus: true,
        extensions: [
            StarterKit,
            Focus.configure({
                className: 'has-focus',
                mode: 'all',
            })
        ],
        // onBeforeCreate({editor} {

        // }),
        onCreate: ({editor}) => {
            // editor.commands.focus(true, { scrollIntoView: true })
            // editor.commands.setTextSelection({from: 0, to: 1})
            editor.view.dom.focus()
            console.log(editor.$doc)
            
            console.log("IsFocused: ", editor.isFocused)
        },
        onUpdate: ({editor}) => {
            const html = editor.getHTML()
            // setValue(html)
            if (onUpdate) {
                onUpdate({
                    type: content.type,
                    value: html,
                    position: content.position
                })
            }
        },
        onBlur: ({editor}) => {
            const isEmpty = editor.isEmpty
            const updatedContent = editor.getHTML()
            console.log(isEmpty)
            if (onBlur) {
                onBlur(content.id, updatedContent, isEmpty)
                setFocus(false)
            }
        },
        onFocus: ({editor}) => {
            setFocus(true)
        }
    })

    useEffect(() => {
        if (editor) {
            editor.chain().focus()
            setActive(true)
            console.log(editor.isFocused)
            console.log(richTextRef.current?.focus)
            // setFocus(editor.isFocused)
        }
    }, [editor])

    if (edit) {
        return (
            <div className={richtext.editor} data-focus={focus} data-active={active} {...props} ref={richTextRef}>
                <Toolbar editor={editor} />
                <EditorContent className={richtext.content} editor={editor} />
            </div>
        );
    }

    if (!edit) {
        return (
            <div className={richtext.view} {...props}>
                <EditorContent className={richtext.content} editor={editor} />
            </div>
        );
    }
    
}


