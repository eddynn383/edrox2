import Link from "next/link";
import { Button, AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialogCancel } from "@/components";
import { CheckCircle2, Lock, Unlock, PlayCircle, PauseCircle } from "lucide-react";
import { convertDuration } from "@/lib/utils";
import { PlaylistProps } from "./interface";

import csx from "@/styles/component.module.scss"

const Playlist = ({ data, target }: PlaylistProps) => {
    return ( 
        <div className={csx["playlist"]}>
            <ul className={csx["playlist-list"]}>
                {
                    data.map((item: any) => (
                        <li className={csx["playlist-list-item"]} key={item.id}>
                            {
                                item.status !== "locked" ?
                                <Link href={target ? `${target}/${item.id}` : item.id} className={csx["playlist-chapter"]}>
                                    <span className={csx["playlist-chapter-status"]} data-status={item.status}>
                                        {item.status === "locked" && <Lock />}
                                        {item.status === "not-started" && <PlayCircle />}
                                        {item.status === "in-progress" && <PauseCircle />}
                                        {item.status === "completed" && <CheckCircle2 />}
                                    </span>
                                    <span className={csx["playlist-chapter-title"]}>
                                        {item.title}
                                    </span>
                                    <span className={csx["playlist-chapter-duration"]}>
                                        {convertDuration(item.duration)}
                                    </span>
                                </Link>
                                :
                                

                                <AlertDialog
                                // open={open} onOpenChange={setOpen}

                                >
                                    <AlertDialogTrigger asChild>
                                        <div className={csx["playlist-chapter"]}>
                                            <span className={csx["playlist-chapter-status"]} data-status={item.status}>
                                                {item.status === "locked" && <Lock />}
                                                {item.status === "not-started" && <PlayCircle />}
                                                {item.status === "in-progress" && <PauseCircle />}
                                                {item.status === "completed" && <CheckCircle2 />}
                                            </span>
                                            <span className={csx["playlist-chapter-title"]}>
                                                {item.title}
                                            </span>
                                            <span className={csx["playlist-chapter-duration"]}>
                                                {convertDuration(item.duration)}
                                            </span>
                                        </div>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Chapter Locked</AlertDialogTitle>
                                            <AlertDialogDescription>To unlock this chapter you need to complete all available chapters</AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel asChild>
                                                <div>
                                                    <Button shade="200" >Cancel</Button>
                                                </div>
                                            </AlertDialogCancel>
                                            {/* <Button variant="accent" type="submit">Update</Button> */}
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            }
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}
 
export { Playlist };