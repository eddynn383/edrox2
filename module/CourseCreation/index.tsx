"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import FormCourseDetails from "../FormCourseDetails";

interface CourseCreationProps {
    categories?: any;
    defaultValues?: any;
}

const CourseCreation = ({categories, defaultValues}: CourseCreationProps) => {

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const step = searchParams.get('step')

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
                step === "2" && <h2>Course Content</h2>
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