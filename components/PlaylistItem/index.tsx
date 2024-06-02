import Link from "next/link";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Button, Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, Switch } from "@/components";
import { CheckCircle2, Lock, PlayCircle, PauseCircle, ListPlus, Plus, MoreVertical, Pencil, Trash2, Unlock } from "lucide-react";
import { convertDuration } from "@/lib/utils";
import { ChapterModal } from "@/module/ChapterModal";
import { PlaylistItemProps } from "./interface";
import csx from "@/styles/component.module.scss"
import playlistItem from "./playlistItem.module.css"
import button from "@/components/Button/button.module.css"

export const PlaylistItem = ({ courseId, item, edit=false }: PlaylistItemProps) => {

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
                <div className={playlistItem.container}>
                    {/* <span className={playlistItem.title} title="Title"> */}
                        <Link className={`${playlistItem.title} ${button.container}`} data-mode="text" data-variant="primary" data-shade="100" data-status="accent" data-size="M" data-content="text" href={`/admin/courses/edit/${courseId}/chapter/${item.id}`}>
                            <span>{item.title}</span>
                        </Link>
                    {/* </span> */}
                    <div className={playlistItem.state}>
                        <Switch />
                    </div>
                    <div className={playlistItem.actions}>                      
                        
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="primary" shade="100" size="S" content="icon">
                                    <MoreVertical className={csx["icon"]} />
                                    <span className="sr-only">Open menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <AlertDialog>
                                {/* Start Dropdowon Definition */}
                                <DropdownMenuContent shade="100" align="end">
                                    <DropdownMenuItem hasChild>
                                        <ChapterModal id={item.id} value={item} />
                                        {/* <Link href={`/admin/courses/edit/${courseId}`}>
                                            <Pencil /> Edit
                                        </Link> */}
                                    </DropdownMenuItem> 
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem hasChild>
                                        <AlertDialogTrigger asChild >
                                            <Button mode="text" variant="accent" status="fail">
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
                                                <Button shade="200">Cancel</Button>
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
            }
        </>
    );
}
