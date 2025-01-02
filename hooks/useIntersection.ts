'use client'

import { useEffect, useState } from 'react'

export function useIntersection(
    elementRef: React.RefObject<Element>,
    rootMargin: string = '0px'
): boolean {
    const [isIntersecting, setIsIntersecting] = useState(false)

    useEffect(() => {
        const element = elementRef.current
        if (!element) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting)
            },
            { rootMargin }
        )

        observer.observe(element)

        return () => {
            observer.unobserve(element)
        }
    }, [elementRef, rootMargin])

    return isIntersecting
}