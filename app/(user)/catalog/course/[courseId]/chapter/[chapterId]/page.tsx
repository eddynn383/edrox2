import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, Button, PageTitle, Playlist, PlaylistToggle, Progress, ScrollArea, Text } from "@/components";
import { VideoPlayer } from "@/components/Player";
import { getChapterById, getPublishdedChaptersByCourseId } from "@/data/chapters";
import { getCourseById } from "@/data/courses";
import { ChapterDetails } from "@/module/ChapterDetails";
import { ArrowRightToLine, Home } from "lucide-react";
import psx from "@/styles/page.module.scss"
// import { getContentByChapterId } from "@/data/content";
import { Chapter } from "@/interfaces/global";
import { PageHeader } from "@/module/PageHeader";
import { SidePanelToggle } from "@/module/ActionButtons";

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
    // const chapterContent = await getContentByChapterId(params.chapterId)
    const chapterName = chapterDetails?.name

    // if (!searchParams.playlist) {
    //     if (searchParams.viewport !== "mobile") {
    //         redirect("?playlist=on")
    //     } else {
    //         redirect("?playlist=off")
    //     }
    // }

    if (!chapterName) {
        return
    }
    // console.log("chapterDetails: ", chapterDetails)

    const progressValue = 75

    const PageActions = [{
        id: "a1",
        element: <SidePanelToggle />
    }]

    const PageBreadcrumb = [{
        id: "b1",
        href: "/",
        title: "Home",
        children: <Home />,
        separator: "true"
    }, {
        id: "b2",
        href: "/catalog",
        title: "Catalog",
        children: "Home",
        separator: "true"
    }, {
        id: "b3",
        href: `/catalog/course/${params.courseId}`,
        title: courseDetails?.name,
        children: "Catalog",
        separator: "true"
    }, {
        id: "b4",
        title: "Chapter details",
        children: courseDetails?.name,
        separator: "false"
    }]

    return (
        <>
            <PageHeader title={chapterName || ""} breadcrumb={PageBreadcrumb} actions={PageActions} />
            <section className={psx["body-content"]}>
                <div className={psx["body-content-left"]}>
                    <Progress value={progressValue} style={{ "height": "2px" }} data-status={"success"} />
                    <ScrollArea>
                        <ChapterDetails data={chapterDetails} courseId={params.courseId} chapterId={params.chapterId} />
                    </ScrollArea>
                    <div className={psx["body-content-actions"]}>
                        <Button mode="solid" variant="accent" size="M">Next Chapter</Button>
                    </div>
                </div>
                {
                    searchParams.playlist === "on" &&
                    <div className={psx["body-content-right"]}>
                        <ScrollArea>
                            <Playlist
                                items={playlist}
                            />
                        </ScrollArea>
                    </div>
                }
            </section>
        </>
    )
}

export default PageChapterId;