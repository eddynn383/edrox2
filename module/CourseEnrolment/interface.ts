import { NextResponse } from "next/server";

export interface CourseEnrolmentProps {
    courseId: string;
    isEnrolled: boolean;
}