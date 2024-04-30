import Link from "next/link";
import { Button, AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialogCancel, PlaylistItem } from "@/components";
import { CheckCircle2, Lock, Unlock, PlayCircle, PauseCircle } from "lucide-react";
import { convertDuration } from "@/lib/utils";
import { PlaylistProps } from "./interface";

import csx from "@/styles/component.module.scss"

const Playlist = ({ courseId, data, target, edit=false }: PlaylistProps) => {
    return ( 
        <>
            {
                !edit && 
                <div className={csx["playlist"]}>
                    <ul className={csx["playlist-list"]}>
                        {
                            data.map((item: any) => (
                                <li className={csx["playlist-list-item"]} key={item.id}>
                                    {
                                        item.status !== "locked" ?
                                        <Link href={target ? `${target}/${item.id}` : item.id} className={csx["playlist-list-item-container"]}>
                                            <PlaylistItem item={item} />
                                        </Link>
                                        :
                                        <AlertDialog >
                                            <AlertDialogTrigger asChild>
                                                <div className={csx["playlist-list-item-container"]}>
                                                    <PlaylistItem item={item} />
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
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </div>
            }
            {
                edit && 
                <div className={csx["playlist"]}>
                    <ul className={csx["playlist-list"]}>
                        {
                            data.map((item: any) => (
                                <li className={csx["playlist-list-item"]} key={item.id}>
                                    <PlaylistItem courseId={courseId} item={item} edit={edit} />
                                </li>
                            ))
                        }
                    </ul>
                </div>
            }
        </>
    );
}
 
export { Playlist };