"use server"

import { Suspense } from "react"
import { Button, Heading, ScrollArea } from "@/components"
import { ChapterCreation } from "../ChapterCreation"
import { CourseEditChapters } from "../CourseEditChapters"
import { ChapterSkeleton } from "@/components/Skeleton"
import { SidePanelProps } from "./interface"
import sidepanelSX from "./sidepanel.module.css"
import { ArrowDownUp } from "lucide-react"

const SidePanel = (props: SidePanelProps) => {
    const { courseId, chapters, show } = props;

    return (
        <div className={sidepanelSX.container} data-active={show} >
            <div className={sidepanelSX.header} >
                <div className={sidepanelSX["header-left"]}>
                    <Heading rank={2}>Chapters</Heading>
                </div>
                <div className={sidepanelSX["header-right"]}>
                    <Button mode="text" size="S" content="icon"><ArrowDownUp /></Button>
                    <ChapterCreation courseId={courseId} />
                </div>
            </div>
            <div className={sidepanelSX.body}>
                <ScrollArea>
                    <Suspense fallback={<ChapterSkeleton />}>
                        <CourseEditChapters courseId={courseId} chapters={chapters} />
                    </Suspense>
                </ScrollArea>
            </div>
        </div>
    )
}

export { SidePanel }