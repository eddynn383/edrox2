"use client"

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Stepper } from "@/components";
import { Step } from "@/components/Stepper/interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewCourseSchema } from "@/schemas";
import { newCourse } from "@/actions/new-course";

const CourseCreationSteps = [
    {
        id: 0,
        name: "Course Details",
        status: "In progress",
        requiredFields: 2,
        url: "details"
    },
    {
        id: 1,
        name: "Course Content",
        status: "Not started",
        requiredFields: 0,
        url: "content"
    },
    {
        id: 2,
        name: "Course Rewards",
        status: "Not started",
        requiredFields: 0,
        url: "rewards"
    },
    {
        id: 3,
        name: "Course Participants",
        status: "Not started",
        requiredFields: 0,
        url: "participants"
    }
]


const CourseCreationControls = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [currentStep, setCurrentStep] = useState(0)
    const router = useRouter()

    const form = useForm<z.infer<typeof NewCourseSchema>>({
        resolver: zodResolver(NewCourseSchema),
        defaultValues: {
            title: "",
            description: ""
            // category: "",
            // image: "",
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
        if (step.name === "Course Details") {
            form.handleSubmit(submitHandler)
        }
        setCurrentStep(currentStep + 1)
        console.log(step)
        router.push(step.url)
    }

    const prevHandler = (step: Step) => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
            router.push(step.url)
        }
    }

    return (
        <Stepper steps={CourseCreationSteps} currentStep={currentStep} onClick={clickHandler} onNext={nextHandler} onPrev={prevHandler} />
    );
}

export default CourseCreationControls;