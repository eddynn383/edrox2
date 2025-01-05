import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { updateCourse } from "@/actions/course";
import { CourseSchema } from "@/schemas";
import debounce from "lodash.debounce";
import toast from "react-hot-toast";
import * as z from "zod";

export const useDebouncedCourseSave = (form: any) => {

    const formValues: any = useWatch<z.infer<typeof CourseSchema>>({
        control: form.control,
    });

    useEffect(() => {
        console.log("formValues in custom hook: ", formValues)

    }, [formValues]); // Only re-run effect if formValues change


    const debouncedSave = debounce(async (courseId: string) => {
        try {
            console.log("formValues in hook: ", formValues)

            const data = await updateCourse(courseId, formValues);

            console.log("data in hook: ", data)

            if (data?.error) {
                toast.error(data.error, { position: "bottom-center" });
            } else if (data?.success) {
                const { course } = data;
                if (!course) return;

                toast.success("Changes saved!", { position: "bottom-center" });
                form.reset({
                    title: course.title,
                    description: course.description,
                    category: course.categoryId,
                    subcategory: course.subcategory,
                    image: course.imageId,
                    startDate: course.startDate,
                    endDate: course.endDate,
                });
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    }, 10000);

    return { debouncedSave, formValues };
};
