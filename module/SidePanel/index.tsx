"use client"

import { Suspense } from "react"
import { Button, Heading, ScrollArea } from "@/components"
import { CourseChapterCreation } from "../CourseChapterCreation"
import { CourseEditChapters } from "../CourseEditChapters"
import { ChapterSkeleton } from "@/components/Skeleton"
import { SidePanelProps } from "./interface"
import { ArrowDownUp, Plus } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useLocalStorage } from "@uidotdev/usehooks"
import { CourseSettingsForm } from "../CourseSettingsForm"
import sidepanelSX from "./sidepanel.module.css"
import { CourseEditGroups } from "../CourseEditGroups"
import { CourseGroupCreation } from "../CourseGroupCreation"

const SidePanel = (props: SidePanelProps) => {
    const { courseId, chapters, courseSettings, groups, location } = props;
    const searchParams = useSearchParams()

    const playlist = searchParams.get('playlist')
    const show = playlist === "on" ? true : false

    const [sidePanelState, setSidePanelState] = useLocalStorage("SidePanelState")


    const onReorder = () => {
        alert("Will be implmeneted soon")
    }

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
                                <Button mode="text" size="S" content="icon" onClick={onReorder}><ArrowDownUp /></Button>
                                <CourseChapterCreation courseId={courseId}>
                                    <Button mode="text" variant="primary" status="default" content="icon" size="S" >
                                        <Plus />
                                    </Button>
                                </CourseChapterCreation>
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
            {
                location === "participants" && (
                    <>
                        <div className={sidepanelSX.header} >
                            <div className={sidepanelSX["header-left"]}>
                                <Heading rank={2}>Groups</Heading>
                            </div>
                            <div className={sidepanelSX["header-right"]}>
                                <CourseGroupCreation courseId={courseId}>
                                    <Button mode="text" variant="primary" status="default" content="icon" size="S" >
                                        <Plus />
                                    </Button>
                                </CourseGroupCreation>
                            </div>
                        </div>
                        <div className={sidepanelSX.body}>
                            <ScrollArea>
                                <div className={sidepanelSX["body-inner"]}>
                                    <Suspense fallback={<ChapterSkeleton />}>
                                        <CourseEditGroups courseId={courseId} groups={groups} />
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