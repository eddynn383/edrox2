import Link from "next/link";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Button, Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, Switch, Text } from "@/components";
import { CheckCircle2, Lock, PlayCircle, PauseCircle, ListPlus, Plus, MoreVertical, Pencil, Trash2, Unlock, GripVertical } from "lucide-react";
import { convertDuration } from "@/lib/utils";
import { ChapterModal } from "@/module/ChapterModal";
import { PlaylistItemProps } from "./interface";
import playlistItem from "./playlistItem.module.css"
import button from "@/components/Button/button.module.css"
import csx from "@/styles/component.module.scss"
import { Bone } from "../Skeleton";


// export const SkeletonPlaylistItem = () => {
//     return (
//         <Bone width="100%" height="48px" radius="4px" animationType={""} animationDuration={0} />
//     )
// }

export const PlaylistItem = ({ courseId, item, edit = false, isActive = false, dragHandleProps }: PlaylistItemProps) => {

    return (
        <>
            {
                !edit &&
                <div className={playlistItem.container}>
                    <span className={playlistItem.status} title="Status" data-status={item.status} >
                        <span className="sr-only">Status {item.status};</span>
                        {item.status === "LOCKED" && <Lock />}
                        {item.status === "UNLOCKED" && <Unlock />}
                        {/* {item.status === "not-started" && <PlayCircle />}
                        {item.status === "in-progress" && <PauseCircle />}
                        {item.status === "completed" && <CheckCircle2 />} */}
                    </span>
                    <span className={playlistItem.title} title="Title">
                        <span className="sr-only">Title</span>
                        <span>{item.title}</span>
                        <span className="sr-only">;</span>
                    </span>
                    <span className={playlistItem.duration} title="Duration">
                        <span className="sr-only">Duration</span>
                        <span>
                            {convertDuration(item.duration)}
                        </span>
                        <span className="sr-only">;</span>
                    </span>
                </div>
            }
            {
                edit &&
                <Link className={`${playlistItem.container}`} data-mode="text" data-variant="primary" data-shade="100" data-status="accent" data-size="M" data-content="text" data-active={isActive} href={`/management/courses/${courseId}/edit/content/${item.id}?playlist=on`} >
                    {/* <div className={playlistItem.container}> */}
                    {/* <span className={playlistItem.title} title="Title"> */}
                    {
                        dragHandleProps &&
                        <Button
                            {...dragHandleProps.listeners}
                            {...dragHandleProps.attributes}
                            // className={playlistItem["drag-handle"]}
                            size="S"
                            content="icon"
                            mode="text"
                            type="button"
                        >
                            <GripVertical />
                        </Button>
                    }
                    <div className={playlistItem.title}>
                        <Text type="span" size="S">{item.title}</Text>
                    </div>

                    {/* </span> */}
                    {/* <div className={playlistItem.state}>
                        <Switch />
                    </div> */}
                    <div className={playlistItem.actions}>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="primary" size="S" content="icon">
                                    <MoreVertical className={csx["icon"]} />
                                    <span className="sr-only">Open menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <AlertDialog>
                                {/* Start Dropdowon Definition */}
                                <DropdownMenuContent shade="100" align="end">
                                    <DropdownMenuItem hasChild>
                                        <ChapterModal id={item.id} value={item} />
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
                    {/* </div> */}
                </Link>
            }
        </>
    );
}
