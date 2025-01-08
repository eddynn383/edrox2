"use client"

import { useRef } from "react";
import {
    PlaylistItem,
    Text
} from "@/components";
import { PlaylistProps } from "./interface";
import playlist from "./playlist.module.css";

const Playlist = ({ items, currentPath, showDescription = false }: PlaylistProps) => {
    const componentRef = useRef<HTMLDivElement>(null);

    return (
        <div className={playlist.container} ref={componentRef}>
            <ul className={playlist.list}>
                {
                    items.map((item, idx) => {
                        const isActive = currentPath?.includes(item.id);

                        return (
                            <li key={idx} className={playlist["list-item"]} data-active={isActive}>
                                <PlaylistItem
                                    id={item.id}
                                    name={item.name}
                                    status={item.status}
                                    duration={item.duration}
                                    description={item.description || undefined}
                                    showDescription={showDescription}
                                />
                            </li>
                        );
                    })
                }
                {
                    !items &&
                    <li className={playlist["list-item"]}>
                        <Text size="S" type="paragraph" >There are no chapters created yet</Text>
                    </li>
                }
            </ul>
        </div>
    );
};

export { Playlist };
