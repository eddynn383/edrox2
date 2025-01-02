"use client"

import { AlignCenter, AlignJustify, AlignLeft, AlignRight, Bold, Code, Heading1, Heading2, Heading3, Heading4, Heading5, Italic, Link, Pilcrow, Quote, Redo, Strikethrough, Underline, Undo, X } from 'lucide-react';
import { Button, Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, Input, Label, Popover, PopoverContent, PopoverTrigger, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, Text } from '@/components';
import { ToolbarButton, ToolbarDivider, ToolbarWrapper } from '@/components/Toolbar';
import { useCallback, useEffect, useState } from 'react';
import { Editor } from '@tiptap/react';
import button from "@/components/Button/button.module.css"
import { Form, FormActions, FormItem, FormRowDetails, FormRowFields, FormRows } from '@/components/Form';

const SetLinkDialog = ({ editor, isOpen, onClose }: { editor: Editor; isOpen: boolean; onClose: () => void }) => {
    const [url, setUrl] = useState("");
    const [linkText, setLinkText] = useState("");
    const [linkPopoverState, setLinkPopoverState] = useState(false)

    console.log(linkPopoverState)

    const handleSubmit = () => {
        if (!url) {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
        } else {
            // Insert link text if it exists
            editor.chain().focus().deleteSelection().insertContent(linkText).setLink({ href: url }).run();
        }
        onClose();
    };

    return (
        <Popover onOpenChange={setLinkPopoverState}>
            <PopoverTrigger asChild>
                <ToolbarButton
                    size="S"
                    tooltip="Link"
                    selected={linkPopoverState}
                >
                    <Link />
                </ToolbarButton>
            </PopoverTrigger>
            <PopoverContent>
                <Text type="heading" size="H3">Create Link</Text>
                <div style={{ "display": "flex", "flexDirection": "column", "gap": "16px", "paddingTop": "16px" }}>
                    <FormRows>
                        <FormItem>
                            <FormRowDetails>
                                <Label htmlFor="linkText">Link Text</Label>
                            </FormRowDetails>
                            <FormRowFields>
                                <Input
                                    id="linkText"
                                    shade="200"
                                    value={linkText}
                                    onChange={(e) => setLinkText(e.target.value)}
                                    placeholder="Enter link text"
                                />
                            </FormRowFields>
                        </FormItem>
                        <FormItem>
                            <FormRowDetails>
                                <Label htmlFor="url">URL</Label>
                            </FormRowDetails>
                            <FormRowFields>
                                <Input
                                    id="url"
                                    shade="200"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    placeholder="Enter URL"
                                />
                            </FormRowFields>
                        </FormItem>
                    </FormRows>
                    <FormActions direction="horizontal">
                        <Button variant="accent" onClick={handleSubmit}>Create</Button>
                        {/* <Button variant="primary" mode="solid" shade="200" onClick={onClose}>
                            Cancel
                        </Button> */}
                    </FormActions>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export type ToolbarProps = {
    editor: Editor | null
}

const Toolbar = ({ editor }: ToolbarProps) => {

    // console.log("Toolbar editor: ", editor)

    const [selectedContentType, setSelectedContentType] = useState("Paragraph");
    const [selectedAlignment, setSelectedAlignment] = useState("Align Center");
    const [isBoldActive, setIsBoldActive] = useState(false);
    const [isItalicActive, setIsItalicActive] = useState(false);
    const [isUnderlineActive, setIsUnderlineActive] = useState(false);
    const [isStrikeActive, setIsStrikeActive] = useState(false);
    const [isLinkActive, setIsLinkActive] = useState(false);
    const [isBlockquoteActive, setIsBlockquoteActive] = useState(false);
    const [isCodeBlockActive, setIsCodeBlockActive] = useState(false);
    const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);


    if (!editor) return null;

    const updateButtonStates = () => {
        setIsBoldActive(editor.isActive("bold"));
        setIsItalicActive(editor.isActive("italic"));
        setIsUnderlineActive(editor.isActive("underline"));
        setIsStrikeActive(editor.isActive("strike"));
        setIsLinkActive(editor.isActive("link"));
        setIsBlockquoteActive(editor.isActive("blockquote"));
        setIsCodeBlockActive(editor.isActive("codeBlock"));
    };

    const selectContentTypeHandler = (element: string) => {
        setSelectedContentType(element);

        switch (element) {
            case "Paragraph": editor.chain().focus().setParagraph().run()
                break;
            case "Heading 1": editor.chain().focus().toggleHeading({ level: 1 }).run()
                break;
            case "Heading 2": editor.chain().focus().toggleHeading({ level: 2 }).run()
                break;
            case "Heading 3": editor.chain().focus().toggleHeading({ level: 3 }).run()
                break;
            case "Heading 4": editor.chain().focus().toggleHeading({ level: 4 }).run()
                break;
            case "Heading 5": editor.chain().focus().toggleHeading({ level: 5 }).run()
                break;
            case "Bullet List": editor.chain().focus().toggleBulletList().run()
                break;
            case "Ordered List": editor.chain().focus().toggleOrderedList().run()
                break;
            default: editor.chain().focus().setParagraph().run()
                break;
        }

        updateButtonStates()
    }

    const selectAlignmentHandler = (element: string) => {
        setSelectedAlignment(element);

        switch (element) {
            case "Align Left": editor.chain().focus().setTextAlign("left").run()
                break;
            case "Align Center": editor.chain().focus().setTextAlign("center").run()
                break;
            case "Align Right": editor.chain().focus().setTextAlign("right").run()
                break;
            case "Justify": editor.chain().focus().setTextAlign("justify").run()
                break;
            default: editor.chain().focus().setTextAlign("left").run()
                break;
        }

        updateButtonStates()
    }

    // const setLink = useCallback(() => {
    //     const previousUrl = editor.getAttributes('link').href
    //     const url = window.prompt('URL', previousUrl)

    //     // cancelled
    //     if (url === null) {
    //         return
    //     }

    //     // empty
    //     if (url === '') {
    //         editor.chain().focus().extendMarkRange('link').unsetLink().run()

    //         return
    //     }

    //     // update link
    //     editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    //     updateButtonStates()
    // }, [editor])

    // const setLink = useCallback(() => {
    //     setIsLinkDialogOpen(true); // Open the dialog
    // }, []);

    const closeLinkDialog = () => {
        setIsLinkDialogOpen(false);
    };



    useEffect(() => {
        // Update button states when the editor state changes
        if (editor) {
            editor.on("update", updateButtonStates);
            editor.on("selectionUpdate", updateButtonStates);

            // Cleanup the event listeners when the component is unmounted
            return () => {
                editor.off("update", updateButtonStates);
                editor.off("selectionUpdate", updateButtonStates);
            };
        }
    }, [editor]);


    return (
        <ToolbarWrapper container={false}>
            <ToolbarButton
                size="S"
                tooltip="Undo"
                disabled={!editor.can().undo()}
                onClick={() => {
                    editor.chain().focus().undo().run()
                    updateButtonStates()
                }}
            >
                <Undo />
            </ToolbarButton>
            <ToolbarButton
                size="S"
                tooltip="Redo"
                disabled={!editor.can().redo()}
                onClick={() => {
                    editor.chain().focus().redo().run()
                    updateButtonStates()
                }}
            >
                <Redo />
            </ToolbarButton>
            <ToolbarDivider orientation="vertical" />
            <Select name="ContentType" value={selectedContentType} onValueChange={selectContentTypeHandler}>
                <SelectTrigger mode="text" size="S" shade="100">
                    <SelectValue placeholder="Choose option" />
                </SelectTrigger>
                <SelectContent side="top" size="S" shade="100" onCloseAutoFocus={(e) => {
                    e.preventDefault();
                }}>
                    <SelectGroup>
                        <SelectLabel >
                            Hierarchy
                        </SelectLabel>
                        <SelectItem value="Paragraph">
                            <Pilcrow width={16} height={16} />
                            <Text size="S">Paragraph</Text>
                        </SelectItem>
                        <SelectItem value="Heading 1">
                            <Heading1 width={16} height={16} />
                            <Text size="S">Heading 1</Text>
                        </SelectItem>
                        <SelectItem value="Heading 2">
                            <Heading2 width={16} height={16} />
                            <Text size="S">Heading 2</Text>
                        </SelectItem>
                        <SelectItem value="Heading 3">
                            <Heading3 width={16} height={16} />
                            <Text size="S">Heading 3</Text>
                        </SelectItem>
                        <SelectItem value="Heading 4">
                            <Heading4 width={16} height={16} />
                            <Text size="S">Heading 4</Text>
                        </SelectItem>
                        <SelectItem value="Heading 5">
                            <Heading5 width={16} height={16} />
                            <Text size="S">Heading 5</Text>
                        </SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                        <SelectLabel >
                            Lists
                        </SelectLabel>
                        <SelectItem value="Bullet List" onClick={() => editor.chain().focus().toggleBulletList().run()}>
                            <Pilcrow width={16} height={16} />
                            <Text size="S">Bullet List</Text>
                        </SelectItem>
                        <SelectItem value="Ordered List" onClick={() => editor.chain().focus().toggleOrderedList().run()}>
                            <Heading1 width={16} height={16} />
                            <Text size="S">Ordered List</Text>
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Select name="Alignment" value={selectedAlignment} onValueChange={selectAlignmentHandler}>
                <SelectTrigger mode="text" size="S" shade="100">
                    <SelectValue placeholder="Choose option" />
                </SelectTrigger>
                <SelectContent side="top" size="S" shade="100" onCloseAutoFocus={(e) => {
                    e.preventDefault();
                }}>
                    <SelectItem value="Align Left">
                        <AlignLeft width={16} height={16} />
                        <Text size="S">Align Left</Text>
                    </SelectItem>
                    <SelectItem value="Align Center">
                        <AlignCenter width={16} height={16} />
                        <Text size="S">Align Center</Text>
                    </SelectItem>
                    <SelectItem value="Align Right">
                        <AlignRight width={16} height={16} />
                        <Text size="S">Align Right</Text>
                    </SelectItem>
                    <SelectItem value="Justify">
                        <AlignJustify width={16} height={16} />
                        <Text size="S">Justify</Text>
                    </SelectItem>
                </SelectContent>
            </Select>
            <ToolbarDivider orientation="vertical" />
            <ToolbarButton
                size="S"
                tooltip="Bold"
                onClick={() => {
                    editor.chain().focus().toggleBold().run();
                    updateButtonStates();
                }}
                selected={isBoldActive}
            >
                <Bold />
            </ToolbarButton>
            <ToolbarButton
                size="S"
                tooltip="Italic"
                onClick={() => {
                    editor.chain().focus().toggleItalic().run();
                    updateButtonStates();
                }}
                selected={isItalicActive}
            >
                <Italic />
            </ToolbarButton>
            <ToolbarButton
                size="S"
                tooltip="Underline"
                onClick={() => {
                    editor.chain().focus().toggleUnderline().run();
                    updateButtonStates();
                }}
                selected={isUnderlineActive}
            >
                <Underline />
            </ToolbarButton>
            <ToolbarButton
                size="S"
                tooltip="Strike"
                onClick={() => {
                    editor.chain().focus().toggleStrike().run();
                    updateButtonStates();
                }}
                selected={isStrikeActive}
            >
                <Strikethrough />
            </ToolbarButton>
            <ToolbarButton
                size="S"
                tooltip="Blockquote"
                onClick={() => {
                    editor.chain().focus().toggleBlockquote().run()
                    updateButtonStates();
                }}
                selected={isBlockquoteActive}
            >
                <Quote />
            </ToolbarButton>
            <ToolbarButton
                size="S"
                tooltip="Code Block"
                onClick={() => {
                    editor.chain().focus().toggleCodeBlock().run()
                    updateButtonStates();
                }}
                selected={isCodeBlockActive}
            >
                <Code />
            </ToolbarButton>

            {/* <ToolbarButton
                size="S"
                tooltip="Link"
                onClick={setLink}
                selected={isLinkActive}
            >
                <Link />
            </ToolbarButton> */}
            <SetLinkDialog editor={editor}
                isOpen={isLinkDialogOpen}
                onClose={closeLinkDialog}
            />
            {/* Add more buttons as needed */}
        </ToolbarWrapper>
    );
};

export { Toolbar };
