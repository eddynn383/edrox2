import { PlaylistProps } from "./interface";
import { CheckCircle2, Lock, Unlock, PlayCircle, PauseCircle } from "lucide-react";


import sx from "@/styles/component.module.scss"

const Playlist = ({ data }: PlaylistProps) => {
    return ( 
        <div className={sx["playlist"]}>
            <ul className={sx["playlist-list"]}>
                {
                    data.map((item: any) => (
                        <li className={sx["playlist-list-item"]} key={item.id}>
                            <div className={sx["playlist-chapter"]}>
                                <span className={sx["chapter-status"]}>
                                    {item.status === "locked" && <Lock />}
                                    {item.status === "not-started" && <PlayCircle />}
                                    {item.status === "in-progress" && <PauseCircle />}
                                    {item.status === "completed" && <CheckCircle2 />}
                                </span>
                                <span className={sx["chapter-title"]}>
                                    {item.title}
                                </span>
                                <span className={sx["chapter-duration"]}>
                                    {item.duration}
                                </span>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}
 
export default Playlist;