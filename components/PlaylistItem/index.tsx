import Link from "next/link";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Button, Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, Switch } from "@/components";
import { CheckCircle2, Lock, PlayCircle, PauseCircle, ListPlus, Plus, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { convertDuration } from "@/lib/utils";
import csx from "@/styles/component.module.scss"

interface PlaylistItemProps {
    courseId?: string;
    item: any;
    edit?: boolean;
}

export const PlaylistItem = ({ courseId, item, edit=false }: PlaylistItemProps) => {

    return (
        <>
            {
                !edit &&
                <div className={csx["playlist-item"]}>
                    <span className={csx["playlist-item-status"]} title="Status" data-status={item.status} >
                        <span className="sr-only">Status {item.status};</span>
                        {item.status === "locked" && <Lock />}
                        {item.status === "not-started" && <PlayCircle />}
                        {item.status === "in-progress" && <PauseCircle />}
                        {item.status === "completed" && <CheckCircle2 />}
                    </span>
                    <span className={csx["playlist-item-title"]} title="Title">
                        <span className="sr-only">Title</span>
                        <span>{item.title}</span>
                        <span className="sr-only">;</span>
                    </span>
                    <span className={csx["playlist-item-duration"]} title="Duration">
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
                <div className={csx["playlist-item"]}>
                    <span className={csx["playlist-item-title"]} title="Title">
                        <span className="sr-only">Title</span>
                        <span>{item.title}</span>
                        <span className="sr-only">;</span>
                    </span>
                    <div className={csx["playlist-item-state"]}>
                        <Switch />
                    </div>
                    <div className={csx["playlist-item-actions"]}>                      
                        <Link className={csx["button"]} data-mode="solid" data-variant="accent" data-status="default" data-size="S" data-content="icon" href={`/admin/courses/edit/${courseId}/chapter/${item.id}`}>
                            <ListPlus />
                            <span className="sr-only">Add content</span>
                        </Link>
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
                                        {/* <Link href={`/admin/courses/edit/${courseId}`}> */}
                                            <Pencil /> Edit
                                        {/* </Link> */}
                                    </DropdownMenuItem> 
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
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
                                                <Button cn={csx["button"]} shade="200">Cancel</Button>
                                            </div>
                                        </AlertDialogCancel>
                                        <AlertDialogAction asChild>
                                            <div>
                                                <Button cn={csx["button"]} variant="accent" status="fail">Delete</Button>
                                            </div>
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
