"use client"

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Stepper } from "@/components";
import { Step } from "@/components/Stepper/interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewCourseSchema } from "@/schemas";
import { newCourse } from "@/actions/new-course";

const CourseCreationSteps = [
    {
        id: 1,
        name: "Course Details",
        status: "In progress",
        requiredFields: 2,
        url: "details"
    },
    {
        id: 2,
        name: "Course Content",
        status: "Not started",
        requiredFields: 0,
        url: "content"
    },
    {
        id: 3,
        name: "Course Rewards",
        status: "Not started",
        requiredFields: 0,
        url: "rewards"
    },
    {
        id: 4,
        name: "Course Participants",
        status: "Not started",
        requiredFields: 0,
        url: "participants"
    }
]


const CourseCreationControls = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const step = searchParams.get('step')

    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [currentStep, setCurrentStep] = useState(parseInt(step ? step : "0"))
    

    const form = useForm<z.infer<typeof NewCourseSchema>>({
        resolver: zodResolver(NewCourseSchema),
        defaultValues: {
            title: "",
        }
    });

    const submitHandler = (values: z.infer<typeof NewCourseSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            newCourse(values).then((data) => {
                console.log(data)
                if (data?.error) {
                    form.reset();
                    setError(data.error)
                }
                if (data?.success) {
                    form.reset();
                    setSuccess(data.success)
                }
                console.log("error", error)
                console.log("success", success)
            }).catch(() => setError("Something went wrong!"))
        })
    }

    const clickHandler = (step: Step) => {
        console.log(step)
        console.log("STEP: ", step.id)
        setCurrentStep(step?.id)
        router.push(step.url)
    }

    const nextHandler = (step: Step) => {
        // if (step.name === "Course Details") {
        //     form.handleSubmit(submitHandler)
        // }
        // newCourse
        // setCurrentStep(currentStep + 1)
        // console.log(step)
        // router.push(step.url)
        router.push(`${pathname}?id=${id}&step=${step}`)
    }

    const prevHandler = (step: Step) => {
        if (currentStep > 1) {
            // setCurrentStep(currentStep - 1)
            router.push(`${pathname}?id=${id}&step=${step}`)
        }
    }

    return (
        <Stepper steps={CourseCreationSteps} currentStep={currentStep} onClick={clickHandler} onNext={nextHandler} onPrev={prevHandler} />
    );
}

export default CourseCreationControls;