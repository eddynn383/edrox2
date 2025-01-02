import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, Button, PageTitle, Playlist, PlaylistToggle, Progress, ScrollArea, Text } from "@/components";
import { VideoPlayer } from "@/components/Player";
import { getChapterById, getPublishdedChaptersByCourseId } from "@/data/chapters";
import { getCourseById } from "@/data/courses";
import { ChapterDetails } from "@/module/ChapterDetails";
import { ArrowRightToLine, Home } from "lucide-react";
import { redirect } from "next/navigation";
import msx from "@/styles/module.module.scss"
import psx from "@/styles/page.module.scss"
import { getContentByChapterId } from "@/data/content";
import { Chapter } from "@/interfaces/global";

type Params = Promise<{
    courseId: string,
    chapterId: string
}>;

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

interface PageChapterIdProps {
    params: Params;
    searchParams: SearchParams
}


const PageChapterId = async (props: PageChapterIdProps) => {
    // <span>{params.courseId}</span>
    const params = await props.params
    const searchParams = await props.searchParams

    const courseDetails = await getCourseById(params.courseId);
    const playlist = await getPublishdedChaptersByCourseId(params.courseId)
    const chapterDetails = await getChapterById(params.chapterId)
    const chapterContent = await getContentByChapterId(params.chapterId)
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
    // console.log("chapterDetails: ", chapterDetails)

    const progressValue = 75

    return (
        <>
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
                    <Progress value={progressValue} style={{ "height": "2px" }} data-status={"success"} />
                    <ScrollArea>
                        <ChapterDetails data={chapterContent} courseId={params.courseId} chapterId={params.chapterId} edit={false} />
                    </ScrollArea>
                    <div className={psx["body-content-actions"]}>
                        <Button mode="solid" variant="accent" size="M">Next Chapter</Button>
                    </div>
                </div>
                {
                    searchParams.playlist === "on" &&
                    <div className={psx["body-content-right"]}>
                        <ScrollArea>
                            <Playlist items={playlist} onReorder={function (items: Chapter[]): void {
                                throw new Error("Function not implemented.");
                            }} onEdit={function (id: string): void {
                                throw new Error("Function not implemented.");
                            }} onDelete={function (id: string): void {
                                throw new Error("Function not implemented.");
                            }} />
                        </ScrollArea>
                    </div>
                }
            </section>
        </>
    )
}

export default PageChapterId;