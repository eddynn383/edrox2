import { Editor } from "@tiptap/react";
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, Text, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components";
import { ChevronDown, Icon, Pilcrow, icons } from "lucide-react";
import { useMemo } from "react";

export type ContentTypePickerOption = {
    label: string
    id: string
    type: 'option'
    disabled: () => boolean
    isActive: () => boolean
    onClick: () => void
    icon: keyof typeof icons
}

export type ContentTypePickerCategory = {
    label: string
    id: string
    type: 'category'
}

export type ContentPickerOptions = Array<ContentTypePickerOption | ContentTypePickerCategory>

export type ContentTypePickerProps = {
    options: ContentPickerOptions
}

const isOption = (option: ContentTypePickerOption | ContentTypePickerCategory): option is ContentTypePickerOption =>
    option.type === 'option'
const isCategory = (option: ContentTypePickerOption | ContentTypePickerCategory): option is ContentTypePickerCategory =>
    option.type === 'category'

const ContentTypePicker = ({ options }: ContentTypePickerProps) => {
    const activeItem = useMemo(() => options.find(option => option.type === 'option' && option.isActive()), [options])

    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Button size="S" selected={activeItem?.id !== 'paragraph' && !!activeItem?.type}>
                                {/* <Icon name={(activeItem?.type === 'option' && activeItem.icon) || 'Pilcrow'} /> */}
                                <ChevronDown width={16} height={16} />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            Paragraph
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" shade="200">
                <DropdownMenuGroup>
                    {options.map(option => {
                        if (isOption(option)) {
                            return (
                                <DropdownMenuItem hasChild key={option.id}>
                                    <Button size="S" mode="text" onClick={option.onClick} selected={option.isActive()}>
                                        <Pilcrow width={16} height={16} />
                                        <Text size="S">{option.label}</Text>
                                    </Button>
                                </DropdownMenuItem>
                            )
                        } else if (isCategory(option)) {
                            return (
                                <DropdownMenuLabel key={option.id} >{option.label}</DropdownMenuLabel>
                            )
                        }
                    })}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export { ContentTypePicker };


{/* <Button size="S" onClick={() => editor.chain().focus().setParagraph().run()} selected={
    editor.isActive('paragraph') &&
    !editor.isActive('orderedList') &&
    !editor.isActive('bulletList') &&
    !editor.isActive('taskList')
}>
    <Pilcrow width={16} height={16} />
    <ChevronDown width={16} height={16} />
</Button> */}
{/* <div className={profile.container} data-size={size} >
        <div className={profile.left}>
            <Avatar src={user?.image ? user.image : ProfileAvatar} alt={user?.email} size={size} shape="rounded" />
        </div>
        <div className={profile.right}>
            <span className={profile.name}>{user?.name ? user?.name : user?.email}</span>
            {size !== "S" && <span className={profile.role}>{role}</span>}
        </div>
    </div> */}
{/* <DropdownMenuLabel>Hierarchy</DropdownMenuLabel>
<DropdownMenuItem hasChild>
    <Button size="S" mode="text" onClick={() => editor.chain().focus().setParagraph().run()} selected={
        editor.isActive('paragraph') &&
        !editor.isActive('orderedList') &&
        !editor.isActive('bulletList') &&
        !editor.isActive('taskList')
    }>
        <Pilcrow width={16} height={16} />
        <Text size="S">Paragraph</Text>
    </Button>
</DropdownMenuItem>
<DropdownMenuItem hasChild>
    <Button size="S" mode="text" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} selected={editor.isActive('heading', { level: 1 })}>
        <Pilcrow width={16} height={16} />
        <Text size="S">Heading 1</Text>
    </Button>
</DropdownMenuItem> */}