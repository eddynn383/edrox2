import { getAllChaptersByCourseId, getChapterById } from "@/data/chapters";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, Button, Playlist, PlaylistToggle, RichTextEditor, ScrollArea } from "@/components";
import { Heading, Type, Image as ImageIcon, Film, Home } from "lucide-react";
import { ChapterHeader } from "@/module/ChapterHeader";
import { getContentByChapterId } from "@/data/content";
import { ChapterDetails } from "@/module/ChapterDetails";
import psx from "@/styles/page.module.scss"
import msx from "@/styles/module.module.scss"
import { getCourseById } from "@/data/courses";
import { redirect } from "next/navigation";


interface NewChapterPageProps {
    params: {
        courseId: string;
        chapterId: string;
    },
    searchParams: { [key: string]: string }
}

// const renderInput = () => {
//     return <input type="file" />
// }

const ChapterContentActions = () => {
    return (
        <div className={msx["chapters-content-actions"]}> 
            <Button content="icon"><Heading /></Button>
            <Button content="icon"><Type /></Button>
            <Button content="icon">
                <ImageIcon />
            </Button>
            <Button content="icon"><Film /></Button>
        </div>
    )
}

const Page = async ({ params, searchParams }: NewChapterPageProps) => {
    const course = await getCourseById(params.courseId)
    const chapter = await getChapterById(params.chapterId)
    const chapterContent = await getContentByChapterId(params.chapterId)
    const playlist = await getAllChaptersByCourseId(params.courseId)

    if (!chapter) {
        console.log("The course does not exist")
        return false
    }

    if (!searchParams.playlist) {
        if (searchParams.viewport !== "mobile") {
            redirect("?playlist=on")    
        } else {
            redirect("?playlist=off")    
        }
    }

    return (
        <>
            <section className={psx["body-toolbar"]}>
                <div className={psx["body-toolbar-row"]}>
                    <div className={psx["body-toolbar-left"]}>
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/" title="Home"><Home /></BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/admin/courses" title="Courses">Courses</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink href={`/admin/courses/edit/${params.courseId}`} title={course?.title}>{course?.title}</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Edit Chapter</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </div>
                <div className={psx["body-toolbar-row"]}>
                    <div className={psx["body-toolbar-left"]}>
                        <div style={{"display": "flex", "alignItems": "center", "gap": "12px"}}>
                            <ChapterHeader chapter={chapter} />
                        </div>
                    </div>
                    <div className={psx["body-toolbar-right"]}>
                        <PlaylistToggle />
                    </div>
                </div>
            </section>
            <section className={psx["body-content"]}>
                <div className={psx["body-content-left"]}>
                    <ScrollArea>
                        <ChapterDetails data={chapterContent} courseId={params.courseId} chapterId={params.chapterId} edit={true} />
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
        </>
    );
}

export default Page;