"use client"

import { courseEnrolment } from "@/actions/course-enrolment";
import { Button } from "@/components";
import { PlayCircle } from "lucide-react";
import { CourseEnrolmentProps } from "./interface";

export const CourseEnrolment = ({ courseId, isEnrolled }: CourseEnrolmentProps) => {
    // const alreadyEnrolled = await getEnrolment(courseId)

    console.log("courseId: ", courseId)
    console.log("isEnrolled: ", isEnrolled)

    if (isEnrolled) {
        return (
            <Button variant="primary" status="default" content="text" style={{"flex": "1 1 0%"}} shade="200" aria-label="Start" disabled={true}> Already enrolled!</Button>
        )
    }

    return ( 
        <Button variant="accent" status="default" content="icon-text" style={{"flex": "1 1 0%"}} aria-label="Start" onClick={async () => await courseEnrolment(courseId)}><PlayCircle /> Start</Button>
    );
}
