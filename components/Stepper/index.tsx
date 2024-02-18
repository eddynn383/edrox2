"use client"

import React from "react";
import { Button, Progress } from "@/components";
import { StepperProps } from "./interface";
import sx from "@/styles/component.module.scss"




const Stepper = ({ steps, currentStep, onPrev, onNext, onClick, onDone }: StepperProps) => {
    console.log(currentStep)
    return (
        <nav className={sx["stepper"]}>
            <ul className={sx["stepper-steps"]}>
                {
                    steps.map((item) => (
                        <li className={sx["stepper-step"]} key={item.id}>
                            <div className={sx["stepper-step-button"]} data-status={item.status} onClick={() => onClick(item)}>
                                <span className={sx["stepper-step-name"]}>{item.name}</span>
                                <Progress value={currentStep === item.id ? 100 : currentStep > item.id ? 100 : 0} style={{ "height": "6px" }} data-status={item.status} />
                            </div>
                        </li>
                    ))
                }
            </ul>
            <div className={sx["stepper-controls"]}>
                <Button variant="primary" shade="200" type="button" mode="solid" size="M" disabled={currentStep < 1} onClick={() => onPrev(steps[currentStep - 1])}>Prev</Button>
                {currentStep < steps.length - 1 && <Button variant="accent" type="button" mode="solid" size="M" onClick={() => onNext(steps[currentStep + 1])}>Next</Button>}
                {currentStep >= steps.length - 1 && <Button variant="accent" type="button" mode="solid" size="M" onClick={onDone}>Done</Button>}
            </div>
        </nav>
    )
}

export { Stepper }