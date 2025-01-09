"use client"

import React from "react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Text } from "@/components";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "@uidotdev/usehooks";
import chapterSx from "./chapter-selection.module.css"

const ChapterSelection = ({ courseId, chapters, chapterId }: any) => {
    const router = useRouter();
    const [sidePanelState, setSidePanelState] = useLocalStorage("SidePanelState", true)

    const handleValueChange = (chapterId: string) => {
        // Redirect to the selected chapter's URL
        router.push(`/management/courses/${courseId}/edit/content/${chapterId}`);
    };
    if (sidePanelState) return

    return (
        <div className={chapterSx.container}>
            <Select name="category" defaultValue={chapterId} onValueChange={handleValueChange}>
                <SelectTrigger mode="text" size="S" shade="100">
                    <SelectValue placeholder="Select chapter" />
                </SelectTrigger>
                <SelectContent side="top" size="S" shade="100" >
                    {
                        chapters.length > 0 &&
                        <>
                            {chapters.map((item: any) => (
                                <SelectItem key={item.id} value={item.id}>
                                    <Text size="S" truncate={{ lines: 1, length: "160px" }}>
                                        {item.name}
                                    </Text>
                                </SelectItem>
                            ))}
                        </>
                    }
                    {
                        chapters.length === 0 &&
                        <p>Chapter list is empty</p>
                    }
                </SelectContent>
            </Select>
        </div>
    )
}

export { ChapterSelection };