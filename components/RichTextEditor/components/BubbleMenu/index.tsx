import { ToolbarButton, ToolbarWrapper } from '@/components';
import { BubbleMenu as Menu, Editor } from '@tiptap/react';
import { AlignCenter, Bold, Italic, Link } from 'lucide-react';

interface BubbleMenuProps {
    editor: Editor | null;
}

const BubbleMenu = ({ editor }: BubbleMenuProps) => {
    if (!editor) {
        return null;
    }

    return (
        <Menu editor={editor} tippyOptions={{
            // offset: [0, -64],
            zIndex: 99,
            duration: 100
        }}>
            <ToolbarWrapper>
                <ToolbarButton shade="200" size="S" content="icon" tooltip="Bold" onClick={() => editor.chain().focus().toggleBold().run()}><Bold /></ToolbarButton>
                <ToolbarButton shade="200" size="S" content="icon" tooltip="Italic" onClick={() => editor.chain().focus().toggleItalic().run()}><Italic /></ToolbarButton>
                <ToolbarButton shade="200" size="S" content="icon" tooltip="Link" onClick={() => editor.chain().focus().setLink({ href: 'https://example.com' }).run()}><Link /></ToolbarButton>
                <ToolbarButton shade="200" size="S" content="icon" tooltip="Link" onClick={() => editor.chain().focus().setTextAlign("center").run()} ><AlignCenter /></ToolbarButton>
            </ToolbarWrapper>
        </Menu>
    );
};

export { BubbleMenu };
