'use client'

import { useEffect, useRef, useState } from 'react'
import { useIntersection } from '@/hooks/useIntersection'
import { ChapterItem } from '../ChapterPlaylistItem'
import {
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    closestCenter,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'
// import { getChapters, reorderChapters } from '@/lib/actions/chapters'
// import { Chapter } from '@prisma/client'

import { getAllChaptersLazy, reorderChapters } from "@/data/chapters"

export function ChapterPlaylist() {
    const [chapters, setChapters] = useState<any[]>([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [isDragging, setIsDragging] = useState(false)
    const loadingRef = useRef<HTMLDivElement>(null)
    const isIntersecting = useIntersection(loadingRef)

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    useEffect(() => {
        if (isIntersecting && hasMore && !isDragging) {
            loadMore()
        }
    }, [isIntersecting])

    async function loadMore() {
        const newChapters = await getAllChaptersLazy(page)
        if (newChapters.length < 12) {
            setHasMore(false)
        }
        setChapters((prev) => [...prev, ...newChapters])
        setPage((prev) => prev + 1)
    }

    async function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event
        if (!over || active.id === over.id) return

        const oldIndex = chapters.findIndex((chapter) => chapter.id === active.id)
        const newIndex = chapters.findIndex((chapter) => chapter.id === over.id)

        const newChapters = [...chapters]
        const [removed] = newChapters.splice(oldIndex, 1)
        newChapters.splice(newIndex, 0, removed)

        setChapters(newChapters)
        setIsDragging(false)

        await reorderChapters(
            newChapters.map((chapter, index) => ({
                id: chapter.id,
                position: index,
            }))
        )
    }

    return (
        <div className="space-y-4">
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={chapters}
                    strategy={verticalListSortingStrategy}
                >
                    {chapters.map((chapter) => (
                        <ChapterItem key={chapter.id} chapter={chapter} />
                    ))}
                </SortableContext>
            </DndContext>
            {hasMore && !isDragging && (
                <div ref={loadingRef} className="h-8" />
            )}
        </div>
    )
}