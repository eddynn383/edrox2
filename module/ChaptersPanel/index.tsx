"use client"

import { Button, Heading, Playlist, ScrollArea, Text } from "@/components";
import page from "@/styles/page.module.css"
import ChapterCreation from "@/module/ChapterCreation";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ChapterPlaylist } from "../ChapterPlaylist";
import { ChapterSkeleton } from "@/components/Skeleton";

const ChaptersPanel = ({ courseId, chapters, chapterId }: any) => {
    const searchParams = useSearchParams();
    const playlist = searchParams.get('playlist')
    const pathname = usePathname();
    // const handleValueChange = (chapterId: string) => {
    //     // Redirect to the selected chapter's URL
    //     router.push(`/management/courses/${courseId}/edit/content/${chapterId}`);
    // };

    // if (playlist === "off") {
    //     return null
    // }

    return (
        <div className={page["section-right"]} data-state={playlist === "on" ? "open" : "close"}>
            <div className={page["section-header"]} >
                <Heading rank={2}>Chapters</Heading>
                <ChapterCreation courseId={courseId} />

            </div>
            <div className={page["section-body"]}>
                <ScrollArea>
                    <div className={page.inner}>
                        {/* <Suspense fallback={<ChapterSkeleton />} >
                            <ChapterPlaylist />
                        </Suspense> */}
                        <Playlist courseId={courseId} data={chapters} edit={true} currentPath={pathname} />
                    </div>
                </ScrollArea>
            </div>
        </div>
    )
}

export { ChaptersPanel };