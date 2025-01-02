"use client"

import { Check } from "lucide-react";
import { Button, Text } from "@/components";
import { SeparatorProps, StepProps, StepperProps } from "./interface";
import stepper from "./stepper.module.css"
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useEffect } from "react";

const Step = ({ icon, number, name, complete = false, separator = false, href }: StepProps) => {
    const router = useRouter()
    const pathname = usePathname()
    const current = pathname?.includes(href);

    const handleClick = () => {
        console.log("its clicked")


        if (!pathname) return;

        const pathSegments = pathname.split('/');
        pathSegments[pathSegments.length - 1] = href;
        const newPath = pathSegments.join('/');
        router.push(newPath);
    }

    return (
        <button className={stepper.step} data-current={current} data-complete={complete} onClick={handleClick}>
            <Text size="XS" type="span">{name}</Text>
        </button>
    )
}

const Stepper = ({ steps, orientation = "horizontal" }: StepperProps) => {

    return (
        <nav className={stepper.container}>
            <ul className={stepper.list} data-orientation={orientation}>
                {
                    steps.map((item, idx) => (
                        <li className={stepper.item} key={item.id}>
                            <Step icon={item.icon} number={`Step ${idx + 1}`} name={item.name} complete={item.complete} separator={item.separator} href={item.href} />
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}

export { Stepper, Step }