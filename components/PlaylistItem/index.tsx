"use client"

import { useRouter } from "next/navigation";
import { Text } from "@/components";
import { PlaylistItemProps } from "./interface";
import playlistItem from "./playlistItem.module.css"
import { CirclePlay } from "lucide-react";

export const PlaylistItem = ({ id, name, duration, status, description, href, showDescription = false }: PlaylistItemProps) => {
    const router = useRouter()

    const handleClick = (e: React.MouseEvent) => {
        if (href) {
            router.push(href)
        }
    };

    return (
        <div className={playlistItem.container} onClick={handleClick} >
            <div className={playlistItem.title}>

                <CirclePlay size={16} />
                <Text type="span" size="S" weight="400">{name}</Text>
                {
                    showDescription &&
                    <Text type="span" size="XS" weight="300">{description}</Text>
                }
            </div>
            {
                duration &&
                <div className={playlistItem.duration}>
                    <Text type="span" size="S" weight="400">{duration}</Text>
                </div>
            }
        </div>
    );
}
