import { Course } from "@/interfaces/global";
import { CourseSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import * as z from "zod";

export const useCourseForm = (course?: any) => {

    const form = useForm<z.infer<typeof CourseSchema>>({
        resolver: zodResolver(CourseSchema),
        defaultValues: {
            title: course?.title || "",
            description: course?.description || "",
            category: course?.categoryId || "",
            subcategory: course?.subcategory || "",
            image: course?.imageId || "",
            startDate: course?.startDate || "",
            endDate: course?.endDate || ""
        }
    });

    const formValues: any = useWatch<z.infer<typeof CourseSchema>>({
        control: form.control
    })

    return { form, formValues };
};