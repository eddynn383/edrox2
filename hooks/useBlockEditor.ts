import { useEditor } from '@tiptap/react'
import type { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import Text from '@tiptap/extension-text'
import TextStyle from '@tiptap/extension-text-style'
import TextAlign from '@tiptap/extension-text-align'
import Youtube from '@tiptap/extension-youtube'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { Color } from '@tiptap/extension-color'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import { all, createLowlight } from 'lowlight'

declare global {
    interface Window {
        editor: Editor | null
    }
}

interface UseBlockEditorProps {
    initialContent?: string;
    onUpdate?: (content: string) => void;
}

const lowlight = createLowlight(all)

lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)

export const useBlockEditor = ({ initialContent = "", onUpdate }: UseBlockEditorProps) => {

    const editor = useEditor({
        content: initialContent,
        editable: true,
        immediatelyRender: true,
        shouldRerenderOnTransaction: false,
        autofocus: true,
        extensions: [
            StarterKit,
            // Document,
            // Focus.configure({
            //     className: 'has-focus',
            //     mode: 'all',
            // }),
            Text,
            TextStyle,
            Underline,
            Color,
            CodeBlockLowlight.configure({
                lowlight,
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Youtube.configure({
                controls: false,
                nocookie: true,
            }),
            Placeholder.configure({
                placeholder: ({ node }) => {
                    if (node.type.name === 'paragraph') {
                        return 'Start typing here...';
                    }
                    if (node.type.name === 'heading') {
                        return `Type a heading...`;
                    }
                    return 'Write something...';
                },
            }),
            Link.configure({
                openOnClick: true,
                autolink: true,
                defaultProtocol: "https"
            })
        ],
        onCreate: ({ editor }) => {
            if (editor.isEmpty) {
                editor.commands.setContent(initialContent)
                editor.commands.focus('start', { scrollIntoView: true })
            }
        },
        onUpdate: ({ editor }) => {
            const html = editor.getHTML()
            if (onUpdate) {
                onUpdate(html); // Call the onUpdate function passed as a parameter
            }
        },
        onBlur: ({ editor }) => {
            const updatedContent = editor.getHTML();
            const isEmpty = editor.isEmpty;
            // console.log("Updated Content:", updatedContent);
            // console.log("Is Editor Empty:", isEmpty);
        },
        // onFocus: ({ editor }) => {
        //     setFocus(true)
        // },
        editorProps: {
            attributes: {
                autocomplete: 'off',
                autocorrect: 'off',
                autocapitalize: 'off',
                class: 'min-h-full',
            },
        }
    })

    window.editor = editor

    return { editor }
}
