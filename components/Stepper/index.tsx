"use client"

import { Check } from "lucide-react";
import { Button, Text } from "@/components";
import { SeparatorProps, StepProps, StepperProps } from "./interface";
import stepper from "./stepper.module.css"
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCourseForm } from "@/hooks/useCourseForm";
import { useDebouncedCourseSave } from "@/hooks/useAutoSave";

const Step = ({ name, status, href, course }: StepProps) => {
    const router = useRouter()
    const pathname = usePathname()
    const current = pathname?.includes(href);

    const { form, formValues } = useCourseForm(course)
    const { isDirty } = form.formState;
    const { debouncedSave } = useDebouncedCourseSave(form)

    const handleClick = () => {
        // console.log("its clicked")
        if (isDirty) return;
        // debouncedSave(course.id);


        if (!pathname) return;



        const pathSegments = pathname.split('/');
        pathSegments[pathSegments.length - 1] = href;
        const newPath = pathSegments.join('/');
        router.push(`/management/courses/${course.id}/edit/${href}`);
    }

    return (
        <button className={stepper.step} data-current={current} data-status={status} onClick={handleClick}>
            <Text size="XS" type="span">{name}</Text>
        </button>
    )
}

const Stepper = ({ steps, course }: StepperProps) => {

    return (
        <nav className={stepper.container}>
            <ul className={stepper.list}>
                {
                    steps.map((item, idx) => (
                        <li className={stepper.item} key={item.id}>
                            <Step name={item.name} status={item.status} href={item.url} course={course} />
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}

const StepperControls = ({ steps, course }: StepperProps) => {
    const router = useRouter()
    const pathname = usePathname()
    const paths = pathname.split('/')
    const currentPath = paths[paths.length - 1]
    // console.log("pathname: ", currentPath)
    const { form, formValues } = useCourseForm(course)

    const currentStep = steps.find((s) => s.url === currentPath);
    const currentPosition = currentStep?.position || 1
    const nextStep = steps.find((s) => s.position === currentPosition + 1)
    const prevStep = steps.find((s) => s.position === currentPosition - 1)
    // console.log("current step: ", currentStep)


    const handleGoNext = () => {
        router.push(`/management/courses/${course.id}/edit/${nextStep?.url || ""}`);
    }

    const handleGoPrev = () => {
        router.push(`/management/courses/${course.id}/edit/${prevStep?.url || ""}`);
    }

    return (
        <div className={stepper.controls}>
            <div className={stepper["controls-left"]}>
                <Button mode="text" onClick={handleGoPrev}>Back</Button>
            </div>
            <div className={stepper["controls-right"]}>
                <Button variant="accent" status="brand" style={{ minWidth: "140px" }} onClick={handleGoNext}>Next</Button>
            </div>
        </div>
    )
}

export { Stepper, Step, StepperControls }