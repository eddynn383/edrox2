import { Node, mergeAttributes } from '@tiptap/core';
import { NodeViewContent, NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react'
import { Button, Text } from "@/components"
import { EllipsisVertical, GripVertical, PlusCircle } from 'lucide-react';

// export const BoxedParagraph = Node.create({
//     name: 'boxedParagraph',

//     group: 'block',

//     content: 'text*',

//     parseHTML() {
//         return [
//             {
//                 tag: 'div.boxed-paragraph',
//             },
//         ];
//     },

//     renderHTML({ HTMLAttributes }) {
//         return ['div', mergeAttributes({ class: 'boxed-paragraph' }, HTMLAttributes), 0];
//     },
//     addCommands() {
//         return {
//             setBoxedParagraph: () => ({ commands }) => {
//                 return commands.setNode(this.name);
//             },
//         };
//     },
// });

export const CreateContentButton = Node.create({
    name: 'reactComponent',
    group: 'block',
    content: 'inline*',

    parseHTML() {
        return [
            {
                tag: 'create-content',
            },
        ]
    },
    renderHTML({ HTMLAttributes }) {
        return ['create-content', mergeAttributes(HTMLAttributes), 0]
    },

    addNodeView() {
        return ReactNodeViewRenderer(StartButton)
    },
})

export const CustomComp = Node.create({
    name: 'reactComponent',

    group: 'block',

    content: 'inline*',
    draggable: true,

    parseHTML() {
        return [
            {
                tag: 'react-component',
            },
        ]
    },

    addKeyboardShortcuts() {
        return {
            'Enter': () => {
                return this.editor.chain().insertContentAt(this.editor.state.selection.head, { type: this.type.name }).focus().run()
            },
            
        }
    },

    renderHTML({ HTMLAttributes }) {
        return ['react-component', mergeAttributes(HTMLAttributes), 0]
    },

    addNodeView() {
        return ReactNodeViewRenderer(MyComp)
    },
})

export const StartButton = () => {
    return (
        <NodeViewWrapper className="react-component-with-content">
            <Button mode="solid" variant="accent" content="icon-text">
                <PlusCircle />
                <Text size="M">Add section</Text>
            </Button>
        </NodeViewWrapper>
    )
}

export const MyComp = () => {
    return (
        <NodeViewWrapper className="react-component-with-content">
            <Button size="S" mode="text" contentEditable={false} content="icon" data-drag-handle><GripVertical /></Button>
            <NodeViewContent className="content" />
            <Button size="S" mode="text" contentEditable={false} content="icon" data-drag-handle><EllipsisVertical /></Button>
        </NodeViewWrapper>
    )
}