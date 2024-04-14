import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, Button, PageTitle, Playlist, PlaylistToggle, Progress, ScrollArea, Text } from "@/components";
import { VideoPlayer } from "@/components/Player";
import { getChapterById, getPublishdedChaptersByCourseId } from "@/data/chapters";
import { getCourseById } from "@/data/courses";
import { ChapterDetails } from "@/module/ChapterDetails";
import msx from "@/styles/module.module.scss"
import psx from "@/styles/page.module.scss"
import { ArrowRightToLine, Home } from "lucide-react";
import { redirect } from "next/navigation";

interface PageChapterIdProps {
    params: { 
        courseId: string,
        chapterId: string
    },
    searchParams: { [key: string]: string }
}


const PageChapterId = async ({ params, searchParams }: PageChapterIdProps) => {
    // <span>{params.courseId}</span>

    const courseDetails = await getCourseById(params.courseId);
    const playlist = await getPublishdedChaptersByCourseId(params.courseId)
    const chapterDetails = await getChapterById(params.chapterId)
    const chapterTitle = chapterDetails?.title
    
    if (!searchParams.playlist) {
        if (searchParams.viewport !== "mobile") {
            redirect("?playlist=on")    
        } else {
            redirect("?playlist=off")    
        }
    }

    if (!chapterTitle) {
        return 
    }
    console.log("chapterDetails: ", chapterDetails)

    const progressValue=75

    return (
        <div className={psx["body"]}>
            <section className={psx["body-toolbar"]} data-page="chapter-details">
                <div className={psx["body-toolbar-row"]}>
                    <Breadcrumb className={msx["chapter-details-breadcrumb"]}>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/" title="Home"><Home /></BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/catalog" title="Catalog">Catalog</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href={`/catalog/course/${params.courseId}`} title={courseDetails?.title}>{courseDetails?.title}</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Chapter details</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <div className={psx["body-toolbar-row"]}>
                    <div className={psx["body-toolbar-left"]}>
                        {/* <div className={msx["chapter-details-header"]}> */}
                            
                            <PageTitle title={chapterTitle} />
                        {/* </div> */}
                    </div>
                    <div className={psx["body-toolbar-right"]}>
                        <PlaylistToggle />
                    </div>
                </div>
            </section>
            <section className={psx["body-content"]}>
                <div className={psx["body-content-left"]}>
                    <Progress value={progressValue} style={{ "height": "2px" }} data-status={"success"}/>
                    <ScrollArea>
                        <ChapterDetails data={courseDetails} />
                    </ScrollArea>
                </div>
                {
                    searchParams.playlist === "on" &&
                    <div className={psx["body-content-right"]}>
                        <ScrollArea>
                            <Playlist data={playlist} />
                        </ScrollArea>
                    </div>
                }
            </section>
        </div>
    )
}

export default PageChapterId;