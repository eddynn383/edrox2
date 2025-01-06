"use client"

import { Suspense } from "react"
import { Button, Heading, ScrollArea } from "@/components"
import { ChapterCreation } from "../ChapterCreation"
import { CourseEditChapters } from "../CourseEditChapters"
import { ChapterSkeleton } from "@/components/Skeleton"
import { SidePanelProps } from "./interface"
import { ArrowDownUp } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useLocalStorage } from "@uidotdev/usehooks"
import { CourseSettingsForm } from "../CourseSettingsForm"
import sidepanelSX from "./sidepanel.module.css"

const SidePanel = (props: SidePanelProps) => {
    const { courseId, chapters, courseSettings, location } = props;
    const searchParams = useSearchParams()

    const playlist = searchParams.get('playlist')
    const show = playlist === "on" ? true : false

    const [sidePanelState, setSidePanelState] = useLocalStorage("SidePanelState")
    return (
        <div className={sidepanelSX.container} data-active={sidePanelState} >
            {
                location === "details" && (
                    <>
                        <div className={sidepanelSX.header} >
                            <div className={sidepanelSX["header-left"]}>
                                <Heading rank={2}>Settings</Heading>
                            </div>
                            <div className={sidepanelSX["header-right"]}>
                                {/* <Button mode="text" size="S" content="icon"><ArrowDownUp /></Button>
                    <ChapterCreation courseId={courseId} /> */}
                            </div>
                        </div>
                        <div className={sidepanelSX.body}>
                            <ScrollArea>
                                <div className={sidepanelSX["body-inner"]}>
                                    {
                                        courseSettings &&
                                        <CourseSettingsForm id={courseSettings.id} settings={courseSettings} />
                                    }
                                </div>
                            </ScrollArea>
                        </div>
                    </>
                )
            }
            {
                location === "content" && (
                    <>
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
                                <div className={sidepanelSX["body-inner"]}>
                                    <Suspense fallback={<ChapterSkeleton />}>
                                        <CourseEditChapters courseId={courseId} chapters={chapters} />
                                    </Suspense>
                                </div>
                            </ScrollArea>
                        </div>
                    </>
                )

            }


        </div>

    )




}

export { SidePanel }