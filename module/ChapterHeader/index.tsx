import { Pen, PlusCircle } from "lucide-react";
import { Badge, Button, Dialog, DialogBody, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, PageTitle, Rating } from "@/components";
import { CourseCreationForm } from "../CourseCreationForm";
import { CourseDescriptionForm } from "../CourseDescriptionForm";
import { Category, Course } from "@/interfaces/global";
import { DialogForm } from "../DialogForm";
import { CourseDescriptionModal } from "../CourseDescriptionModal";
import { CourseTitleModal } from "../CourseTitleModal";
import msx from "@/styles/module.module.scss"

type Rating = {
    score: number;
    reviews?: number;
}

type RatingType = "Overall" | "User"

type Chapter = {
    id: string;
    title: string;
    description: string | null;
}

interface ChapterHeaderProps {
    chapter: Chapter;
    edit?: boolean;
}

export const ChapterHeader = async ({ chapter, edit = false }: ChapterHeaderProps) => {
    const { id, title, description } = chapter

    return (
        <div className={msx["chapter-header"]}>
            <div className={msx["chapter-header-title"]}>
                <PageTitle title={title} />
            </div>
            {
                description &&
                <div className={msx["chapter-header-description"]}>
                    <p>{description}</p>
                </div>
            }
        </div>
    );
}
