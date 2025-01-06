"use client"

import Link from "next/link";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Button, Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, Switch, Text } from "@/components";
import { CheckCircle2, Lock, PlayCircle, PauseCircle, ListPlus, Plus, MoreVertical, Pencil, Trash2, Unlock, GripVertical } from "lucide-react";
import { convertDuration } from "@/lib/utils";
import { ChapterModal } from "@/module/ChapterModal";
// import { PlaylistItemProps } from "./interface";
import playlistItem from "./playlistItem.module.css"
import button from "@/components/Button/button.module.css"
import csx from "@/styles/component.module.scss"
import { Bone } from "../Skeleton";
import { useSortable } from "@dnd-kit/sortable";
import { useRouter } from "next/navigation";
import { CSS } from "@dnd-kit/utilities";

export interface PlaylistItemProps {
    // courseId?: string;
    // item: any;
    // edit?: boolean;
    // isActive?: boolean;
    // dragHandleProps?: any;
    id: string;
    title: string;
    description: string;
    href: string;
    showDescription?: boolean;
    isSorting: boolean;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
    onLongPress?: (id: string) => void;
}


export const PlaylistItemDnD = ({ id, title, description, href, isSorting, showDescription = false, onEdit, onDelete, onLongPress }: PlaylistItemProps) => {
    const router = useRouter()
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    let pressTimer: NodeJS.Timeout;

    console.log("href: ", href)

    const handlePressStart = () => {
        pressTimer = setTimeout(() => {
            onLongPress && onLongPress(id);
        }, 500);
    };

    const handlePressEnd = () => {
        clearTimeout(pressTimer);
    };

    const handleClick = (e: React.MouseEvent) => {
        // Prevent navigation if we're in sorting mode or clicking the menu
        console.log("its clicked")
        console.log("href: ", href)
        if (isSorting || e.target instanceof HTMLButtonElement) {
            return;
        }
        if (href) {
            router.replace(href)
        }
        // navigate(`/song/${id}`);
    };

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            className={playlistItem.container}
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...(isSorting ? listeners : {})}
            onMouseDown={handlePressStart}
            onMouseUp={handlePressEnd}
            onTouchStart={handlePressStart}
            onTouchEnd={handlePressEnd}
            onClick={handleClick}
        >
            <div className={playlistItem.title}>
                <Text type="span" size="S" weight="600">{title}</Text>
                {
                    showDescription &&
                    <Text type="span" size="XS" weight="300">{description}</Text>
                }
            </div>
            <div className={playlistItem.actions}>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button mode="text" variant="primary" size="S" content="icon">
                            <MoreVertical className={csx["icon"]} />
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <AlertDialog>
                        {/* Start Dropdowon Definition */}
                        <DropdownMenuContent shade="100" align="end">
                            <DropdownMenuItem hasChild>
                                {/* <ChapterModal id={item.id} value={item} /> */}
                                {/* <Link href={`/management/courses/edit/${courseId}`}>
                                            <Pencil /> Edit
                                        </Link> */}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem hasChild>
                                <AlertDialogTrigger asChild >
                                    <Button mode="text" variant="accent" status="fail" size="S">
                                        <Trash2 /> Delete
                                    </Button>
                                </AlertDialogTrigger>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                        {/* End Dropdowon Definition */}
                        {/* Start Dialog Definition */}
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel asChild>
                                    <div>
                                        <Button>Cancel</Button>
                                    </div>
                                </AlertDialogCancel>
                                <AlertDialogAction asChild>
                                    <Button variant="accent" status="fail">Delete</Button>
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                        {/* End Dialog Definition */}
                    </AlertDialog>
                </DropdownMenu>
            </div>
        </div>
    );
}
