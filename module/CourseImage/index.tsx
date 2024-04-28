"use client"

import * as z from "zod";
import { useState, useTransition } from "react";
import { UploadImage } from "@/components"
import { CoverImageSchema } from "@/schemas"
import toast from "react-hot-toast"
import { updateCourseCover } from "@/actions/new-course";

interface CourseImageProps {
    cover?: string;
    courseId: string
}

export const CourseImage = ({cover, courseId}: CourseImageProps) => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();


    const uploadCoverImage = async (values: z.infer<typeof CoverImageSchema>) => {
        try {
            console.log("UPLOAD COVER VALUES: ", values)
            startTransition(() => {
                updateCourseCover(courseId, values).then((data) => {
                    console.log(data)
                    if (data?.error) {
                        setError(data.error)
                    }

                    if (data?.success) {
                        setSuccess(data.success)
                    }
                    console.log("error", error)
                    console.log("success", success)
                }).catch(() => setError("Something went wrong!"))
            })
            toast.success("Cover updated");
        } catch {
            toast.error("Something went wrong");
        }
    }

    return ( 
        <UploadImage currentImage={cover} endpoint="courseImage" onChange={
            (url) => {
                if (url) {
                    console.log("URL uploaded: ", url)
                    uploadCoverImage({
                        image: url
                    })
                }
            }
        } />
    );
}