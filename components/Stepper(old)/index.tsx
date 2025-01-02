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
        complete = true;
        router.push(newPath);
    }

    return (
        <div className={stepper.step} data-current={current} data-complete={!current}>
            <div className={stepper.left}>
                <Button className={stepper.icon} type="submit" onClick={handleClick}>
                    {
                        complete && <Check />
                    }
                    {
                        !complete && icon
                    }
                </Button>
                {separator && <Separator complete={complete} />}
            </div>
            <div className={stepper.right}>
                <div className={stepper.number}>
                    <Text size="XS" weight="700" uppercase={true} type="span">{number}</Text>
                </div>
                <div className={stepper.name}>
                    <Text size="M" type="span">{name}</Text>
                </div>
            </div>
        </div>
    )
}

const Separator = ({ complete }: SeparatorProps) => {
    return (
        <span className={stepper.separator} data-complete={complete}>
            <span className="sr-only">Separator</span>
        </span>
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

export { Stepper, Step, Separator }