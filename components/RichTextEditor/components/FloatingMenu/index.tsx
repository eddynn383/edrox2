import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, ToolbarButton, ToolbarWrapper, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, Text } from '@/components';
import { Editor, FloatingMenu as Menu } from '@tiptap/react';
import { Heading1, Heading2, Heading3, Heading4, Heading5, Plus } from 'lucide-react';

interface FloatingMenuProps {
    editor: Editor | null;
}

const FloatingMenu = ({ editor }: FloatingMenuProps) => {
    if (!editor) {
        return null;
    }

    return (
        <Menu editor={editor} tippyOptions={{
            offset: [0, -32],
            zIndex: 99,
            duration: 100
        }}>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button size="XS" content="icon" type="button">
                                    <Plus width={16} height={16} />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                Add Content
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" shade="200" onCloseAutoFocus={(e) => e.preventDefault} onFocusOutside={(e) => e.preventDefault}>
                    <DropdownMenuGroup>
                        <DropdownMenuLabel>Format</DropdownMenuLabel>
                        <DropdownMenuItem hasChild>
                            <Button size="S" mode="text" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
                                <Heading1 width={16} height={16} />
                                <Text size="S">Heading 1</Text>
                            </Button>
                        </DropdownMenuItem>
                        <DropdownMenuItem hasChild>
                            <Button size="S" mode="text" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
                                <Heading2 width={16} height={16} />
                                <Text size="S">Heading 2</Text>
                            </Button>
                        </DropdownMenuItem>
                        <DropdownMenuItem hasChild>
                            <Button size="S" mode="text" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
                                <Heading3 width={16} height={16} />
                                <Text size="S">Heading 3</Text>
                            </Button>
                        </DropdownMenuItem>
                        <DropdownMenuItem hasChild>
                            <Button size="S" mode="text" onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}>
                                <Heading4 width={16} height={16} />
                                <Text size="S">Heading 4</Text>

                            </Button>
                        </DropdownMenuItem>
                        <DropdownMenuItem hasChild>
                            <Button size="S" mode="text" onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}>
                                <Heading5 width={16} height={16} />
                                <Text size="S">Heading 5</Text>
                            </Button>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>


            {/* <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>H1</button>
            <button onClick={() => editor.chain().focus().toggleBulletList().run()}>Bullet List</button>
            <button onClick={() => editor.chain().focus().toggleBlockquote().run()}>Blockquote</button>
            <button onClick={() => editor.chain().focus().setImage({ src: 'https://example.com/image.jpg' }).run()}>Image</button> */}
            {/* Add more options */}
        </Menu >
    );
};

export { FloatingMenu };
