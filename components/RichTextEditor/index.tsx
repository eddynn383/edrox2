"use client"

import { Node, mergeAttributes } from '@tiptap/core';
import { useEditor, useCurrentEditor, EditorContent, EditorProvider, FloatingMenu, BubbleMenu, Editor, CommandProps} from "@tiptap/react"
import Focus from '@tiptap/extension-focus'
import StarterKit from '@tiptap/starter-kit'
import { Button } from "../Button";
import { Bold, Check, CheckCheck, Film, Heading, Heading1, Heading2, Heading3, Heading4, Heading5, ImageIcon, ImagePlay, Italic, List, ListChecks, ListIcon, ListTodo, Plus, TextIcon } from "lucide-react";
import richtext from "./richtext.module.css"
import { useEffect, useMemo, useRef, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { CreateContentButton, CustomComp } from '../CustomNode';
import { Tabs, TabsContent, TabsList, TabsTrigger, Text } from '@/components';
import button from "./richtext.module.css"
import toolbar from "@/module/ContentToolbar/toolbar.module.css"

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
    content?: Content;
    position?: number;
    onUpdate?: (value: any) => void;
    onBlur?: (id: string, value: any, isEmpty: boolean) => void;
    onClick?: () => void;
}

const MainToolbar = ({editor}: ToolbarProps) => {
    const [visible, setVisible] = useState(false)

    return (
        <>
            {
                !visible && 
                <Button className={`${button.container}`} mode="solid" variant="accent" content="icon" onClick={() => setVisible(true)}><Plus /></Button>
            }
            {
                visible &&
                <div className={toolbar.container}>
                    <Tabs defaultValue="text">
                        <TabsList>
                            <TabsTrigger value="text">
                                <TextIcon />
                                <Text size="M">Text</Text>
                            </TabsTrigger>
                            <TabsTrigger value="media">
                                <ImagePlay />
                                <Text size="M">Media</Text>
                            </TabsTrigger>
                            <TabsTrigger value="quiz">
                                <ListTodo />
                                <Text size="M">Quiz</Text>
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="text">
                            <Button mode="outline" variant="primary" content="icon-text">
                                <Heading />
                                <Text size="M">Heading</Text>
                            </Button>
                            <Button mode="outline" variant="primary" content="icon-text">
                                <TextIcon />
                                <Text size="M">Paragraph</Text>
                            </Button>
                            <Button mode="outline" variant="primary" content="icon-text">
                                <ListIcon />
                                <Text size="M">List</Text>
                            </Button>
                        </TabsContent>
                        <TabsContent value="media">
                            <Button mode="outline" variant="primary" content="icon-text">
                                <ImageIcon />
                                <Text size="M">Image</Text>
                            </Button>
                            <Button mode="outline" variant="primary" content="icon-text">
                                <Film />
                                <Text size="M">Video</Text>
                            </Button>
                        </TabsContent>
                        <TabsContent value="quiz">
                            <Button mode="outline" variant="primary" content="icon-text">
                                <Check />
                                <Text size="M">Single choice</Text>
                            </Button>
                            <Button mode="outline" variant="primary" content="icon-text">
                                <CheckCheck />
                                <Text size="M">Multiple choice</Text>
                            </Button>
                        </TabsContent>
                    </Tabs>
                    {/* <Button mode="solid" variant="accent" content="icon-text">
                        <PlusCircle />
                        <Text size="M">Add section</Text>
                    </Button> */}
                </div>
            }
        </>
    )
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
                <TextIcon /> 
            </Button>
            <Button mode="solid" variant="primary" shade="200" size="S" content="icon" selected={editor.isActive("orderedList") ? true : false} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
                <List /> 
            </Button>
        </div>
    )
}

type ContentData = {
    type: string;
    value: string;
    position: number;
}


export const RichTextEditor = ({ edit, content, position=0, onUpdate, onBlur, ...props }: RichTextEditorProps) => {
    // const { id, type, value } = content
    // const [data, setData] = useState<ContentData>(content)
    const [focus, setFocus] = useState(false)
    const [active, setActive] = useState(false)
    const [selectedItem, setSelectedItem] = useState<string>("")
    const richTextRef = useRef<HTMLDivElement>(null)


    // const debouncedValue = useDebounce(value);

    // console.log("Debounced: ", debouncedValue)

    const SingleOptionQuestion = Node.create({
        name: 'singleOptionQuestion',
        group: 'block',
        content: 'text*',
    
        parseHTML() {
            return [{
                tag: 'single-option-question',
            }];
        },
    
        renderHTML({ HTMLAttributes }) {
            return ['single-option-question', mergeAttributes(HTMLAttributes), 0];
        },
        // addCommands() {
        //     return {
        //         setSingleOptionQuestion:
        //           () =>
        //           ({ commands }: CommandProps) => {
        //             return commands.setNode(this.name);
        //           },
        //       };
        // },
    });

    const handleClick = (item: string) => {
        setSelectedItem(item)
    }

    const editor = useEditor({
        // content: data.value,
        content: `
            <create-content></create-content>
        `,
        editable: edit,
        autofocus: true,
        extensions: [
            StarterKit,
            CustomComp,
            CreateContentButton,
            Focus.configure({
                className: 'has-focus',
                mode: 'all',
            }),
            // BoxedParagraph,
            // SingleOptionQuestion
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
                // onUpdate({
                //     type: content.type,
                //     value: html,
                //     position: content.position
                // })
            }
        },
        onBlur: ({editor}) => {
            const isEmpty = editor.isEmpty
            const updatedContent = editor.getHTML()
            console.log(isEmpty)
            if (onBlur) {
                // onBlur(content.id, updatedContent, isEmpty)
                // setFocus(false)
            }
        },
        onFocus: ({editor}) => {
            setFocus(true)
        }
    })

    useEffect(() => {
        // console.log(selectedItem)
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
            <div className={richtext.editor} data-focus={focus} data-active={active} data-selected={selectedItem} {...props} ref={richTextRef} 
            // onClick={() => handleClick(id)}
            >
                {
                    editor && 
                    <BubbleMenu className="bubble-menu" tippyOptions={{ duration: 100 }} editor={editor}>
                        <Toolbar editor={editor} />
                    </BubbleMenu>
                }
                {
                    editor && 
                    <FloatingMenu className="floating-menu" tippyOptions={{ duration: 100 }} editor={editor}>
                        <Toolbar editor={editor} />
                    </FloatingMenu>
                }
                {/* {
                    selectedItem === id &&
                } */}
                {/* {
                    editor &&
                    <button
                        onClick={() => editor.chain().focus().setBoxedParagraph().run()}
                    >
                        Boxed Paragraph
                    </button>
                } */}
                <EditorContent className={richtext.content} editor={editor} />
                {
                    editor && 
                    <MainToolbar editor={editor} />
                }
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


