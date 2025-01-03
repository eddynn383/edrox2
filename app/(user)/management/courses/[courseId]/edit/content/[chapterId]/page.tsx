import { getAllChaptersByCourseId, getChapterById, getPublishdedChaptersByCourseId } from "@/data/chapters";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, Button, Playlist, PlaylistToggle, RichTextEditor, ScrollArea, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components";
import { Heading, Type, Image as ImageIcon, Film, Home, PanelRightOpen } from "lucide-react";
import { ChapterHeader } from "@/module/ChapterHeader";
// import { getContentByChapterId } from "@/data/content";
import { ChapterDetails } from "@/module/ChapterDetails";
import psx from "@/styles/page.module.scss"
import msx from "@/styles/module.module.scss"
import { getCourseById } from "@/data/courses";
import { redirect } from "next/navigation";

import { ChapterSelection } from "@/module/ChapterSelection";
import { ContentForm } from "@/module/ContentForm";
import { Toolbar } from "@/components/RichTextEditor/components/Toolbar";


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
    // const chapterContent = await getContentByChapterId(params.chapterId)

    // console.log("chapterContent: ", chapterContent)

    return null
}

export default Page;