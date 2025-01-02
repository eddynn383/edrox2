'use client'

import { Chapter } from '@prisma/client'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
// import { Card } from '@/components/ui/card'
import {
    Button,
    Card,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components'
import { MoreVertical, Pencil, Trash } from 'lucide-react'
// import { deleteChapter } from '@/actions/chapters'
import { useRouter } from 'next/navigation'
// import { cn } from '@/lib/utils'

interface ChapterItemProps {
    chapter: Chapter
}

export function ChapterItem({ chapter }: ChapterItemProps) {
    const router = useRouter()
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: chapter.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <Card
            ref={setNodeRef}
            style={style}
            mode="solid"
            {...attributes}
            {...listeners}
            onClick={() => router.push(`/chapters/${chapter.id}`)}
        >
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold">{chapter.title}</h3>
                    {chapter.description && (
                        <p className="text-sm text-muted-foreground">
                            {chapter.description}
                        </p>
                    )}
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="primary" size="S">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" shade={'100'}>
                        <DropdownMenuItem
                            onClick={(e) => {
                                e.stopPropagation()
                                // router.push(`/chapters/${chapter.id}/edit`)
                            }}
                        >
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="text-destructive"
                            onClick={async (e) => {
                                e.stopPropagation()
                                // await deleteChapter(chapter.id)
                                router.refresh()
                            }}
                        >
                            <Trash className="h-4 w-4 mr-2" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </Card>
    )
}