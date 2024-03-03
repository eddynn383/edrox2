"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import FormCourseDetails from "../FormCourseDetails";
import ChapterCreation from "../ChapterCreation";

interface CourseCreationProps {
    categories?: any;
    chapters?: any;
    defaultValues?: any;
}

const CourseCreation = ({ categories, defaultValues, chapters }: CourseCreationProps) => {

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const step = searchParams.get('step')

    if (!id) {
        return false
    }

    if (!step) {
        router.push(`${pathname}?id=${id}&step=1`) 
    }

    return (
        <>
            {
                step === "1" &&
                <FormCourseDetails categories={categories} defaultValues={defaultValues} />
            }
            {
                step === "2" && 
                <ChapterCreation chapters={chapters} courseId={id} />
            }
            {
                step === "3" && <h2>Course Rewards</h2>
            }
            {
                step === "4" && <h2>Course Participants</h2>
            }
        </>
    );
}

export default CourseCreation;