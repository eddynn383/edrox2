import Link from "next/link";
import { Button, AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialogCancel, PlaylistItem } from "@/components";
import { PlaylistProps } from "./interface";
import playlist from "./playlist.module.css"

const Playlist = ({ courseId, data, target, edit=false }: PlaylistProps) => {

    console.log("DATA: ", data)

    return ( 
        <>
            {
                !edit && 
                <div className={playlist.container}>
                    {
                        data.length > 0 &&
                        <ul className={playlist.list}>
                            {
                                data.map((item: any) => (
                                    <li className={playlist["list-item"]} key={item.id}>
                                        {
                                            item.status !== "LOCKED" ?
                                                <Link href={target ? `${target}/${item.id}` : item.id} className={playlist["list-item-wrapper"]}>
                                                    <PlaylistItem item={item} />
                                                </Link>
                                            :
                                                <AlertDialog >
                                                    <AlertDialogTrigger asChild>
                                                        <div className={playlist["list-item-wrapper"]}>
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
                    }
                    {
                        data.length === 0 && 
                        <p>There are no chapters created yet</p>
                    }
                </div>
            }
            {
                edit && 
                <div className={playlist.container}>
                    {
                        data.length > 0 && 
                        <ul className={playlist.list}>
                            {
                                data.map((item: any) => (
                                    <li className={playlist["list-item"]} key={item.id}>
                                        <PlaylistItem courseId={courseId} item={item} edit={edit} />
                                    </li>
                                ))
                            }
                        </ul>
                    }
                    {
                        data.length === 0 && 
                        <p>There are no chapters created yet</p>
                    }
                </div>
            }
        </>
    );
}
 
export { Playlist };